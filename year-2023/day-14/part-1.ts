import { Grid } from "../../utils/parsers";
import { calculateLoad, tiltNorth } from "./utils";

export function part1Run(grid: Grid<string>) {
  const tilted = tiltNorth(grid);
  return calculateLoad(tilted);
}
