
var Color = require('..').Color;

console.log();
console.log('System colors');
for (var i = 0; i < 16; i++) {
  var c = new Color('  ');
  c.bgcolor = i;
  if (i === 8) {
    console.log();
  }
  process.stdout.write(c.valueOf());
}
console.log();
console.log();
console.log('Background')
for (var green = 0; green < 6; green++) {
  for (var red = 0; red < 6; red++) {
    for (var blue = 0; blue < 6; blue++) {
      var c = new Color('  ');
      c.bgcolor = 16 + red * 36 + green * 6 + blue;
      process.stdout.write(c.valueOf());
    }
  }
  console.log();
}
console.log();
console.log('Grayscale');
for (var i = 232; i < 256; i++) {
  var c = new Color('  ');
  c.bgcolor = i;
  process.stdout.write(c.valueOf());
}
console.log();
console.log();
console.log('Colors');
for (var i = 0; i < 256; i++) {
  if (i !== 0 && i % 16 === 0) {
    console.log();
  }
  var c = new Color(wordwrap(i));
  c.fgcolor = i;
  process.stdout.write(c.valueOf());
}
console.log();

function wordwrap(i) {
  i = String(i)
  return i + new Array(5 - i.length).join(' ');
}
