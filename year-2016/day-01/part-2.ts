import { Direction, parseInputPuzzle } from "./utils";

export function part2Run(inputContent: string) {
  const instructions = parseInputPuzzle(inputContent);

  let x = 0;
  let y = 0;
  let direction: Direction = 0;

  const visited = new Set<string>();
  visited.add("0,0");

  for (const { turn, steps } of instructions) {
    if (turn === "R") {
      direction = ((direction + 1) % 4) as Direction;
    } else {
      direction = ((direction + 3) % 4) as Direction;
    }

    // Anda bloco por bloco
    for (let i = 0; i < steps; i++) {
      switch (direction) {
        case 0:
          y++;
          break; // Norte
        case 1:
          x++;
          break; // Leste
        case 2:
          y--;
          break; // Sul
        case 3:
          x--;
          break; // Oeste
      }

      const key = `${x},${y}`;
      if (visited.has(key)) {
        return Math.abs(x) + Math.abs(y);
      }

      visited.add(key);
    }
  }

  throw new Error("Nenhuma posição visitada duas vezes.");
}
