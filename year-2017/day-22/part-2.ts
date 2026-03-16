import { Grid } from "../../utils/parsers";
import { DIRECTIONS } from "./utils";

enum NodeState {
  Weakened = 1,
  Infected = 2,
  Flagged = 3,
}

export function part2Run(grid: Grid) {
  const nodes = new Map<string, NodeState>();

  const size = grid.length;
  const offset = Math.floor(size / 2);

  // carregar infecções iniciais
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === "#") {
        nodes.set(`${x - offset},${y - offset}`, NodeState.Infected);
      }
    }
  }

  let x = 0;
  let y = 0;
  let dir = 0;
  let infections = 0;

  for (let i = 0; i < 10000000; i++) {
    const key = `${x},${y}`;
    const state = nodes.get(key) ?? 0;

    // decidir direção
    if (state === 0)
      dir = (dir + 3) % 4; // clean → left
    else if (state === 2)
      dir = (dir + 1) % 4; // infected → right
    else if (state === 3) dir = (dir + 2) % 4; // flagged → reverse

    // atualizar estado
    if (state === 0) {
      nodes.set(key, NodeState.Weakened);
    } else if (state === 1) {
      nodes.set(key, NodeState.Infected);
      infections++;
    } else if (state === 2) {
      nodes.set(key, NodeState.Flagged);
    } else {
      nodes.delete(key); // flagged -> clean
    }

    // mover
    x += DIRECTIONS[dir][0];
    y += DIRECTIONS[dir][1];
  }

  return infections;
}
