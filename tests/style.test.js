var color = require('..');

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];

styles.forEach(function(key) {
  console.log(color[key](key));
});
