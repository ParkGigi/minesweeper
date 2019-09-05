import React, { useState } from 'react';
import './Game.css';

const HEIGHT = 20;
const WIDTH = 15;
const NUM_MINE = 10;

function Game() {
  const [board, setBoard] = useState(Array.from(
    Array(HEIGHT), () =>
    new Array(WIDTH).fill({
      hasMine: false,
      unCovered: false,
      numMinesAround: 0,
    })
    ));

  function populateBoard() {

  }
  
  return(<div>Hello</div>);
}

export default Game;
