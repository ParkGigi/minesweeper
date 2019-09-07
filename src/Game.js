import React from 'react';
import './Game.css';

import { Board } from './components/Board';

function Game() {
  return(
    <div className="game">
      <Board />
    </div>
  );
}

export default Game;
