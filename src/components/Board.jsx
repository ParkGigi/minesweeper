import React, { useEffect, useContext } from 'react';
import './Board.scss';

import { Cell } from './Cell';

import { stateContext, dispatchContext } from '../Game';
import { BoardActions } from '../actions/BoardActions';

import { ROWS, COLUMNS } from '../constants/gameConstants';

export function Board() {
  //const [state, dispatch] = useReducer(boardReducer, { board: [] });
  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);
  
  useEffect(() => {
    dispatch({ type: BoardActions.INITIATE_BOARD });
  }, [dispatch])

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
              key={[i, j]}/>)
          )
        }
    </div>);
}