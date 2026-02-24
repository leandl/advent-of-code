import { getArea, Point, step } from "./utils";

export function part2Run(points: Point[]) {
  let previousArea = Infinity;
  let seconds = 0;

  while (true) {
    step(points);
    seconds++;

    const area = getArea(points);

    if (area > previousArea) {
      return seconds - 1;
    }

    previousArea = area;
  }
}
