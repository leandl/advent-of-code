import { Target } from "./utlts";

function hitsTarget(vxInit: number, vyInit: number, target: Target): boolean {
  let x = 0;
  let y = 0;
  let vx = vxInit;
  let vy = vyInit;

  while (x <= target.xMax && y >= target.yMin) {
    x += vx;
    y += vy;

    if (
      x >= target.xMin &&
      x <= target.xMax &&
      y >= target.yMin &&
      y <= target.yMax
    ) {
      return true;
    }

    // drag
    if (vx > 0) vx--;
    else if (vx < 0) vx++;

    // gravity
    vy--;
  }

  return false;
}

export function part2Run(target: Target): number {
  let count = 0;

  const maxVy = Math.abs(target.yMin) - 1;

  for (let vx = 1; vx <= target.xMax; vx++) {
    for (let vy = target.yMin; vy <= maxVy; vy++) {
      if (hitsTarget(vx, vy, target)) {
        count++;
      }
    }
  }

  return count;
}
