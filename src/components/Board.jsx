import React, { useReducer, useEffect } from 'react';
import './Board.scss';

import { Cell } from './Cell';

import { boardReducer } from '../reducers/boardReducer';
import { ROWS, COLUMNS } from '../constants/gameConstants';

export function Board() {
  const [state, dispatch] = useReducer(boardReducer, { board: [] });
  
  useEffect(() => {
    dispatch({ type: 'INITIATE_BOARD' });
  }, [])

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
          state.board.map((row, i) => 
            row.map((cell, j) => <Cell 
              cellInfo={
                {
                  ...cell,
                  row: i,
                  column: j
                }
              }
              key={[i, j]}
              dispatchBoardAction={dispatch}/>)
          )
        }
    </div>);
}