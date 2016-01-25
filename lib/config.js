var fs = require("fs");
var stripComments = require("strip-comments");

var UNCONFIGURED_CONFIG = "{}";

function Config(rawConfig) {
  if (_isInvalidConfig(rawConfig)) {
    this.rawConfig = _defaultConfig();
  } else {
    this.rawConfig = rawConfig;
  }
};

function _isInvalidConfig(rawConfig) {
  if (!rawConfig || rawConfig == UNCONFIGURED_CONFIG) {
    return true;
  } else {
    return false;
  }
};

function _defaultConfig() {
  var defaultConfigFile = "config/.jshintrc";

  return fs.readFileSync(defaultConfigFile, "utf8", function() {});
};

Config.prototype.parse = function() {
  var config = this.rawConfig || "{}";
  return JSON.parse(stripComments(config));
};

Config.prototype.isValid = function() {
  try {
    this.parse();
    return true;
  } catch (exception) {
    return false;
  }
};

module.exports = Config;
