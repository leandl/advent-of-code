export type Node = {
  x: number;
  y: number;
  cost: number;
};

export const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
