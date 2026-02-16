import { Grid } from "../../utils/parsers";
import {
  DELTAS,
  Direction,
  findStart,
  inBounds,
  OPPOSITE,
  PIPE_CONNECTIONS,
  Position,
} from "./utils";

function getLoop(grid: Grid): Set<string> {
  const [sr, sc] = findStart(grid);

  const loop = new Set<string>();
  let prev: Position = [sr, sc];
  let curr: Position | null = null;

  // Encontrar primeiro vizinho válido conectado ao S
  for (const dir of Object.keys(DELTAS) as Direction[]) {
    const [dr, dc] = DELTAS[dir];
    const nr = sr + dr;
    const nc = sc + dc;

    if (!inBounds(grid, nr, nc)) continue;

    const tile = grid[nr][nc];
    const connections = PIPE_CONNECTIONS[tile];
    if (!connections) continue;

    if (connections.includes(OPPOSITE[dir])) {
      curr = [nr, nc];
      break;
    }
  }

  if (!curr) throw new Error("Loop not found");

  loop.add(`${sr},${sc}`);

  while (!(curr[0] === sr && curr[1] === sc)) {
    const r: number = curr[0];
    const c: number = curr[1];
    loop.add(`${r},${c}`);

    const tile: string = grid[r][c];
    const connections: Direction[] = PIPE_CONNECTIONS[tile];

    for (const dir of connections) {
      const [dr, dc] = DELTAS[dir];
      const nr = r + dr;
      const nc = c + dc;

      if (nr === prev[0] && nc === prev[1]) continue;

      prev = curr;
      curr = [nr, nc];
      break;
    }
  }

  return loop;
}

function resolveStartPipe(
  grid: Grid,
  loop: Set<string>,
  sr: number,
  sc: number,
): string {
  const connected: Direction[] = [];

  for (const dir of Object.keys(DELTAS) as Direction[]) {
    const [dr, dc] = DELTAS[dir];
    const nr = sr + dr;
    const nc = sc + dc;

    if (!inBounds(grid, nr, nc)) continue;
    if (!loop.has(`${nr},${nc}`)) continue;

    const tile = grid[nr][nc];
    const connections = PIPE_CONNECTIONS[tile];
    if (connections?.includes(OPPOSITE[dir])) {
      connected.push(dir);
    }
  }

  const key = connected.sort().join(",");

  const map: Record<string, string> = {
    "N,S": "|",
    "E,W": "-",
    "N,E": "L",
    "N,W": "J",
    "S,W": "7",
    "S,E": "F",
  };

  return map[key];
}

export function part2Run(grid: Grid): number {
  const loop = getLoop(grid);
  const [sr, sc] = findStart(grid);

  // Resolver tipo real do S
  const realStartPipe = resolveStartPipe(grid, loop, sr, sc);
  grid[sr][sc] = realStartPipe;

  let insideCount = 0;

  for (let r = 0; r < grid.length; r++) {
    let inside = false;

    for (let c = 0; c < grid[r].length; c++) {
      const key = `${r},${c}`;

      if (loop.has(key)) {
        const tile = grid[r][c];

        // Ray casting correto:
        // alterna apenas em cruzamentos verticais reais
        if (tile === "|" || tile === "L" || tile === "J") {
          inside = !inside;
        }
      } else {
        if (inside) {
          insideCount++;
        }
      }
    }
  }

  return insideCount;
}
