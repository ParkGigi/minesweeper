import React, { useState, useEffect } from 'react';
import './Game.css';

const HEIGHT = 5;
const WIDTH = 2;
const NUM_MINE = 5;

function Game() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    function populateMines() {
      let initialBoard = Array.from(
        Array(HEIGHT), () =>
        new Array(WIDTH).fill({
          hasMine: false,
          isUncovered: false,
          numMinesAround: 0,
        })
        );

      let numInjectedMines = 0;
      let tempBoard = JSON.parse(JSON.stringify(initialBoard));

      for(let i=0; i < initialBoard.length; i++) {
        for(let j=0; j < initialBoard[i].length; j++) {
          const shoudInjectMine = Math.floor(Math.random() * Math.floor(2));

          if (shoudInjectMine === 1 && numInjectedMines < NUM_MINE) {
            tempBoard[i][j].hasMine = true;
            numInjectedMines = numInjectedMines + 1;
          }
        }
      }
      setBoard(tempBoard);
    }
    populateMines();
  }, []);

  return(
    <div>
      Welcome to minesweeper!
    </div>
  );
}

export default Game;
