export type Position = { x: number; y: number };
export type MovePosition = { dx: number; dy: number };

export enum Direction {
  NORTH = 1,
  SOUTH = 2,
  WEST = 3,
  EAST = 4,
}

export const DIRS: Record<Direction, MovePosition> = {
  [Direction.NORTH]: { dx: 0, dy: -1 },
  [Direction.SOUTH]: { dx: 0, dy: 1 },
  [Direction.WEST]: { dx: -1, dy: 0 },
  [Direction.EAST]: { dx: 1, dy: 0 },
};

export const OPPOSITE: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.NORTH,
  [Direction.WEST]: Direction.EAST,
  [Direction.EAST]: Direction.WEST,
};

export function key(x: number, y: number): string {
  return `${x},${y}`;
}
