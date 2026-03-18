import { getPowerLevel } from "./utils";

export function part1Run(serial: number) {
  const SIZE = 300;

  // grid normal
  const grid: number[][] = Array.from({ length: SIZE + 1 }, () =>
    Array(SIZE + 1).fill(0),
  );

  // summed-area table (prefix sum)
  const sat: number[][] = Array.from({ length: SIZE + 1 }, () =>
    Array(SIZE + 1).fill(0),
  );

  // preencher grid + prefix sum
  for (let y = 1; y <= SIZE; y++) {
    for (let x = 1; x <= SIZE; x++) {
      const val = getPowerLevel(x, y, serial);
      grid[y][x] = val;

      sat[y][x] = val + sat[y - 1][x] + sat[y][x - 1] - sat[y - 1][x - 1];
    }
  }

  let bestX = 0;
  let bestY = 0;
  let maxPower = -Infinity;

  // testar todos 3x3 usando prefix sum
  for (let y = 1; y <= SIZE - 2; y++) {
    for (let x = 1; x <= SIZE - 2; x++) {
      const x2 = x + 2;
      const y2 = y + 2;

      const sum =
        sat[y2][x2] - sat[y - 1][x2] - sat[y2][x - 1] + sat[y - 1][x - 1];

      if (sum > maxPower) {
        maxPower = sum;
        bestX = x;
        bestY = y;
      }
    }
  }

  return `${bestX},${bestY}`;
}
