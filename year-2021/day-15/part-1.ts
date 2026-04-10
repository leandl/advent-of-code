import { Grid } from "../../utils/parsers";
import { directions, Node } from "./utils";

export function part1Run(grid: Grid<number>) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Distâncias mínimas
  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity),
  );

  dist[0][0] = 0;

  // "Priority queue" simples (pode otimizar com heap)
  const queue: Node[] = [{ x: 0, y: 0, cost: 0 }];

  while (queue.length > 0) {
    // pega o menor custo
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;

    const { x, y, cost } = current;

    // chegou no fim
    if (x === rows - 1 && y === cols - 1) {
      return cost;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;

      const newCost = cost + grid[nx][ny];

      if (newCost < dist[nx][ny]) {
        dist[nx][ny] = newCost;
        queue.push({ x: nx, y: ny, cost: newCost });
      }
    }
  }

  return -1; // nunca deveria acontecer
}
