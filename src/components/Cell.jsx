import React, { useContext } from 'react';

import { BoardActions } from '../actions/BoardActions';
import { dispatchContext } from '../Game';

import './Cell.scss';
import mineImg from '../assets/img/mine.png';

export function Cell(props) {
  const dispatch = useContext(dispatchContext);
  let { hasMine, isUncovered, numMinesAround, row, column } = props.cellInfo;
  
  const style = (hasMine && isUncovered) ? {
    backgroundImage: `url(${mineImg})`
  } : {};

  function onCellClick() {
    dispatch({ type: BoardActions.UNCOVER_CELL, payload: {row: row, column: column} });
  }

  return(
    <div 
      className="cell"
      onClick={onCellClick}
    >
      <div
        className="cell_content"
        style={style}>
      {(numMinesAround && !hasMine && isUncovered) ? numMinesAround : ''}
      </div>
    </div>
  );
}