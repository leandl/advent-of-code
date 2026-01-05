import { Direction, parseInputPuzzle } from "./utils";

export function part1Run(inputContent: string) {
  const instructions = parseInputPuzzle(inputContent);

  let x = 0;
  let y = 0;
  let direction: Direction = 0;

  for (const { turn, steps } of instructions) {
    if (turn === "R") {
      direction = ((direction + 1) % 4) as Direction;
    } else {
      direction = ((direction + 3) % 4) as Direction;
    }

    // Move
    switch (direction) {
      case 0: // Norte
        y += steps;
        break;
      case 1: // Leste
        x += steps;
        break;
      case 2: // Sul
        y -= steps;
        break;
      case 3: // Oeste
        x -= steps;
        break;
    }
  }

  // Distância de Manhattan
  return Math.abs(x) + Math.abs(y);
}
