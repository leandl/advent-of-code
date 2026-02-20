import { Grid } from "../../utils/parsers";

export function part1Run(grid: Grid) {
  const asteroids: Array<[number, number]> = [];

  // Coleta coordenadas dos asteroides
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        asteroids.push([x, y]);
      }
    }
  }

  const gcd = (a: number, b: number): number => {
    if (b === 0) return Math.abs(a);
    return gcd(b, a % b);
  };

  let maxVisible = 0;

  for (let i = 0; i < asteroids.length; i++) {
    const [x1, y1] = asteroids[i];
    const directions = new Set<string>();

    for (let j = 0; j < asteroids.length; j++) {
      if (i === j) continue;

      const [x2, y2] = asteroids[j];
      let dx = x2 - x1;
      let dy = y2 - y1;

      const divisor = gcd(dx, dy);
      dx /= divisor;
      dy /= divisor;

      directions.add(`${dx},${dy}`);
    }

    maxVisible = Math.max(maxVisible, directions.size);
  }

  return maxVisible;
}
