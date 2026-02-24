import { getArea, getBounds, Point, step } from "./utils";

export function render(points: Point[]): string {
  const { minX, maxX, minY, maxY } = getBounds(points);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const grid = Array.from({ length: height }, () => Array(width).fill("."));

  for (const p of points) {
    grid[p.y - minY][p.x - minX] = "#";
  }

  return "\n" + grid.map((row) => row.join("")).join("\n");
}

export function part1Run(points: Point[]) {
  let previousArea = Infinity;
  let seconds = 0;

  while (true) {
    step(points);
    seconds++;

    const area = getArea(points);
    if (area > previousArea) {
      for (const p of points) {
        p.x -= p.vx;
        p.y -= p.vy;
      }

      return render(points);
    }

    previousArea = area;
  }
}
