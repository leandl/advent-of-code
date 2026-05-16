import { Grid } from "../../utils/parsers";

export type Pos = { r: number; c: number };

export type WarehouseState = {
  grid: Grid<string>;
  moves: string;
  robot: Pos;
};

export const DIRS: Record<string, Pos> = {
  "^": { r: -1, c: 0 },
  v: { r: 1, c: 0 },
  "<": { r: 0, c: -1 },
  ">": { r: 0, c: 1 },
};

export function parseWarehouseState(input: string): WarehouseState {
  const [mapRaw, movesRaw] = input.split("\n\n");

  const grid = mapRaw.split("\n").map((line) => line.split(""));
  const moves = movesRaw.replace(/\n/g, "");

  let robot: Pos = { r: 0, c: 0 };

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "@") {
        robot = { r, c };
      }
    }
  }

  return { grid, moves, robot };
}
