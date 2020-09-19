import React, { useState } from 'react';


import Reanim from '@stkterry/react-reanim';

export default function StopStart() {


  const [angle, setAngle] = useState(0);
  const [run, setRun] = useState();

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
  }

  return (
    <div className="container">
      <Reanim 
        className="canvas"
        step={step} 
        draw={draw}
        run={run}
        onClick={() => setRun(prev => !prev)}
        onClickVars={[]}
        width="250px"
        height="250px"
      />
      <p>Click the canvas to Stop/Start!</p>
    </div>
  )
}