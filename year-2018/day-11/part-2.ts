import { getPowerLevel } from "./utils";

export function part2Run(serial: number) {
  const SIZE = 300;

  // summed-area table
  const sat: number[][] = Array.from({ length: SIZE + 1 }, () =>
    Array(SIZE + 1).fill(0),
  );

  // construir SAT direto (sem grid separado)
  for (let y = 1; y <= SIZE; y++) {
    for (let x = 1; x <= SIZE; x++) {
      const val = getPowerLevel(x, y, serial);

      sat[y][x] = val + sat[y - 1][x] + sat[y][x - 1] - sat[y - 1][x - 1];
    }
  }

  let bestX = 0;
  let bestY = 0;
  let bestSize = 0;
  let maxPower = -Infinity;

  // testar TODOS os tamanhos
  for (let size = 1; size <= SIZE; size++) {
    for (let y = 1; y <= SIZE - size + 1; y++) {
      for (let x = 1; x <= SIZE - size + 1; x++) {
        const x2 = x + size - 1;
        const y2 = y + size - 1;

        const sum =
          sat[y2][x2] - sat[y - 1][x2] - sat[y2][x - 1] + sat[y - 1][x - 1];

        if (sum > maxPower) {
          maxPower = sum;
          bestX = x;
          bestY = y;
          bestSize = size;
        }
      }
    }

    if (size > 50) break;
  }

  return `${bestX},${bestY},${bestSize}`;
}
