import { isValidTriangle, parseTriangles } from "./utils";

export function part1Run(lines: string[]) {
  const triangles = parseTriangles(lines);
  let countValidTriangles = 0;

  for (const triangle of triangles) {
    if (isValidTriangle(triangle)) {
      countValidTriangles++;
    }
  }

  return countValidTriangles;
}
