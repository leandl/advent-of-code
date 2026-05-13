import { HailData } from "./utils";

export function part1Run({ px, py, vx, vy }: HailData) {
  const n = px.length;

  const MIN = 200000000000000;
  const MAX = 400000000000000;

  let count = 0;

  for (let i = 0; i < n; i++) {
    const px1 = px[i];
    const py1 = py[i];
    const vx1 = vx[i];
    const vy1 = vy[i];

    for (let j = i + 1; j < n; j++) {
      const px2 = px[j];
      const py2 = py[j];
      const vx2 = vx[j];
      const vy2 = vy[j];

      const det = vx1 * vy2 - vy1 * vx2;
      if (det === 0) continue;

      const dx = px2 - px1;
      const dy = py2 - py1;

      const t1 = (dx * vy2 - dy * vx2) / det;
      const t2 = (dx * vy1 - dy * vx1) / det;

      if (t1 < 0 || t2 < 0) continue;

      const x = px1 + vx1 * t1;
      const y = py1 + vy1 * t1;

      if (x < MIN || x > MAX || y < MIN || y > MAX) continue;

      count++;
    }
  }

  return count;
}
