import React, { memo } from 'react';

export default memo(function Canvas({ setCtx, ...rest }) {

  return (
    <canvas
      ref={node => node ? setCtx(node.getContext('2d')) : null}
      {...rest}
    />
  )
});