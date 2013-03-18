var tty = require('tty');
var os = require('os');

exports.disabled = false;
exports.isatty = false;

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


function is256ColorSupported() {
  if (!isColorSupported()) return false;

  var term = process.env.TERM;
  term = term.toLowerCase();
  return term.indexOf('256') !== -1;
}
exports.isColorSupported = isColorSupported;
exports.is256ColorSupported = is256ColorSupported;
