export function doSomethingToAdjacentCells(board, row, column, func) {
  const newBoard = JSON.parse(JSON.stringify(board));
  
  if(row > 0) {
    func(newBoard[row - 1][column]);

    if(column > 0) func(newBoard[row - 1][column - 1]);
    if(column < newBoard[0].length - 1) func(newBoard[row - 1][column + 1]);
  }

  if (column > 0) func(newBoard[row][column - 1]);
  if (column < newBoard[0].length - 1) func(newBoard[row][column + 1]);

  if (row < newBoard.length - 1) {
    func(newBoard[row + 1][column]);

    if (column > 0) func(newBoard[row + 1][column - 1]);
    if (column < newBoard[0].length - 1) func(newBoard[row + 1][column + 1]);
  }

  return newBoard;
};

export function referenceToAdjacentCells(originalBoard, row, column) {
  const adjacentCells = [];

  if(row > 0) {
    adjacentCells.push(originalBoard[row - 1][column]);

    if(column > 0) adjacentCells.push(originalBoard[row - 1][column - 1]);
    if(column < originalBoard[0].length - 1) adjacentCells.push(originalBoard[row - 1][column + 1]);
  }

  if (column > 0) adjacentCells.push(originalBoard[row][column - 1]);
  if (column < originalBoard[0].length - 1) adjacentCells.push(originalBoard[row][column + 1]);

  if (row < originalBoard.length - 1) {
    adjacentCells.push(originalBoard[row + 1][column]);

    if (column > 0) adjacentCells.push(originalBoard[row + 1][column - 1]);
    if (column < originalBoard[0].length - 1) adjacentCells.push(originalBoard[row + 1][column + 1]);
  }  

  return adjacentCells;
}