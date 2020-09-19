import React, { useEffect, useRef, useCallback, useState } from 'react';

import Canvas from './Canvas';

export default function Reanim({ step, run = true, draw, onClick, onClickVars=[], ...rest }) {

  const requestRef = useRef();
  const [ctx, setCtx] = useState();

  const animate = useCallback(() => {
    step();
    // ctx && draw(ctx);
    requestRef.current = requestAnimationFrame(animate);
  }, [step])

  useEffect(() => {
    if (run) requestRef.current = requestAnimationFrame(animate);
    else cancelAnimationFrame(requestRef.current);

    return () => cancelAnimationFrame(requestRef.current);
  }, [run, animate])

  useEffect(() => (ctx && draw(ctx)), [ctx, draw]);

  return (
    <Canvas 
      setCtx={setCtx} 
      onClick={onClick && useCallback(onClick, [...onClickVars])} 
      {...rest} 
    />
  )
}

