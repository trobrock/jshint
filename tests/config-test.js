var Config = require("../lib/config");

QUnit.module("Config");

test("Parsing a JSHint config file", function() {
  var config = new Config("{ \"unused\": true }");

  deepEqual(
    config.parse(),
    { unused: true }
  );
});

test("Having no JSHint config file", function() {
  var config = new Config(null);

  deepEqual(
    config.parse(),
    {}
  );
});

test("Determining a valid configuration file", function() {
  var config = new Config("{ \"unused\": true }");

  equal(
    config.isValid(),
    true
  );
});

test("Determining an invalid configuration file", function() {
  var config = new Config("---\nyaml: is good\ntrue/false/syntax/error");

  equal(
    config.isValid(),
    false
  );
});
