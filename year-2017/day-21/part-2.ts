import { Grid } from "../../utils/parsers";
import { enhance } from "./utils";

export function part2Run(grid: Grid, rules: Map<string, Grid>) {
  let current = grid;
  const cache = new Map<string, Grid>();

  for (let i = 0; i < 18; i++) {
    current = enhance(current, rules, cache);
  }

  return current.flat().filter((c) => c === "#").length;
}
