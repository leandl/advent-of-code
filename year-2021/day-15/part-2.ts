import { MinHeap } from "../../utils/min-heap";
import { Grid } from "../../utils/parsers";
import { directions, Node } from "./utils";

export function part2Run(grid: Grid<number>) {
  const R = grid.length;
  const C = grid[0].length;

  const rows = R * 5;
  const cols = C * 5;

  const getValue = (i: number, j: number): number => {
    const base = grid[i % R][j % C];
    const inc = Math.floor(i / R) + Math.floor(j / C);
    return ((base + inc - 1) % 9) + 1;
  };

  const dist: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity),
  );

  const heap = new MinHeap<Node>((a, b) => a.cost - b.cost);
  heap.push({ x: 0, y: 0, cost: 0 });
  dist[0][0] = 0;

  while (!heap.isEmpty()) {
    const { x, y, cost } = heap.pop()!;

    if (x === rows - 1 && y === cols - 1) {
      return cost;
    }

    if (cost > dist[x][y]) continue;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;

      const newCost = cost + getValue(nx, ny);

      if (newCost < dist[nx][ny]) {
        dist[nx][ny] = newCost;
        heap.push({ x: nx, y: ny, cost: newCost });
      }
    }
  }

  return -1;
}
