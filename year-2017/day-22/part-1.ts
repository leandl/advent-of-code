import { Grid } from "../../utils/parsers";
import { DIRECTIONS } from "./utils";

export function part1Run(grid: Grid) {
  const infected = new Set<string>();

  const size = grid.length;
  const offset = Math.floor(size / 2);

  // carregar infecções iniciais
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        infected.add(`${x - offset},${y - offset}`);
      }
    }
  }

  let dir = 0; // começa virado para cima
  let x = 0;
  let y = 0;
  let infectionBursts = 0;

  for (let i = 0; i < 10000; i++) {
    const key = `${x},${y}`;

    if (infected.has(key)) {
      // infected → vira direita
      dir = (dir + 1) % 4;
      infected.delete(key); // limpa
    } else {
      // clean → vira esquerda
      dir = (dir + 3) % 4;
      infected.add(key); // infecta
      infectionBursts++;
    }

    // move
    x += DIRECTIONS[dir][0];
    y += DIRECTIONS[dir][1];
  }

  return infectionBursts;
}
