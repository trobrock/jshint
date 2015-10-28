var Queue = require("./queue");

module.exports = function(redis) {
  var inbound = new Queue({
    redis: redis,
    queueName: "jshint_review",
    jobName: "JsHintReviewJob",
  });

  inbound.enqueue({
    content: "foo()",
    config: "{ \"undef\": true }",
  });
};
