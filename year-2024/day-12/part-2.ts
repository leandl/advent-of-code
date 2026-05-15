import { Grid } from "../../utils/parsers";

export function part2Run(grid: Grid<string>): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false),
  );

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(sr: number, sc: number): number {
    const plant = grid[sr][sc];
    const queue: [number, number][] = [[sr, sc]];
    visited[sr][sc] = true;

    let qi = 0;
    let area = 0;

    const hEdges = new Set<string>();
    const vEdges = new Set<string>();

    while (qi < queue.length) {
      const [r, c] = queue[qi++];
      area++;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;

        const isBorder =
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols ||
          grid[nr][nc] !== plant;

        if (isBorder) {
          // Registrar edge com DIREÇÃO
          if (dr === -1) hEdges.add(`T:${r}:${c}`); // topo
          if (dr === 1) hEdges.add(`B:${r + 1}:${c}`); // baixo
          if (dc === -1) vEdges.add(`L:${r}:${c}`); // esquerda
          if (dc === 1) vEdges.add(`R:${r}:${c + 1}`); // direita
        } else if (!visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    function countSegments(edges: Set<string>, horizontal: boolean): number {
      // type -> (line -> positions)
      const map = new Map<string, Map<number, number[]>>();

      for (const e of edges) {
        const [type, r, c] = e.split(":");
        const row = Number(r);
        const col = Number(c);

        if (!map.has(type)) map.set(type, new Map());
        const inner = map.get(type)!;

        const key = horizontal ? row : col;
        const val = horizontal ? col : row;

        if (!inner.has(key)) inner.set(key, []);
        inner.get(key)!.push(val);
      }

      let sides = 0;

      for (const inner of map.values()) {
        for (const arr of inner.values()) {
          arr.sort((a, b) => a - b);

          sides++; // primeiro segmento

          for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== arr[i - 1] + 1) {
              sides++; // novo segmento
            }
          }
        }
      }

      return sides;
    }

    const sides = countSegments(hEdges, true) + countSegments(vEdges, false);

    return area * sides;
  }

  let total = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        total += bfs(r, c);
      }
    }
  }

  return total;
}
