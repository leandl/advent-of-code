import { countOverlaps, LineSegment, PointKey } from "./utils";

export function part2Run(lineSegments: LineSegment[]) {
  const grid = new Map<PointKey, number>();

  for (const [pointStart, pointEnd] of lineSegments) {
    const dx = Math.sign(pointEnd.x - pointStart.x);
    const dy = Math.sign(pointEnd.y - pointStart.y);

    // Horizontal, vertical ou diagonal 45°
    if (
      pointStart.x === pointEnd.x ||
      pointStart.y === pointEnd.y ||
      Math.abs(pointStart.x - pointEnd.x) ===
        Math.abs(pointStart.y - pointEnd.y)
    ) {
      let x = pointStart.x;
      let y = pointStart.y;

      while (true) {
        const key: PointKey = `${x},${y}`;
        grid.set(key, (grid.get(key) ?? 0) + 1);

        if (x === pointEnd.x && y === pointEnd.y) break;

        x += dx;
        y += dy;
      }
    }
  }

  return countOverlaps(grid);
}
