import { Grid } from "../../utils/parsers";
import { simulate } from "./utils";

export function part2Run(grid: Grid<string>) {
  const h = grid.length;
  const w = grid[0].length;

  let max = 0;

  // topo
  for (let x = 0; x < w; x++) {
    max = Math.max(max, simulate(grid, { x, y: 0, dir: "D" }));
  }

  // baixo
  for (let x = 0; x < w; x++) {
    max = Math.max(max, simulate(grid, { x, y: h - 1, dir: "U" }));
  }

  // esquerda
  for (let y = 0; y < h; y++) {
    max = Math.max(max, simulate(grid, { x: 0, y, dir: "R" }));
  }

  // direita
  for (let y = 0; y < h; y++) {
    max = Math.max(max, simulate(grid, { x: w - 1, y, dir: "L" }));
  }

  return max;
}
