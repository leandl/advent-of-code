import { Dir, getInitialBlackTiles } from "./utils";

export function part1Run(lines: Array<Dir[]>) {
  return getInitialBlackTiles(lines).size;
}
