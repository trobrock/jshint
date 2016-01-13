var Queue = require("hound-javascript/lib/queue");

module.exports = function(redis) {
  var inbound = new Queue({
    redis: redis,
    queueName: "jshint_review",
    jobName: "JshintReviewJob",
  });

  inbound.enqueue({
    content: "foo()",
    config: "{ \"undef\": true }",
  });
};
