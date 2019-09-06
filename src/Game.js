import React, { useState, useEffect } from 'react';
import './Game.css';

import { Board } from './components/Board';

import { ROWS, COLUMNS, NUM_MINE, InjectMineEnum } from './constants/gameConstants';

function Game() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    populateMines();
  }, []);

  function initiateEmptyBoard() {
    return Array.from(
      Array(ROWS), () =>
      new Array(COLUMNS).fill({
        hasMine: false,
        isUncovered: false,
        numMinesAround: 0,
      })
      );
  }

  function populateMines() {
    let emptyBoard = initiateEmptyBoard();

    let numInjectedMines = 0;
    let tempBoard = JSON.parse(JSON.stringify(emptyBoard));

    let rowIndex = 0;

    while(numInjectedMines < NUM_MINE) {
      for(let i=0; i < emptyBoard[rowIndex].length; i++) {
        if(numInjectedMines === NUM_MINE) {
          break;
        }

        const shouldInjectMine = Math.floor(Math.random() * Math.floor(Object.keys(InjectMineEnum).length));

        if(shouldInjectMine === InjectMineEnum.INJECT && 
          tempBoard[rowIndex][i].hasMine === false
          ) {
          tempBoard[rowIndex][i].hasMine = true;
          numInjectedMines++;
        }
      }
      
      if (rowIndex === emptyBoard.length - 1) {
        rowIndex = 0;
      } else {
        rowIndex++;
      }
    }
    setBoard(tempBoard);
  }

  return(
    <div className="game">
      <Board board={board}/>
    </div>
  );
}

export default Game;
