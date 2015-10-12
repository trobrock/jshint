var JSHint = require("jshint").JSHINT;

function parseConfig(config) {
  if (!config) {
    config = "{}";
  }

  try {
    return JSON.parse(config);
  } catch (exception) {
    console.log("Invalid JSHint configuration:");
    console.log(config);
    console.log(exception);

    return {};
  }
}

function Linter(outbound) {
  this.outbound = outbound;
}

Linter.prototype.lint = function(payload) {
  JSHint(payload.content, parseConfig(payload.config));

  var violations = JSHint.errors.map(function(error) {
    return { line: error.line, message: error.reason };
  });

  return this.outbound.enqueue({
    violations: violations,
    filename: payload.filename,
    commit_sha: payload.commit_sha,
    pull_request_number: payload.pull_request_number,
    patch: payload.patch,
  });
};

module.exports = Linter;
