import { manhattan, Point } from "./utils";

export function part1Run(points: Point[]) {
  const areas = new Map<number, number>();
  const infinite = new Set<number>();

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // Inicializa áreas
  points.forEach((_, i) => areas.set(i, 0));

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      let minDist = Infinity;
      let closest = -1;
      let tie = false;

      for (let i = 0; i < points.length; i++) {
        const d = manhattan({ x, y }, points[i]);

        if (d < minDist) {
          minDist = d;
          closest = i;
          tie = false;
        } else if (d === minDist) {
          tie = true;
        }
      }

      if (!tie) {
        areas.set(closest, (areas.get(closest) || 0) + 1);

        // Se tocar a borda → infinito
        if (x === minX || x === maxX || y === minY || y === maxY) {
          infinite.add(closest);
        }
      }
    }
  }

  let maxArea = 0;

  for (const [i, area] of areas.entries()) {
    if (!infinite.has(i)) {
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}
