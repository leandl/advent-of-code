import { Grid } from "../../utils/parsers";
import { DC, Dir, DR, State } from "./utils";

export function part1Run(grid: Grid<string>) {
  let start: State = { r: 0, c: 0, dir: 0 };
  let end = { r: 0, c: 0 };

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "S") {
        start = { r, c, dir: 0 }; // começa virado pra Leste
      }
      if (grid[r][c] === "E") {
        end = { r, c };
      }
    }
  }

  const rows = grid.length;
  const cols = grid[0].length;

  const INF = Number.MAX_SAFE_INTEGER;

  // dist[r][c][dir]
  const dist = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Array(4).fill(INF)),
  );

  // min-heap simples
  const pq: [number, State][] = [];
  const push = (cost: number, s: State) => {
    pq.push([cost, s]);
    pq.sort((a, b) => a[0] - b[0]); // simples (ok pra AoC)
  };

  push(0, start);
  dist[start.r][start.c][start.dir] = 0;

  while (pq.length > 0) {
    const [cost, cur] = pq.shift()!;

    if (cost > dist[cur.r][cur.c][cur.dir]) continue;

    // chegou no destino (qualquer direção)
    if (cur.r === end.r && cur.c === end.c) {
      return cost;
    }

    // 1. andar pra frente
    const nr = cur.r + DR[cur.dir];
    const nc = cur.c + DC[cur.dir];

    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== "#") {
      const ncost = cost + 1;
      if (ncost < dist[nr][nc][cur.dir]) {
        dist[nr][nc][cur.dir] = ncost;
        push(ncost, { r: nr, c: nc, dir: cur.dir });
      }
    }

    // 2. girar esquerda
    const leftDir = ((cur.dir + 3) % 4) as Dir;
    const leftCost = cost + 1000;
    if (leftCost < dist[cur.r][cur.c][leftDir]) {
      dist[cur.r][cur.c][leftDir] = leftCost;
      push(leftCost, { ...cur, dir: leftDir });
    }

    // 3. girar direita
    const rightDir = ((cur.dir + 1) % 4) as Dir;
    const rightCost = cost + 1000;
    if (rightCost < dist[cur.r][cur.c][rightDir]) {
      dist[cur.r][cur.c][rightDir] = rightCost;
      push(rightCost, { ...cur, dir: rightDir });
    }
  }

  return -1; // nunca deveria acontecer
}
