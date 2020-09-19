import React from 'react'

import { Canvas } from '@stkterry/react-reanim';
import StopStart from './animations/StopStart';
import Spots from './animations/Spots';
import Simple from './animations/Simple';

import '@stkterry/react-reanim/dist/index.css'

const App = () => {
  return <div id="main">
    <div id="examples">
      <StopStart />
      <Spots />
      <Simple />
    </div>
  </div>
}

export default App
