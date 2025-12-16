import { parseLocationLists } from "./utils";

export function part1Run(lines: string[]): number {
  const [leftList, rightList] = parseLocationLists(lines);

  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  return totalDistance;
}
