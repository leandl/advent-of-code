import { Grid } from "../../utils/parsers";
import { getAntennas, inBounds } from "./utils";

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

export function part2Run(grid: Grid): number {
  const antennas = getAntennas(grid);
  const antinodes = new Set<string>();

  for (const points of antennas.values()) {
    if (points.length < 2) continue;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];

        const dr = b.r - a.r;
        const dc = b.c - a.c;

        const g = gcd(dr, dc);
        const stepR = dr / g;
        const stepC = dc / g;

        // Caminhar para frente
        let r = a.r;
        let c = a.c;
        while (inBounds(grid, { r, c })) {
          antinodes.add(`${r},${c}`);
          r += stepR;
          c += stepC;
        }

        // Caminhar para trás
        r = a.r - stepR;
        c = a.c - stepC;
        while (inBounds(grid, { r, c })) {
          antinodes.add(`${r},${c}`);
          r -= stepR;
          c -= stepC;
        }
      }
    }
  }

  return antinodes.size;
}
