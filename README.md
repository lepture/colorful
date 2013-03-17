# Colorful

It's not just color, it's everything colorful in terminal.

---------------------

# Color

Color in terminal and only terminal.

## Programmer

As a programmer, you think they are functions:

```javascript
var color = require('colorful').color
color.red('hello')
color.underline('hello')
color.red(color.underline('hello'))
```

## Human

As a human, you think you are a painter:

```javascript
var paint = require('colorful').paint
paint('hello').red.color
paint('hello').bold.underline.red.color
```

**WTF**, is bold, underline a color? If you don't like the idea, try:

```javascript
paint('hello').bold.underline.red.style
```

## Alien

As an alien, you are from outer space, you think it should be:

```javascript
require('colorful').colorful()
'hello'.to.red.color
'hello'.to.underline.bold.red.color
'hello'.to.underline.bold.red.style
```

## Detective

As a detective, you think we should detect if color is supported:

```javascript
require('colorful').isSupported

// we can disable color
require('colorful').disabled = true
require('colorful').isSupported
// => false
```

# Colors

- bold
- faint
- italic
- underline
- blink
- overline
- inverse
- conceal
- strike
- black
- black_bg
- red
- red_bg
- green
- green_bg
- yellow
- yellow_bg
- blue
- blue_bg
- magenta
- magenta_bg
- cyan
- cyan_bg
- white
- white_bg
- grey
- gray
- grey_bg
- gray_bg

# Changelog

- `1.3.0`

- removed logging
