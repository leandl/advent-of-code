export type Point = Readonly<{
  x: number;
  y: number;
}>;

export type LineSegment = Readonly<[Point, Point]>;

function parsePoint(raw: string): Point {
  const [x, y] = raw.split(",").map(Number);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error(`Coordenada inválida: ${raw}`);
  }

  return { x, y };
}

export function parseLineSegments(lines: readonly string[]): LineSegment[] {
  return lines.map((line) => {
    const [start, end] = line.split(" -> ");

    if (!start || !end) {
      throw new Error(`Linha inválida: ${line}`);
    }

    return [parsePoint(start), parsePoint(end)];
  });
}

export type PointKey = `${number},${number}`;

export function countOverlaps(grid: Map<PointKey, number>, min = 2): number {
  let count = 0;

  for (const value of grid.values()) {
    if (value >= min) count++;
  }

  return count;
}
