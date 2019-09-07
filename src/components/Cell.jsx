import React, { useState } from 'react';

import './Cell.scss';
import mineImg from '../assets/img/mine.png';

export function Cell(props) {
  let { hasMine, isUncovered, numMinesAround } = props.cellInfo;
  let [uncovered, setUncovered] = useState(isUncovered);
  
  
  const style = (hasMine && uncovered) ? {
    backgroundImage: `url(${mineImg})`
  } : {};

  function onCellClick() {
    setUncovered(true);
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
      {(numMinesAround && !hasMine && uncovered) ? numMinesAround : ''}
      </div>
    </div>
  );
}