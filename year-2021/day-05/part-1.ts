import { countOverlaps, LineSegment, PointKey } from "./utils";

export function part1Run(lineSegments: LineSegment[]) {
  const grid = new Map<PointKey, number>();

  for (const [pointStart, pointEnd] of lineSegments) {
    // Vertical
    if (pointStart.x === pointEnd.x) {
      const from = Math.min(pointStart.y, pointEnd.y);
      const to = Math.max(pointStart.y, pointEnd.y);

      for (let y = from; y <= to; y++) {
        const key: PointKey = `${pointStart.x},${y}`;
        grid.set(key, (grid.get(key) ?? 0) + 1);
      }
    }

    // Horizontal
    else if (pointStart.y === pointEnd.y) {
      const from = Math.min(pointStart.x, pointEnd.x);
      const to = Math.max(pointStart.x, pointEnd.x);

      for (let x = from; x <= to; x++) {
        const key: PointKey = `${x},${pointStart.y}`;
        grid.set(key, (grid.get(key) ?? 0) + 1);
      }
    }
  }

  return countOverlaps(grid);
}
