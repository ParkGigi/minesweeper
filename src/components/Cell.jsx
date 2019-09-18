import React, { useContext, useEffect } from 'react';

import { BoardActions } from '../actions/BoardActions';
import { dispatchContext, stateContext } from '../Game';

import './Cell.scss';

export function Cell(props) {
  const dispatch = useContext(dispatchContext);
  const { gameOver, level, clickNumber } = useContext(stateContext);
  let { hasMine, isUncovered, numMinesAround, row, column, flagged } = props.cellInfo;
  
  useEffect(() => {
    if(isUncovered && hasMine) dispatch({ type: BoardActions.GAME_OVER });
  }, [isUncovered, dispatch, hasMine])

  function onCellClick() {
    if (flagged || gameOver) return;
    if (clickNumber === 0) {
      dispatch({ type: BoardActions.INITIATE_BOARD, payload: { level, row, column } });
    }
    dispatch({ type: BoardActions.UNCOVER_CELL, payload: { row, column } });
  }

  function onCellDoubleClick() {
    if (gameOver) return;
    dispatch({ type: BoardActions.DOUBLE_CLICK_CELL, payload: { row, column }})
  }

  function onCellRightClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (gameOver || isUncovered) return;
    dispatch({ type: BoardActions.RIGHT_CLICK_CELL, payload: { row, column }});
    return false;
  }

  return(
    <div 
      className={`cell ${isUncovered ? 'uncovered' : ''}`}
      onClick={onCellClick}
      onDoubleClick={onCellDoubleClick}
      onContextMenu={(e) => onCellRightClick(e)}
    >
      <div
        className={`
          cell_content _${numMinesAround} 
          ${(hasMine && isUncovered) || (hasMine && gameOver) ? 'mine' : ''} 
          ${flagged ? 'flagged' : ''}`}
      >
      {(numMinesAround && !hasMine && isUncovered) ? numMinesAround : ''}
      </div>
    </div>
  );
}