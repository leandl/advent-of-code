export type Direction = [number, number];

export const allDirections: Record<string, Direction> = {
  "^": [0, 1],
  ">": [1, 0],
  v: [0, -1],
  "<": [-1, 0],
};
