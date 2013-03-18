
/* ANSI color support in terminal
 * @author: Hsiaoming Yang <lepture@me.com>
 *
 * http://en.wikipedia.org/wiki/ANSI_escape_code
 */


var util = require('util');
var terminal = require('./terminal');

var colors = [
  'black', 'red', 'green', 'yellow', 'blue',
  'magenta', 'cyan', 'white'
];

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];

function Color(obj) {
  this.string = obj;

  this.styles = [];
  this.color = null;
  this.bgcolor = null;
}
util.inherits(Color, String);

for (var i = 0; i < colors.length; i++) {
  Object.defineProperty(Color.prototype, colors[i], {
    get: function() {
      this.color = i;
      return this;
    }
  });
  Object.defineProperty(Color.prototype, colors[i] + '_bg', {
    get: function() {
      this.bgcolor = i;
      return this;
    }
  });
}
for (var i = 0; i < styles.length; i++) {
  Object.defineProperty(Color.prototype, styles[i], {
    get: function() {
      if (this.styles.indexOf(i) === -1) {
        this.styles = this.styles.concat(i);
      }
      return this;
    }
  });
}

Color.prototype.valueOf = function() {
  if (!terminal.isColorSupported()) return this.string;
  var is256 = terminal.is256ColorSupported();

  var text = this.string;
  var reset = '\x1b[0m';

  if (is256) {
    if (this.color !== null) {
      text = '\x1b[38;5;' + this.color + 'm' + text + reset;
    }
    if (this.bgcolor !== null) {
      text = '\x1b[48;5;' + this.bgcolor + 'm' + text + reset;
    }
  } else {
    if (this.color !== null && this.color < 8) {
      text = '\x1b[' + (30 + this.color) + 'm' + text + reset;
    }
    if (this.bgcolor !== null && this.bgcolor < 8) {
      text = '\x1b[' + (40 + this.bgcolor) + 'm' + text + reset;
    }
  }
  if (this.styles.length) {
    text = '\x1b[' + this.styles.join(';') + 'm' + text + reset;
  }
  return text;
};
Color.prototype.toString = function() {
  return this.valueOf();
};
Object.defineProperty(Color.prototype, 'length', {
  get: function() {
    return this.string.length;
  }
});

exports.Color = Color;
