# Colorful support for terminal

---------------------

## Color

color as function:

```javascript
var color = require('colorful').color
color.red('hello')
color.underline('hello')
```

color as human:

```javascript
require('colorful').colorful()
'hello'.to.red.color
'hello'.to.underline.bold.red.color
```

color and style supports:

- `black` `black_bg`
- `red` `red_bg`
- `green` `green_bg`
- `yellow` `yellow_bg`
- `blue` `blue_bg`
- `magenta` `magenta_bg`
- `cyan` `cyan_bg`
- `white` `white_bg`
- `gray` `grey` `gray_bg` `grey_bg`
-  bold
-  italic
-  underline
-  blink
-  inverse
-  strike

and detect is color supported:

```javascript
require('colorful').color.isSupported
```

## Logging

Colorful and nested logging support.
