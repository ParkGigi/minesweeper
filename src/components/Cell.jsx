import React, { useContext } from 'react';

import { BoardActions } from '../actions/BoardActions';
import { dispatchContext } from '../Game';

import './Cell.scss';
import mineImg from '../assets/img/mine.png';

export function Cell(props) {
  const dispatch = useContext(dispatchContext);
  let { hasMine, isUncovered, numMinesAround, row, column, flagged } = props.cellInfo;
  
  function onCellClick() {
    if(flagged) return;
    dispatch({ type: BoardActions.UNCOVER_CELL, payload: { row, column } });
  }

  function onCellDoubleClick() {
    dispatch({ type: BoardActions.DOUBLE_CLICK_CELL, payload: { row, column }})
  }

  function onCellRightClick(e) {
    e.preventDefault();
    e.stopPropagation();
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
          ${hasMine && isUncovered ? 'mine' : ''} 
          ${flagged ? 'flagged' : ''}`}
      >
      {(numMinesAround && !hasMine && isUncovered) ? numMinesAround : ''}
      </div>
    </div>
  );
}