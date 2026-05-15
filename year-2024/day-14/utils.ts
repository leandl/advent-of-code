export type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function parseRobots(lines: string[]): Robot[] {
  return lines.map((line) => {
    const [px, py, vx, vy] = line.match(/-?\d+/g)!.map(Number);
    return { x: px, y: py, vx, vy };
  });
}

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function getPosition(r: Robot, t: number, W: number, H: number) {
  const x = mod(r.x + r.vx * t, W);
  const y = mod(r.y + r.vy * t, H);
  return { x, y };
}

type Point = {
  x: number;
  y: number;
};

export function getPositions(
  robots: Robot[],
  t: number,
  W: number,
  H: number,
): Point[] {
  return robots.map((r) => ({
    x: mod(r.x + r.vx * t, W),
    y: mod(r.y + r.vy * t, H),
  }));
}

export function getVariance(points: Point[]): number {
  const n = points.length;

  let sumX = 0;
  let sumY = 0;

  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  let variance = 0;

  for (const p of points) {
    const dx = p.x - meanX;
    const dy = p.y - meanY;
    variance += dx * dx + dy * dy;
  }

  return variance;
}
