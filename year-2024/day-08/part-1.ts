import { Grid } from "../../utils/parsers";
import { getAntennas, inBounds } from "./utils";

export function part1Run(grid: Grid): number {
  const antennas = getAntennas(grid);
  const antinodes = new Set<string>();

  for (const points of antennas.values()) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i];
        const b = points[j];

        const dr = a.r - b.r;
        const dc = a.c - b.c;

        // Antinó antes de A
        const p1 = { r: a.r + dr, c: a.c + dc };
        if (inBounds(grid, p1)) {
          antinodes.add(`${p1.r},${p1.c}`);
        }

        // Antinó depois de B
        const p2 = { r: b.r - dr, c: b.c - dc };
        if (inBounds(grid, p2)) {
          antinodes.add(`${p2.r},${p2.c}`);
        }
      }
    }
  }

  return antinodes.size;
}
