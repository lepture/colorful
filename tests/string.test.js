require('..').colorful();

var styles = [
  'bold', 'faint', 'italic', 'underline', 'blink', 'overline',
  'inverse', 'conceal', 'strike'
];
var colors = [
  'black', 'red', 'green', 'yellow', 'blue',
  'magenta', 'cyan', 'white', 'grey', 'gray'
];


styles.forEach(function(key) {
  console.log(key.to[key].color);
});


colors.forEach(function(key) {
  console.log(key.to[key].color);
});
