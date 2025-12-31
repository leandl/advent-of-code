import { Grid, parseGrid } from "../../utils/parsers";
import { BEAM, EMPTY_CELL, findBeamSource, Position, SPLITTER } from "./utils";

function countTimelines(
  grid: Grid,
  pos: Position,
  memo: Map<string, number>
): number {
  const { x, y } = pos;
  const height = grid.length;
  const width = grid[0].length;

  if (x < 0 || x >= width || y < 0 || y >= height) {
    return 1;
  }

  const key = `${x},${y}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  const cell = grid[y][x];

  if (cell !== EMPTY_CELL) {
    memo.set(key, 1);
    return 1;
  }

  for (let row = y; row < height; row++) {
    const c = grid[row][x];

    if (c === BEAM) {
      memo.set(key, 1);
      return 1;
    }

    if (c === SPLITTER) {
      const result =
        countTimelines(grid, { x: x - 1, y: row }, memo) +
        countTimelines(grid, { x: x + 1, y: row }, memo);

      memo.set(key, result);
      return result;
    }
  }

  memo.set(key, 1);
  return 1;
}

export function part2Run(lines: string[]): number {
  const grid = parseGrid(lines);
  const source = findBeamSource(grid);

  const memo = new Map<string, number>();
  return countTimelines(grid, source, memo);
}
