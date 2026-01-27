import { manhattan, Point } from "./utils";

function safeRegionSize(points: Point[], limit: number): number {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // Margem segura: quanto maior o limite, maior precisa ser
  const margin = Math.floor(limit / points.length);

  let count = 0;

  for (let x = minX - margin; x <= maxX + margin; x++) {
    for (let y = minY - margin; y <= maxY + margin; y++) {
      let sum = 0;

      for (const p of points) {
        sum += manhattan({ x, y }, p);
        if (sum >= limit) break; // pequeno early-exit
      }

      if (sum < limit) {
        count++;
      }
    }
  }

  return count;
}

export function part2Run(points: Point[]) {
  return safeRegionSize(points, 10000);
}
