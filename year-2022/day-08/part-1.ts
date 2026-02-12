import { Grid } from "../../utils/parsers";

function isVisible(grid: Grid<number>, row: number, col: number): boolean {
  const height = grid[row][col];
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Bordas são sempre visíveis
  if (row === 0 || col === 0 || row === numRows - 1 || col === numCols - 1) {
    return true;
  }

  // Verifica esquerda
  let visibleLeft = true;
  for (let c = col - 1; c >= 0; c--) {
    if (grid[row][c] >= height) {
      visibleLeft = false;
      break;
    }
  }

  // Verifica direita
  let visibleRight = true;
  for (let c = col + 1; c < numCols; c++) {
    if (grid[row][c] >= height) {
      visibleRight = false;
      break;
    }
  }

  // Verifica cima
  let visibleUp = true;
  for (let r = row - 1; r >= 0; r--) {
    if (grid[r][col] >= height) {
      visibleUp = false;
      break;
    }
  }

  // Verifica baixo
  let visibleDown = true;
  for (let r = row + 1; r < numRows; r++) {
    if (grid[r][col] >= height) {
      visibleDown = false;
      break;
    }
  }

  return visibleLeft || visibleRight || visibleUp || visibleDown;
}

export function part1Run(grid: Grid<number>) {
  let visibleCount = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (isVisible(grid, row, col)) {
        visibleCount++;
      }
    }
  }

  return visibleCount;
}
