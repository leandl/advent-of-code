import { isValidTriangle, parseTriangles, Triangle } from "./utils";

export function part2Run(lines: string[]) {
  const rows = parseTriangles(lines);
  let countValidTriangles = 0;

  for (let i = 0; i < rows.length; i += 3) {
    const row1 = rows[i];
    const row2 = rows[i + 1];
    const row3 = rows[i + 2];

    if (!row3) continue;

    const triangles: Triangle[] = [
      [row1[0], row2[0], row3[0]],
      [row1[1], row2[1], row3[1]],
      [row1[2], row2[2], row3[2]],
    ];

    for (const triangle of triangles) {
      if (isValidTriangle(triangle)) {
        countValidTriangles++;
      }
    }
  }

  return countValidTriangles;
}
