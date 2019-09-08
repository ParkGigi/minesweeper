import React, { useReducer } from 'react';
import './Game.css';

import { Board } from './components/Board';

import { boardReducer } from './reducers/boardReducer';
import { BoardActions } from './actions/BoardActions';

export const stateContext = React.createContext();
export const dispatchContext = React.createContext();


function Game() {
  const [state, dispatch] = useReducer(boardReducer, { board: [] });

  function onResetClick() {
    dispatch({ type: BoardActions.INITIATE_BOARD });
  }

  return(
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        <div className="game">
          <Board />
          <button onClick={onResetClick}>Restart</button>
        </div>
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

export default Game;
