var paint = require('..').paint;

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];

styles.forEach(function(key) {
  console.log(paint(key)[key].color);
});
