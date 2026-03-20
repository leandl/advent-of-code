import { Grid } from "../../utils/parsers";
import { simulate } from "./utils";

export function part1Run(grid: Grid<string>) {
  const result = simulate(grid, 3, false);

  if (result === null) {
    throw new Error("Unexpected: combat should always finish in Part 1");
  }

  return result;
}
