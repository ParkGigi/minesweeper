import React from 'react';
import './Board.scss';

import { Cell } from './Cell';

import { ROWS, COLUMNS } from '../constants/gameConstants';

export function Board(props) {
  const board = props.board;
  return(
    <div
      className="board"
      style={
        {
          gridTemplateRows: `repeat(${ROWS}, calc(25vw / ${COLUMNS}))`,
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
        }
      }>
        {
          board.map((row, i) => 
            row.map((cell, j) => <Cell cellInfo={cell} key={[i, j]}/>)
          )
        }
    </div>);
}