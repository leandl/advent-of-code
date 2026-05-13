import { Grid } from "../../utils/parsers";
import { Position } from "./utils";

export function part1Run(grid: Grid<string>, steps: number = 64) {
  const rows = grid.length;
  const cols = grid[0].length;

  let start: Position = { r: 0, c: 0 };

  // Find start
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "S") {
        start = { r, c };
      }
    }
  }

  //  cima, baixo, esquerda, direita
  const dirs = [
    { r: -1, c: 0 },
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
  ];

  let current = new Set<string>();
  current.add(`${start.r},${start.c}`);

  for (let step = 0; step < steps; step++) {
    const next = new Set<string>();

    for (const posStr of current) {
      const [r, c] = posStr.split(",").map(Number);

      for (const d of dirs) {
        const nr = r + d.r;
        const nc = c + d.c;

        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          grid[nr][nc] !== "#"
        ) {
          next.add(`${nr},${nc}`);
        }
      }
    }

    current = next;
  }

  return current.size;
}
