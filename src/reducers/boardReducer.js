import { InjectMineEnum } from '../constants/gameConstants';

import { BoardActions } from '../actions/BoardActions';

export function boardReducer (state, action) {
  switch(action.type) {
    case BoardActions.INITIATE_BOARD:
      return {
        ...state,
        board: restartGame(action.payload.level)
      };
    
    case BoardActions.UNCOVER_CELL:
      return {
        ...state,
        board: uncoverCell(state.board, action.payload.row, action.payload.column),
      }

    case BoardActions.CHANGE_LEVEL:
      return {
        ...state,
        level: action.payload.level,
        board: restartGame(action.payload.level),
      }

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
      let placesToCheck = ['topLeft', 'top', 'topRight', 'left', 'right', 'bottomLeft', 'bottom', 'bottomRight'];
      
      if(i === 0) {
        placesToCheck = getRidOf(placesToCheck, ['topLeft', 'top', 'topRight']);
      }
      
      if(j === 0) { 
        placesToCheck = getRidOf(placesToCheck, ['topLeft', 'left', 'bottomLeft']);
      }

      if(i === prevBoard.length - 1) {
        placesToCheck = getRidOf(placesToCheck, ['bottomLeft', 'bottom', 'bottomRight']);
      }

      if(j === prevBoard[i].length - 1) {
        placesToCheck = getRidOf(placesToCheck, ['topRight', 'right', 'bottomRight']);
      }

      let numberOfMinesAroundCell = 0;
      
      for(let k=0; k < placesToCheck.length; k++) {
        const currentPosition = placesToCheck[k];
        
        if ((currentPosition === 'topLeft' && prevBoard[i - 1][j - 1].hasMine) ||
            (currentPosition === 'top' && prevBoard[i -1][j].hasMine) ||
            (currentPosition === 'topRight' && prevBoard[i - 1][j + 1].hasMine) ||
            (currentPosition === 'left' && prevBoard[i][j-1].hasMine) ||
            (currentPosition === 'right' && prevBoard[i][j+1].hasMine) ||
            (currentPosition === 'bottomLeft' && prevBoard[i+1][j-1].hasMine) ||
            (currentPosition === 'bottom' && prevBoard[i+1][j].hasMine) ||
            (currentPosition === 'bottomRight' && prevBoard[i+1][j+1].hasMine)
        ) {
          numberOfMinesAroundCell++;
        }
      }

      prevBoard[i][j].numMinesAround = numberOfMinesAroundCell;
    }
  }

  return prevBoard;

  function getRidOf(originalArray, toEraseArray) {
    return originalArray.filter(element => !toEraseArray.includes(element));
  }
}

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