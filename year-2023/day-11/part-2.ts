import { Grid } from "../../utils/parsers";
import { cosmicExpansion } from "./utils";

export function part2Run(grid: Grid) {
  return cosmicExpansion(grid, 1_000_000);
}
