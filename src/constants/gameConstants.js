export const GameLevel = Object.freeze({
  EASY: {
    name: 'EASY',
    rows: 10,
    columns: 8,
    num_mine: 10,
  },

  INTERMEDIATE: {
    name: 'INTERMEDIATE',
    rows: 18,
    columns: 14,
    num_mine: 40,
  },

  EXPERT: {
    name: 'EXPERT',
    rows: 23,
    columns: 23,
    num_mine: 99,
  }
})

export const GameInitialState = {
  board: [],
  level: GameLevel.INTERMEDIATE,
  gameOver: false,
  minesLeft: GameLevel.INTERMEDIATE.num_mine,
  gameClear: false,
  clickNumber: 0,
};

export const InjectMineEnum = Object.freeze({
  DO_NOT_INJECT: 0,
  INJECT: 1
});