import { Grid } from "../../utils/parsers";
import { Valley } from "./utils";

export function part2Run(grid: Grid<string>) {
  const v = new Valley(grid);

  const first = v.pathFinder(0);

  [v.start, v.end] = [v.end, v.start];
  const back = v.pathFinder(first);

  [v.start, v.end] = [v.end, v.start];
  return v.pathFinder(back);
}
