import { InjectMineEnum } from '../constants/gameConstants';

import { BoardActions } from '../actions/BoardActions';
import { checkAdjacentCells } from '../utility/utility';

export function boardReducer (state, action) {
  switch(action.type) {
    case BoardActions.INITIATE_BOARD:
      return {
        ...state,
        gameOver: false,
        board: restartGame(action.payload.level)
      };
    
    case BoardActions.UNCOVER_CELL:
      return {
        ...state,
        board: uncoverCell(state.board, action.payload.row, action.payload.column),
      };

    case BoardActions.DOUBLE_CLICK_CELL:
      return {
        ...state,
        board: uncoverAdjacentCells(state.board, action.payload.row, action.payload.column),
      };

    case BoardActions.RIGHT_CLICK_CELL:
      return {
        ...state,
        board: toggleFlagCell(state.board, action.payload.row, action.payload.column),
      };

    case BoardActions.CHANGE_LEVEL:
      return {
        ...state,
        level: action.payload.level,
        board: restartGame(action.payload.level),
      };
    
    case BoardActions.GAME_OVER:
      return {
        ...state,
        gameOver: true,
      };

    default:
      throw new Error('No matching action type in reducer');
  }
}

function initiateEmptyBoard({ rows, columns, num_mine }) {
  return Array.from(
    Array(rows), () =>
    new Array(columns).fill({
      hasMine: false,
      isUncovered: false,
      numMinesAround: 0,
      flagged: false,
    })
    );
}

function populateMines(emptyBoard, numMine) {
  let numInjectedMines = 0;
  let tempBoard = JSON.parse(JSON.stringify(emptyBoard));

  let rowIndex = 0;

  while(numInjectedMines < numMine) {
    for(let i=0; i < emptyBoard[rowIndex].length; i++) {
      if(numInjectedMines === numMine) {
        break;
      }

      const shouldInjectMine = Math.floor(Math.random() * Math.floor(10));

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
  return tempBoard;
}

function populateNumber(prevBoard) {
  for(let i=0; i <prevBoard.length; i++) {
    for(let j=0; j<prevBoard[i].length; j++) {
      let track = 0;

      const keepTrack = (cell) => {
        if(cell.hasMine) track++;
      }

      checkAdjacentCells(prevBoard, i, j, keepTrack);
      console.log('track: ', track);
      prevBoard[i][j].numMinesAround = track;
    }
  }
  return prevBoard;
};

function restartGame(level) {
  let emptyBoard = initiateEmptyBoard(level);
  let boardWithMines = populateMines(emptyBoard, level.num_mine);
  return populateNumber(boardWithMines);
}

function uncoverCell(originalBoard, row, column) {
  const newBoard = JSON.parse(JSON.stringify(originalBoard));
  newBoard[row][column].isUncovered = true;
  return newBoard;
}

function toggleFlagCell(originalBoard, row, column) {
  const newBoard = JSON.parse(JSON.stringify(originalBoard));
  newBoard[row][column].flagged = !newBoard[row][column].flagged;
  return newBoard
}

function uncoverAdjacentCells(originalBoard, row, column) {  
  function ifNotFlaggedUncover(cell) {
    cell.isUncovered = cell.flagged ? false : true;
  }

  return checkAdjacentCells(originalBoard, row, column, ifNotFlaggedUncover);
}