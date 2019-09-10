import React, { useReducer } from 'react';
import './Game.css';

import { Board } from './components/Board';

import { boardReducer } from './reducers/boardReducer';
import { BoardActions } from './actions/BoardActions';
import { GameLevel } from './constants/gameConstants';

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();


function Game() {
  const [state, dispatch] = useReducer(boardReducer, { board: [], level: GameLevel.INTERMEDIATE });

  function onResetClick() {
    dispatch({ type: BoardActions.INITIATE_BOARD, payload: { level: state.level } });
  }

  function onLevelSelect(event) {
    dispatch({ type: BoardActions.CHANGE_LEVEL, payload: { level: GameLevel[event.target.value] }});
  }

  return(
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        <div className="game">
          <Board />
          <button onClick={onResetClick}>Restart</button>
          <select
            value={state.level.name}
            onChange={(e) => onLevelSelect(e)}>
            <option value={GameLevel.EASY.name}>Easy</option>
            <option value={GameLevel.INTERMEDIATE.name}>Intermediate</option>
            <option value={GameLevel.EXPERT.name}>Expert</option>
          </select>
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default Game;
