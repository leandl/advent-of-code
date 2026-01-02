import { Grid } from "../../utils/parsers";
import { isDigit, isSymbol } from "./utils";

function hasAdjacentSymbol(grid: Grid, row: number, col: number): boolean {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;

    if (
      r >= 0 &&
      r < grid.length &&
      c >= 0 &&
      c < grid[0].length &&
      isSymbol(grid[r][c])
    ) {
      return true;
    }
  }

  return false;
}

export function part1Run(grid: Grid) {
  let sum = 0;

  for (let row = 0; row < grid.length; row++) {
    let col = 0;

    while (col < grid[row].length) {
      const char = grid[row][col];

      // Se não é dígito, anda
      if (!isDigit(char)) {
        col++;
        continue;
      }

      // Encontrou início de um número
      let startCol = col;
      let numberStr = "";
      let hasSymbol = false;

      while (col < grid[row].length && isDigit(grid[row][col])) {
        numberStr += grid[row][col];

        if (hasAdjacentSymbol(grid, row, col)) {
          hasSymbol = true;
        }

        col++;
      }

      // Se for part number, soma
      if (hasSymbol) {
        sum += Number(numberStr);
      }
    }
  }

  return sum;
}
