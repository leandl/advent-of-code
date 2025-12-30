export enum Direction {
  UP = "UP",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
}

export type PositionKey = `${number}:${number}`;

export type Grid = string[][];

export enum GridObject {
  EMPYT = ".",
  OBSTACLE = "#",
  VISITED = "X",
}

export function parseGrid(lines: string[]): Grid {
  return lines.map((line) => line.split(""));
}

export function rotateRight(direction: Direction): Direction {
  const rotateMap: Record<Direction, Direction> = {
    [Direction.UP]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.DOWN,
    [Direction.DOWN]: Direction.LEFT,
    [Direction.LEFT]: Direction.UP,
  };

  return rotateMap[direction];
}

function guardCharToDirection(char: string): Direction | null {
  switch (char) {
    case "^":
      return Direction.UP;
    case ">":
      return Direction.RIGHT;
    case "v":
      return Direction.DOWN;
    case "<":
      return Direction.LEFT;
    default:
      return null;
  }
}

export function findGuard(grid: Grid): {
  row: number;
  col: number;
  direction: Direction;
} {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const dir = guardCharToDirection(grid[row][col]);
      if (dir) {
        return { row, col, direction: dir };
      }
    }
  }

  throw new Error("Guarda não encontrado no mapa");
}

export function nextPosition(row: number, col: number, direction: Direction) {
  switch (direction) {
    case Direction.UP:
      return { row: row - 1, col };
    case Direction.DOWN:
      return { row: row + 1, col };
    case Direction.LEFT:
      return { row, col: col - 1 };
    case Direction.RIGHT:
      return { row, col: col + 1 };
  }
}

export function isOutOfBounds(grid: Grid, row: number, col: number): boolean {
  return row < 0 || col < 0 || row >= grid.length || col >= grid[0].length;
}

export function hasObstacleAhead(
  grid: Grid,
  row: number,
  col: number
): boolean {
  return grid[row][col] === GridObject.OBSTACLE;
}

export function positionKey(row: number, col: number): PositionKey {
  return `${row}:${col}`;
}

export function getVisitedPositions(grid: Grid): Set<PositionKey> {
  let { row, col, direction } = findGuard(grid);

  const visited = new Set<PositionKey>();
  visited.add(positionKey(row, col));

  while (true) {
    const next = nextPosition(row, col, direction);

    if (isOutOfBounds(grid, next.row, next.col)) {
      break;
    }

    if (hasObstacleAhead(grid, next.row, next.col)) {
      direction = rotateRight(direction);
      continue;
    }

    row = next.row;
    col = next.col;
    visited.add(positionKey(row, col));
  }

  return visited;
}
