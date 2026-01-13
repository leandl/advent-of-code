const regexTriangle = /(\d+)\s+(\d+)\s+(\d+)/;

export type Triangle = [number, number, number];

export function parseTriangles(lines: string[]): Triangle[] {
  const triangles = new Array<Triangle>();

  for (const line of lines) {
    const match = line.match(regexTriangle);
    if (!match) {
      continue;
    }

    const [, a, b, c] = match;

    triangles.push([Number(a), Number(b), Number(c)]);
  }

  return triangles;
}

export function isValidTriangle([a, b, c]: Triangle): boolean {
  const [x, y, z] = [a, b, c].sort((m, n) => m - n);
  return x + y > z;
}
