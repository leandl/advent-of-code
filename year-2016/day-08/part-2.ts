import { applyInstruction, createScreen, HEIGHT, WIDTH } from "./utils";

export function part2Run(lines: string[]) {
  const screen = createScreen();

  for (const line of lines) {
    applyInstruction(screen, line);
  }

  let screenString = "";
  for (let y = 0; y < HEIGHT; y++) {
    let row = "";
    for (let x = 0; x < WIDTH; x++) {
      row += screen[y][x] ? "#" : " ";
    }
    screenString += row + "\n";
  }

  return "\n" + screenString;
}
