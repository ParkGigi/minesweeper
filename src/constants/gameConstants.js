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
    rows: 26,
    columns: 20,
    num_mine: 99,
  }
})

export const InjectMineEnum = Object.freeze({
  DO_NOT_INJECT: 0,
  INJECT: 1
});