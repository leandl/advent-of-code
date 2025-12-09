import { calcArea, parsePoints } from "./utils";

export function part1Run(lines: string[]): number {
  const points = parsePoints(lines);
  const N = points.length;

  let max = 0;
  for (let i = 0; i < N; i++) {
    const pointA = points[i];
    for (let j = i + 1; j < N; j++) {
      const pointB = points[j];

      const area = calcArea(pointA, pointB);

      if (area > max) max = area;
    }
  }

  return max;
}
