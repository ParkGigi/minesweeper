import React, { useState } from 'react';

import './Cell.scss';
import mineImg from '../assets/img/mine.png';

export function Cell(props) {
  let { hasMine, isUncovered, numMinesAround, row, column } = props.cellInfo;
  
  const style = (hasMine && isUncovered) ? {
    backgroundImage: `url(${mineImg})`
  } : {};

  function onCellClick() {
    props.dispatchBoardAction({ type: 'UNCOVER_CELL', payload: {row: row, column: column} });
    console.log('isUncovered: ', isUncovered);
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