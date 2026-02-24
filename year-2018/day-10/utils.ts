export type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function parsePoints(lines: string[]): Point[] {
  return lines.map((line) => {
    const numbers = line.match(/-?\d+/g);
    if (!numbers) throw new Error("Entrada inválida");

    return {
      x: Number(numbers[0]),
      y: Number(numbers[1]),
      vx: Number(numbers[2]),
      vy: Number(numbers[3]),
    };
  });
}

export function step(points: Point[]) {
  for (const p of points) {
    p.x += p.vx;
    p.y += p.vy;
  }
}

export function getBounds(points: Point[]) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  return { minX, maxX, minY, maxY };
}

export function getArea(points: Point[]) {
  const { minX, maxX, minY, maxY } = getBounds(points);
  return (maxX - minX) * (maxY - minY);
}
