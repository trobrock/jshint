var Redis = require("redis");
var Resque = require("node-resque");
var Checker = require("jscs");

function parseConfig(config) {
  if (!config) {
    config = "{}";
  }

  try {
    return JSON.parse(config);
  } catch (exception) {
    console.log("Invalid JSCS configuration:");
    console.log(config);
    console.log(exception);

    return {};
  }
}

var connection = {
  redis: Redis.createClient(process.env.REDIS_URL || "redis://localhost:6379"),
}

var outbound = new Resque.queue({
  connection: connection,
  queues: ["high"],
});

var worker = new Resque.worker({
  connection: connection,
  queues: ["jscs_review"],
}, {
  "JscsReviewJob": function(payload) {
    var checker = new Checker();
    checker.registerDefaultRules();
    checker.configure(parseConfig(payload.config));

    var results = checker.checkString(payload.content);
    var violations = results.getErrorList().map(function(error) {
      return { line: error.line, message: error.message };
    });

    outbound.connect(function() {
      outbound.enqueue("high", "CompletedFileReviewJob", {
        violations: violations,
        filename: payload.filename,
        commit_sha: payload.commit_sha,
        pull_request_number: payload.pull_request_number,
        patch: payload.patch,
      });
    });
  }
});

worker.connect(function() {
  worker.workerCleanup();
  worker.start();
});

// var inbound = new Resque.queue({
//   connection: connection,
//   queues: ["jscs_review"],
// });
//
// inbound.connect(function() {
//   inbound.enqueue("jscs_review", "JscsReviewJob", {
//     content: "// TODO",
//     config: '{ "disallowKeywordsInComments": true }',
//   });
// });
