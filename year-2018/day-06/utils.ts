export type Point = {
  x: number;
  y: number;
};

export function parsePoints(lines: string[]): Point[] {
  return lines.map((line) => {
    const [x, y] = line.split(",").map((v) => Number(v.trim()));
    return { x, y };
  });
}

export function manhattan(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
