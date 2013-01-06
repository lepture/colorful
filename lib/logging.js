/*
 * Nested color logging support for terminal
 * @author: Hsiaoming Yang <lepture@me.com>
 *
 * Thanks to: https://github.com/lepture/terminal
 *
 */

var util = require('util');
var os = require('os');
var EventEmitter = require('events').EventEmitter;
var scheme = require('./scheme');
var color = require('./color');
var count = 0;

function colorize(name, text) {
  var func;
  if (typeof name === 'string') {
    func = color.color[name]
  } else if (typeof name === 'function') {
    func = name;
  }
  if (!func) return text;
  return func(text);
};


var definedLevels = {
  'debug': 1,
  'info': 2,
  'start': 2,
  'end': 2,
  'warn': 3,
  'error': 4
}

function Logging(level) {
  this.level = level || 'info';
  this.indent = 0;
  this.scheme = scheme.arrow;
}
Logging.prototype.__proto__ = EventEmitter.prototype;

Logging.prototype.log = function() {
  var level = arguments[0], msg, args;

  if (arguments.length === 2 && definedLevels.hasOwnProperty(level)) {
    args = Array.prototype.slice.call(arguments[1]);
  } else if (definedLevels.hasOwnProperty(level)) {
    args = Array.prototype.slice.call(arguments).slice(1);
  } else {
    level = 'info';
    args = arguments;
  }
  msg = util.format.apply(this, args);

  this.emit('logging-' + level);
  if (definedLevels[level] < definedLevels[this.level]) return;

  var text = Array(this.indent + 1).join('  ');
  var levelScheme = this.scheme[level] || {};
  text += (levelScheme.start || '');

  if (levelScheme.color) {
    text += colorize(levelScheme.color, msg);
  } else {
    text += msg;
  }

  text += (levelScheme.end || '');
  if (level === 'error') {
    process.stderr.write(text + os.EOL);
  } else {
    process.stdout.write(text + os.EOL);
  }
}
Logging.prototype.start = function() {
  this.log('start', arguments);
  this.indent += 1;
}
Logging.prototype.end = function() {
  this.log('end', arguments);
  this.indent -= 1;
}
Logging.prototype.debug = function() {
  this.log('debug', arguments);
}
Logging.prototype.info = function() {
  this.log('info', arguments);
}
Logging.prototype.warn = function() {
  this.log('warn', arguments);
}
Logging.prototype.error = function() {
  this.log('error', arguments);
}
Logging.prototype.config = function(obj) {
  if (obj.verbose) {
    this.level = 'debug';
  }
  if (obj.quiet) {
    this.level = 'warn';
  }
  if (obj.level && definedLevels.hasOwnProperty(obj.level)) {
    this.level = obj.level;
  }
  if (definedLevels.hasOwnProperty(obj)) {
    this.level = obj;
  }
};

exports = module.exports = new Logging;
exports.Logging = Logging
