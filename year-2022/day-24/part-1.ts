import { Grid } from "../../utils/parsers";
import { Valley } from "./utils";

export function part1Run(grid: Grid<string>) {
  const v = new Valley(grid);
  return v.pathFinder(0);
}
