import { Grid } from "../../utils/parsers";
import { simulate } from "./utils";

export function part1Run(grid: Grid<string>) {
  return simulate(grid, { x: 0, y: 0, dir: "R" });
}
