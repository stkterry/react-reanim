import React, { useState } from 'react';

import Reanim from '@stkterry/react-reanim';

export default function Spots() {

  const [angle, setAngle] = useState(0);
  const [spots, setSpots] = useState([]);
  const [sliderVal, setSliderVal] = useState("50");

  const onClick = event => {
    event.persist();
    const rect = event.target.getBoundingClientRect();
    setSpots(spots => {
      spots.push({ 
        x: event.clientX - rect.left, 
        y: event.clientY - rect.top
      })
      return spots;
    })
  }

  const step = () => setAngle(angle + 1);

  const draw = ctx => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = `rgb(200, ${255-sliderVal}, ${sliderVal})`;
    ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
    ctx.restore();

    ctx.fillStyle = "rgba(250, 128, 114, .5)";
    for (let spot of spots) {
      ctx.beginPath();
      ctx.arc(spot.x, spot.y, 4, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
    
  }

  return (
    <div className="container">
      <Reanim
        className="canvas"
        step={step} 
        draw={draw}
        run={true}
        onClick={onClick}
        width="250px"
        height="250px"
      />
      <div className="spots-slider">
        <input 
          name="slider"
          type="range" 
          min="0" 
          max="255" 
          value={sliderVal}
          step="1"
          onChange={event => setSliderVal(event.target.value)}
        />
        <label>Color</label>
      </div>
      <p>Click the canvas to add some dots</p>
      <button
        onClick={() => setSpots([])}
        >
          Clear Dots
      </button>
    </div>
  )
}