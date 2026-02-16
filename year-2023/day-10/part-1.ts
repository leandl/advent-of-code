import { Grid } from "../../utils/parsers";
import {
  Position,
  Direction,
  PIPE_CONNECTIONS,
  DELTAS,
  OPPOSITE,
  findStart,
  inBounds,
} from "./utils";

export function part1Run(grid: Grid) {
  const [sr, sc] = findStart(grid);

  let prev: Position = [sr, sc];
  let curr: Position | null = null;

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

  if (!curr) throw new Error("No valid loop from S");

  let steps = 1;

  // Percorre o loop até voltar para S
  while (!(curr[0] === sr && curr[1] === sc)) {
    const r: number = curr[0];
    const c: number = curr[1];
    const tile: string = grid[r][c];
    const connections: Direction[] = PIPE_CONNECTIONS[tile];

    if (!connections) throw new Error("Broken pipe");

    for (const dir of connections) {
      const [dr, dc] = DELTAS[dir];
      const nr = r + dr;
      const nc = c + dc;

      if (nr === prev[0] && nc === prev[1]) continue;

      prev = curr;
      curr = [nr, nc];
      steps++;
      break;
    }
  }

  return steps / 2;
}
