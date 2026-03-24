export type Point = [number, number, number, number];

export function parsePoints(lines: string[]): Point[] {
  return lines.map((line) => line.split(",").map(Number) as Point);
}

export function manhattan(a: Point, b: Point): number {
  return (
    Math.abs(a[0] - b[0]) +
    Math.abs(a[1] - b[1]) +
    Math.abs(a[2] - b[2]) +
    Math.abs(a[3] - b[3])
  );
}
