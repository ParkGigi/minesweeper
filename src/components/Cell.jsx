import React from 'react';

import './Cell.scss';
import mineImg from '../assets/img/mine.png';

export function Cell(props) {
  const { cellInfo } = props;
  
  const style = cellInfo.hasMine ? {
    backgroundImage: `url(${mineImg})`
  } : {}

  return(
    <div className="cell">
      <div
        className="cell_content"
        style={style}
      />
    </div>
  );
}