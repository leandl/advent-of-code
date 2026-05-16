import { Grid } from "../../utils/parsers";
import { DC, Dir, DR, State } from "./utils";

export function part2Run(grid: Grid<string>) {
  let start!: State;
  let end!: { r: number; c: number };

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "S") start = { r, c, dir: 0 };
      if (grid[r][c] === "E") end = { r, c };
    }
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const INF = 1e15;

  const dist = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Array(4).fill(INF)),
  );

  const pq: [number, State][] = [];
  const push = (cost: number, s: State) => {
    pq.push([cost, s]);
    pq.sort((a, b) => a[0] - b[0]);
  };

  push(0, start);
  dist[start.r][start.c][start.dir] = 0;

  // DIJKSTRA
  while (pq.length) {
    const [cost, cur] = pq.shift()!;
    if (cost > dist[cur.r][cur.c][cur.dir]) continue;

    // forward
    const nr = cur.r + DR[cur.dir];
    const nc = cur.c + DC[cur.dir];

    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== "#") {
      const ncost = cost + 1;
      if (ncost < dist[nr][nc][cur.dir]) {
        dist[nr][nc][cur.dir] = ncost;
        push(ncost, { r: nr, c: nc, dir: cur.dir });
      }
    }

    // rotate left
    const ld = ((cur.dir + 3) % 4) as Dir;
    if (cost + 1000 < dist[cur.r][cur.c][ld]) {
      dist[cur.r][cur.c][ld] = cost + 1000;
      push(cost + 1000, { ...cur, dir: ld });
    }

    // rotate right
    const rd = ((cur.dir + 1) % 4) as Dir;
    if (cost + 1000 < dist[cur.r][cur.c][rd]) {
      dist[cur.r][cur.c][rd] = cost + 1000;
      push(cost + 1000, { ...cur, dir: rd });
    }
  }

  // menor custo no E
  const best = Math.min(...dist[end.r][end.c]);

  // reverse BFS
  const visited = new Set<string>();
  const queue: State[] = [];

  // começa de TODOS os dirs ótimos no fim
  for (let d = 0 as Dir; d < 4; d++) {
    if (dist[end.r][end.c][d] === best) {
      queue.push({ r: end.r, c: end.c, dir: d });
      visited.add(`${end.r},${end.c},${d}`);
    }
  }

  const goodTiles = new Set<string>();

  while (queue.length) {
    const cur = queue.shift()!;
    goodTiles.add(`${cur.r},${cur.c}`);

    const curCost = dist[cur.r][cur.c][cur.dir];

    // reverse: forward (andar)
    const pr = cur.r - DR[cur.dir];
    const pc = cur.c - DC[cur.dir];

    if (pr >= 0 && pr < rows && pc >= 0 && pc < cols && grid[pr][pc] !== "#") {
      if (dist[pr][pc][cur.dir] + 1 === curCost) {
        const key = `${pr},${pc},${cur.dir}`;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ r: pr, c: pc, dir: cur.dir });
        }
      }
    }

    // reverse: rotation
    const left = ((cur.dir + 1) % 4) as Dir; // invertido!
    if (dist[cur.r][cur.c][left] + 1000 === curCost) {
      const key = `${cur.r},${cur.c},${left}`;
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ ...cur, dir: left });
      }
    }

    const right = ((cur.dir + 3) % 4) as Dir;
    if (dist[cur.r][cur.c][right] + 1000 === curCost) {
      const key = `${cur.r},${cur.c},${right}`;
      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ ...cur, dir: right });
      }
    }
  }

  return goodTiles.size;
}
