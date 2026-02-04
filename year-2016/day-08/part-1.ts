import { applyInstruction, createScreen, HEIGHT, WIDTH } from "./utils";

export function part1Run(lines: string[]): number {
  const screen = createScreen();

  for (const line of lines) {
    applyInstruction(screen, line);
  }

  let count = 0;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (screen[y][x]) count++;
    }
  }

  return count;
}
