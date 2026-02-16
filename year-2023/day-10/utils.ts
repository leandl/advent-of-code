import { Grid } from "../../utils/parsers";

export type Position = [number, number];
export type Direction = "N" | "S" | "E" | "W";

export const PIPE_CONNECTIONS: Record<string, Direction[]> = {
  "|": ["N", "S"],
  "-": ["E", "W"],
  L: ["N", "E"],
  J: ["N", "W"],
  "7": ["S", "W"],
  F: ["S", "E"],
};

export const DELTAS: Record<Direction, Position> = {
  N: [-1, 0],
  S: [1, 0],
  E: [0, 1],
  W: [0, -1],
};

export const OPPOSITE: Record<Direction, Direction> = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
};

export function findStart(grid: Grid): Position {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "S") {
        return [r, c];
      }
    }
  }

  throw new Error("Start not found");
}

export function inBounds(grid: Grid, r: number, c: number): boolean {
  return r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;
}
