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
var paint = require('./color').paint;
var count = 0;

var levels = {
  'debug': 10,
  'info': 20,
  'warn': 30,
  'error': 40,
  'log': 50
};

var colors = {
  debug: 'grey',
  info: 'green',
  warn: 'yellow',
  error: 'red'
};
var icons = {
  logIcon: paint('➠ ').cyan.color,
  startIcon: paint('⚑ ').bold.magenta.color,
  endIcon: paint('➥ ').cyan.color
};

function log(context, level, args) {
  if (levels[context.level] > levels[level]) return;

  var text = '';
  var stream = process.stdout;
  text += Array(count + 1).join('  ');
  if (count) {
    text += icons.logIcon;
  }
  if (level === 'warn') {
    text += paint(' WARN ').yellow_bg.color + ' ';
  } else if (level === 'error') {
    text += paint(' ERROR ').red_bg.color + ' ';
    stream = process.stderr;
  }
  var colorize = function(text) {
    var name = colors[level];
    if (!name) return text;
    return paint(text)[name].color;
  }
  if (colorize) {
    text += colorize(util.format.apply(context, args)) + os.EOL;
  } else {
    text += util.format.apply(context, args) + os.EOL;
  }
  stream.write(text);
}

function Logging(level) {
  this.level = level || 'info';
}
Logging.prototype.__proto__ = EventEmitter.prototype;
Logging.prototype.start = function() {
    if (levels[this.level] > 25) return;

    var text = Array(count + 1).join('  ');
    text += icons.startIcon;
    text += paint(util.format.apply(this, arguments)).bold.color + os.EOL;
    process.stdout.write(text);
    count += 1;
    this.emit('logging-start');
};
Logging.prototype.end = function() {
    if (levels[this.level] > 25) return;
    var text = '';
    text += Array(count + 1).join('  ');
    if (count) {
      text += icons.endIcon;
    }
    text += util.format.apply(this, arguments) + os.EOL;
    process.stdout.write(text);
    count -= 1;
    this.emit('logging-end');
};
Logging.prototype.log = function() {
    log(this, 'log', arguments);
};
Logging.prototype.debug = function() {
    log(this, 'debug', arguments);
};
Logging.prototype.info = function() {
    log(this, 'info', arguments);
};
Logging.prototype.warn = function() {
    log(this, 'warn', arguments);
    this.emit('logging-warn');
};
Logging.prototype.error = function() {
    log(this, 'error', arguments);
    this.emit('logging-error');
};
Logging.prototype.config = function(obj) {
    if (obj.verbose) {
      this.level = 'debug';
    }
    if (obj.quiet) {
      this.level = 'warn';
    }
    if (obj.level) {
      this.level = obj.level;
    }
    if (obj in colors) {
      this.level = obj;
    }
    var key;
    var stylish = function(key) {
      colors[key] = obj.colors[key];
    };
    if (obj.colors) {
      for (key in obj.colors) {
        stylish(key);
      }
    }
    var iconit = function(key) {
      icons[key] = obj.icons[key];
    };
    if (obj.icons) {
      for (key in obj.icons) {
        iconit(key);
      }
    }
};

exports = module.exports = new Logging;
exports.Logging = Logging
