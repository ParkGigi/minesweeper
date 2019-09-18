import React, { useEffect, useContext } from 'react';
import './Board.scss';

import { Cell } from './Cell';

import { stateContext, dispatchContext } from '../Game';
import { BoardActions } from '../actions/BoardActions';

import { GameLevel } from '../constants/gameConstants';

export function Board() {
  const state = useContext(stateContext);
  const dispatch = useContext(dispatchContext);
  
  useEffect(() => {
    dispatch({ type: BoardActions.INITIATE_DUMMY_BOARD, payload: { level: GameLevel.INTERMEDIATE } });
  }, [dispatch])

  return(
    <div
      className="board"
      style={
        {
          gridTemplateRows: `repeat(${state.level.rows}, 22px)`,
          gridTemplateColumns: `repeat(${state.level.columns}, 22px)`,
        }
      }>
        {
            state.gameOver ? 
            <div className="gameOver">
              GAME OVER
            </div> : ''
          }
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