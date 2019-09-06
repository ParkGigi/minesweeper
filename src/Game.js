import React, { useState, useEffect } from 'react';
import './Game.css';

const HEIGHT = 5;
const WIDTH = 2;
const NUM_MINE = 8;

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

      let rowIndex = 0;

      while(numInjectedMines < NUM_MINE) {
        for(let i=0; i < initialBoard[rowIndex].length; i++) {
          const shouldInjectMine = Math.floor(Math.random() * Math.floor(2));

          if(shouldInjectMine === 1 && tempBoard[rowIndex][i].hasMine === false) {
            tempBoard[rowIndex][i].hasMine = true;
            numInjectedMines++;
          }
        }
        
        if (rowIndex === initialBoard.length - 1) {
          rowIndex = 0;
        } else {
          rowIndex++;
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
