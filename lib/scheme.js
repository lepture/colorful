var os = require('os');
var paint = require('./color').paint;

var isWin = false;
if (os.type() === 'Windows_NT') {
  isWin = true;
}

exports.arrow = {
  debug: {
    start: paint(isWin ? '!- ' : '➠ ').cyan.color,
    color: 'grey'
  },
  info: {
    start: paint(isWin ? '!- ' : '➠ ').cyan.color,
    color: null
  },
  warn: {
    start: paint(isWin ? '!- ' : '➠ ').cyan.color,
    color: 'yellow'
  },
  error: {
    start: paint(isWin ? '!- ' : '➠ ').cyan.color,
    color: 'red'
  },
  start: {
    start: paint(isWin ? '# ' : '⚑ ').magenta.color,
    color: 'bold'
  },
  end: {
    start: paint(isWin ? '*- ' : '➥ ').cyan.color,
    color: null
  }
};

exports.simple = {
  debug: {
    start: paint('debug - ').grey.color
  },
  info: {
    start: paint('info - ').green.color
  },
  warn: {
    start: paint('warn - ').yellow.color
  },
  error: {
    start: paint('error - ').red.color
  },
  start: {
    start: paint('start - ').magenta.color
  },
  end: {
    start: paint('debug - ').cyan.color
  }
};
