import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid) {
  const asteroids: Array<[number, number]> = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        asteroids.push([x, y]);
      }
    }
  }

  const gcd = (a: number, b: number): number =>
    b === 0 ? Math.abs(a) : gcd(b, a % b);

  // ---------- Encontrar melhor estação ----------
  let bestStation: [number, number] = [0, 0];
  let maxVisible = 0;

  for (const [x1, y1] of asteroids) {
    const directions = new Set<string>();

    for (const [x2, y2] of asteroids) {
      if (x1 === x2 && y1 === y2) continue;

      let dx = x2 - x1;
      let dy = y2 - y1;
      const divisor = gcd(dx, dy);
      dx /= divisor;
      dy /= divisor;

      directions.add(`${dx},${dy}`);
    }

    if (directions.size > maxVisible) {
      maxVisible = directions.size;
      bestStation = [x1, y1];
    }
  }

  const [sx, sy] = bestStation;

  // ---------- Agrupar por ângulo ----------
  const angleMap = new Map<
    number,
    Array<{ x: number; y: number; dist: number }>
  >();

  for (const [x, y] of asteroids) {
    if (x === sx && y === sy) continue;

    const dx = x - sx;
    const dy = y - sy;

    let angle = Math.atan2(dx, -dy);
    if (angle < 0) angle += Math.PI * 2;

    const dist = dx * dx + dy * dy;

    if (!angleMap.has(angle)) {
      angleMap.set(angle, []);
    }

    angleMap.get(angle)!.push({ x, y, dist });
  }

  // Ordenar cada lista por distância
  for (const list of angleMap.values()) {
    list.sort((a, b) => a.dist - b.dist);
  }

  // Ordenar ângulos
  const angles = Array.from(angleMap.keys()).sort((a, b) => a - b);

  // ---------- Simular vaporização ----------
  let vaporizedCount = 0;

  while (true) {
    for (const angle of angles) {
      const list = angleMap.get(angle)!;

      if (list.length === 0) continue;

      const asteroid = list.shift()!;
      vaporizedCount++;

      if (vaporizedCount === 200) {
        return asteroid.x * 100 + asteroid.y;
      }
    }
  }
}
