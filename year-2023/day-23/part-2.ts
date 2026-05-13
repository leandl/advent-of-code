import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid<string>): number {
  const R = grid.length;
  const C = grid[0].length;

  const DIRS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // remover slopes
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if ("^v<>".includes(grid[r][c])) grid[r][c] = ".";
    }
  }

  // start/end
  let start = 0;
  let end = 0;

  for (let c = 0; c < C; c++) {
    if (grid[0][c] === ".") start = c;
    if (grid[R - 1][c] === ".") end = (R - 1) * C + c;
  }

  const idx = (r: number, c: number) => r * C + c;

  function neighbors(r: number, c: number) {
    let count = 0;
    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] !== "#") {
        count++;
      }
    }
    return count;
  }

  // detectar nós
  const isNode = new Array(R * C).fill(false);

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === "#") continue;

      const deg = neighbors(r, c);

      if (
        deg !== 2 ||
        (r === 0 && grid[r][c] === ".") ||
        (r === R - 1 && grid[r][c] === ".")
      ) {
        isNode[idx(r, c)] = true;
      }
    }
  }

  // mapear id dos nós
  const nodeId = new Map<number, number>();
  let id = 0;

  for (let i = 0; i < R * C; i++) {
    if (isNode[i]) nodeId.set(i, id++);
  }

  const graph: [number, number][][] = Array.from({ length: id }, () => []);

  // construir grafo
  for (const [flat, u] of nodeId.entries()) {
    const r = Math.floor(flat / C);
    const c = flat % C;

    for (const [dr, dc] of DIRS) {
      let nr = r + dr;
      let nc = c + dc;

      if (nr < 0 || nr >= R || nc < 0 || nc >= C || grid[nr][nc] === "#")
        continue;

      let dist = 1;
      let pr = r,
        pc = c;

      while (true) {
        const curIdx = idx(nr, nc);

        if (isNode[curIdx]) {
          graph[u].push([nodeId.get(curIdx)!, dist]);
          break;
        }

        let nextFound = false;

        for (const [dr2, dc2] of DIRS) {
          const rr = nr + dr2;
          const cc = nc + dc2;

          if (
            rr >= 0 &&
            rr < R &&
            cc >= 0 &&
            cc < C &&
            grid[rr][cc] !== "#" &&
            (rr !== pr || cc !== pc)
          ) {
            pr = nr;
            pc = nc;
            nr = rr;
            nc = cc;
            dist++;
            nextFound = true;
            break;
          }
        }

        if (!nextFound) break;
      }
    }
  }

  const startId = nodeId.get(start)!;
  const endId = nodeId.get(end)!;

  let best = 0;
  const visited = new Array(id).fill(false);

  function dfs(u: number, dist: number) {
    if (u === endId) {
      if (dist > best) best = dist;
      return;
    }

    visited[u] = true;

    for (const [v, w] of graph[u]) {
      if (!visited[v]) {
        dfs(v, dist + w);
      }
    }

    visited[u] = false;
  }

  dfs(startId, 0);

  return best;
}
