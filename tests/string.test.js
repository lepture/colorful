require('..').colorful();

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];

styles.forEach(function(key) {
  console.log(key.to[key].color);
});
