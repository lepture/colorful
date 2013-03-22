exports = module.exports = require('./lib/ansi');

exports.paint = function(text) {
  return new exports.Color(text);
};

exports.colorful = function() {
  // don't overwrite
  if (String.prototype.to) return;
  Object.defineProperty(String.prototype, 'to', {
    get: function() {
      return new exports.Color(this.valueOf());
    }
  });
};

Object.defineProperty(exports, 'isSupported', {
  get: exports.isColorSupported
});
