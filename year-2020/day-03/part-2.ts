import { countTrees } from "./utils";

function multiplyTreesForSlopes(map: string[]): number {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];

  return slopes
    .map((slope) => countTrees(map, slope.right, slope.down))
    .reduce((product, trees) => product * trees, 1);
}

export function part2Run(lines: string[]) {
  return multiplyTreesForSlopes(lines);
}
