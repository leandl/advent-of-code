export type Point = { x: number; y: number };

export function createPoint(x: number, y: number): Point {
  return { x, y };
}

export function parsePoints(lines: string[]): Point[] {
  return lines.map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });
}

export function calcArea(pointA: Point, pointB: Point): number {
  const width = Math.abs(pointA.x - pointB.x) + 1;
  const height = Math.abs(pointA.y - pointB.y) + 1;

  return width * height;
}
