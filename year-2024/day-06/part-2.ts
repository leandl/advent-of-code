import { Grid, parseGrid } from "../../utils/parsers";
import {
  findGuard,
  Direction,
  nextPosition,
  isOutOfBounds,
  hasObstacleAhead,
  rotateRight,
  getVisitedPositions,
  GridObject,
} from "./utils";

type GuardStateKey = `${number}:${number}:${Direction}`;

function guardStateKey(
  row: number,
  col: number,
  direction: Direction
): GuardStateKey {
  return `${row}:${col}:${direction}`;
}

function simulateWithLoopDetection(grid: Grid): boolean {
  let { row, col, direction } = findGuard(grid);

  const visitedStates = new Set<GuardStateKey>();
  visitedStates.add(guardStateKey(row, col, direction));

  while (true) {
    const next = nextPosition(row, col, direction);

    if (isOutOfBounds(grid, next.row, next.col)) {
      return false;
    }

    if (hasObstacleAhead(grid, next.row, next.col)) {
      direction = rotateRight(direction);
    } else {
      row = next.row;
      col = next.col;
    }

    const state = guardStateKey(row, col, direction);

    if (visitedStates.has(state)) {
      return true;
    }

    visitedStates.add(state);
  }
}

export function part2Run(lines: string[]): number {
  const grid = parseGrid(lines);
  const visitedPositions = getVisitedPositions(grid);
  const { row: startRow, col: startCol } = findGuard(grid);

  let count = 0;

  for (const key of visitedPositions) {
    const [row, col] = key.split(":").map(Number);

    if (row === startRow && col === startCol) {
      continue;
    }

    if (grid[row][col] !== GridObject.EMPYT) {
      continue;
    }

    grid[row][col] = GridObject.OBSTACLE;

    if (simulateWithLoopDetection(grid)) {
      count++;
    }

    grid[row][col] = GridObject.EMPYT;
  }

  return count;
}
