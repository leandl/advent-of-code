import { Grid } from "../../utils/parsers";
import { isDigit } from "./utils";

function extractNumber(
  grid: Grid,
  row: number,
  col: number
): { value: number; startCol: number } {
  let start = col;

  while (start > 0 && isDigit(grid[row][start - 1])) {
    start--;
  }

  let numStr = "";
  let c = start;

  while (c < grid[row].length && isDigit(grid[row][c])) {
    numStr += grid[row][c];
    c++;
  }

  return {
    value: Number(numStr),
    startCol: start,
  };
}

function getAdjacentNumbers(grid: Grid, row: number, col: number): number[] {
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

  const numbers = new Map<string, number>();

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;

    if (
      r >= 0 &&
      r < grid.length &&
      c >= 0 &&
      c < grid[0].length &&
      isDigit(grid[r][c])
    ) {
      const { value, startCol } = extractNumber(grid, r, c);
      const key = `${r}-${startCol}`; // identifica o número único
      numbers.set(key, value);
    }
  }

  return Array.from(numbers.values());
}

export function part2Run(grid: Grid) {
  let sum = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== "*") continue;

      const adjacentNumbers = getAdjacentNumbers(grid, row, col);

      if (adjacentNumbers.length === 2) {
        sum += adjacentNumbers[0] * adjacentNumbers[1];
      }
    }
  }

  return sum;
}
