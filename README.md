# @stkterry/react-reanim

> Simplify HTML5 canvas animations in React!

[![NPM](https://img.shields.io/npm/v/@stkterry/react-reanim.svg)](https://www.npmjs.com/package/@stkterry/react-reanim) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This project has two primary goals:

1) Prevent React from constantly re-rendering when drawing to the canvas.  Essentially,
turn the canvas into a mostly static component.
2) Separate the *step* / *draw* functionality from the associated boiler-plate common
to virtually every canvas animation.

## Install

```bash
npm install --save @stkterry/react-reanim
```

## Usage
The following results in a simple, spinning cube as a basic example.
```jsx
import React, { Component } from 'react'

import Reanim from '@stkterry/react-reanim'

export default function Simple() {

  const [angle, setAngle] = useState(0);

  const [style, setStyle] = useState();
  useEffect(() => {
    setStyle({ width: "250px", height: "250px",});
  }, [])

  const step = () => setAngle(angle + 1);

  const draw = ctx => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = '#4397AC';
    ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
    ctx.restore();
  };

  return (
    <Reanim
      step={step}
      draw={draw}
      width="250px"
      height="250px"
      style={style}
    />
  )
}
```
## Reanim Options
<table>
  <tr>
    <th> Name </th>
    <th> Type </th>
    <th> Description </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> step </td>
    <td> function </td>
    <td colspan="2"> Animation step, updated each frame | REQUIRED </td>

  </tr>
  <tr>
    <td> draw </td>
    <td> function </td>
    <td colspan="2"> Drawn to canvas each frame, must be written to include a canvas context input | REQUIRED </td>
  </tr>
  <tr>
    <td> onClick </td>
    <td> function </td>
    <td colspan="2"> Normal 'onClick' functionality, automatically gets memoized* </td>
  </tr>
  <tr>
    <td> onClickVars </td>
    <td> function </td>
    <td> onClick variables that you want to trigger a re-render when onClick is called* </td>
    <td> [ ] </td>
  </tr>

  <tr>
    <td> run </td>
    <td> boolean </td>
    <td> Starts/stops the animation loop </td>
    <td> true </td>
  </tr>

</table>
<sup>* onClick is passed to a useCallback to prevent constant re-render of the canvas
component.  If a re-render is required, users can pass the variables associated with onClick here that they wish to trigger the re-render. onClick is essentially: <code>useCallback(yourOnClickFunction, [...onClickVars])</code></sup>

<br></br>
*Reanim* will accept any other attributes that are common to React/canvas and pass
them accordingly (className, onMouseOver, style, width, height, etc...).    

### Important!
If you pass functions or objects to *Reanim* (excluding step/draw/onClick) without wrapping them in a *useCallback* or otherwise effectively memoizing them, you will trigger re-renders of the component on every frame!  While not necessarily a problem,
this can/will affect performance!  *I'm working on a solution that will
auto-memoize commonly passed variables.*


### Other
Common canvas weirdness still applies to *Reanim*.  It's up to you to know how to 
wield HTML5 canvas effectively.  This component is just a wrapper to separate the
step/draw functions from the typical boiler-plate necessary to get a canvas up
and running.

## Canvas
If you so desire, you can make use of the inner canvas component directly.
```jsx
import React, { useState } from 'react';

import { Canvas } from '@stkterry/react-reanim';

export default function Example(props) {

  // ... some code here
  // ...
  // ...
  const [ctx, setCtx] = useState();
  // do something with ctx

  return (
    <Canvas setCtx={setCtx} />
  )
};
```
Note that the only variable *Canvas* requires is a *setCtx* function which should
assign a 2d context off the node when mounted, otherwise *Canvas* will accept anything your standard canvas will.  *Canvas* is
memoized by default but remember that the contents you pass it may constantly trigger
re-renders anyway. 

*Canvas* is just a memoized regular canvas element with a passback for setting context.

## Bonus Hooks!
### useWindowDims
This hook returns the inner width and height of the current window.  It's
lightweight and will automatically add/remove the event listener.  Updates on resize.
```jsx

import React from 'react';

import { useWindowDims } from '@stkterry/react-reanim';

export default function Example(props) {

  const windowDims = useWindowDims();

  return (
    <div>
      <h2>innerWidth: {windowDims.width}</h2>
      <h2>innerHeight: {windowDims.height}</h2>
    </div>
  )
}
```
You may find this useful if you need to dynamically style or control your canvas
based on window size.  

## To Do
* Add target frame-rate functionality
* Add collection of convenient hooks for working with the canvas
* Implement a context simplification library for drawing
* Add real tests...
## License

MIT © [stkterry](https://github.com/stkterry)
