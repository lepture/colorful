/*
 * Color supports in terminal
 * @author: Hsiaoming Yang <lepture@me.com>
 *
 * http://en.wikipedia.org/wiki/ANSI_escape_code
 *
 */

var tty = require('tty');
var os = require('os');
var util = require('util');
var codes = {};

exports.isatty = false;
exports.disabled = false;

function isColorSupported() {
  if (exports.disabled) return false;

  // you can force to tty
  if (!exports.isatty && !tty.isatty()) return false;

  if ('COLORTERM' in process.env) return true;
  // windows will support color
  if (os.type() === 'Windows_NT') return true;

  var term = process.env.TERM;
  if (!term) return false;

  term = term.toLowerCase();
  if (term.indexOf('color') !== -1) return true;
  return term === 'xterm' || term === 'linux';
}

function esc(code) {
  return '\x1b[' + code + 'm';
}

function colorize(name, text) {
  if (!isColorSupported()) {
    return text;
  }
  var code = codes[name];
  if (!code) {
    return text;
  }
  return esc(code) + text + esc('39;49;00');
}

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];
for (var i = 0; i < styles.length; i++) {
  codes[styles[i]] = i + 1;
}

var colors = [
  'black', 'red', 'green', 'yellow', 'blue',
  'magenta', 'cyan', 'white'
];
for (var i = 0; i < colors.length; i++) {
  codes[colors[i]] = i + 30;
  codes[colors[i] + '_bg'] = i + 40;
}

codes.gray = codes.grey = '30;1';
codes.gray_bg = codes.grey_bg = '40;1';

function Color(obj) {
  this.string = obj;
  this.color = obj;
}
util.inherits(Color, String);
Color.prototype.valueOf = function() {
  return this.color;
};
Color.prototype.toString = function() {
  return this.color;
};
Object.defineProperty(Color.prototype, 'length', {
  get: function() {
    return this.string.length;
  }
});
exports.Color = Color;

exports.color = {};
Object.keys(codes).forEach(function(style) {
  Object.defineProperty(Color.prototype, style, {
    get: function() {
      this.color = colorize(style, this.color);
      return this;
    }
  });

  exports.color[style] = function(text) {
    return colorize(style, text);
  };
});
Object.defineProperty(Color.prototype, 'style', {
  get: function() {
    return this.color;
  }
});

exports.paint = function(text) {
  return new Color(text);
};

exports.colorful = function() {
  if (String.prototype.to) return;

  Object.defineProperty(String.prototype, 'to', {
    get: function() { return new Color(this.valueOf()); }
  });
};

Object.defineProperty(exports, 'isSupported', {
  get: isColorSupported
});
