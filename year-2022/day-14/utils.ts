export type Point = { x: number; y: number };

export function key(x: number, y: number): string {
  return `${x},${y}`;
}

export function parseRocks(lines: string[]): Set<string> {
  const occupied = new Set<string>();

  for (const line of lines) {
    const points = line.split(" -> ").map((p) => {
      const [x, y] = p.split(",").map(Number);
      return { x, y };
    });

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];

      if (a.x === b.x) {
        // vertical
        const [minY, maxY] = [a.y, b.y].sort((a, b) => a - b);
        for (let y = minY; y <= maxY; y++) {
          occupied.add(key(a.x, y));
        }
      } else {
        // horizontal
        const [minX, maxX] = [a.x, b.x].sort((a, b) => a - b);
        for (let x = minX; x <= maxX; x++) {
          occupied.add(key(x, a.y));
        }
      }
    }
  }

  return occupied;
}
