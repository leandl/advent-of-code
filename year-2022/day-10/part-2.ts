import { Instruction } from "./utils";

export function part2Run(program: Instruction[]) {
  let X = 1;
  let cycle = 0;

  const screen: string[] = Array(6)
    .fill(null)
    .map(() => "");

  function tick() {
    cycle++;

    const column = (cycle - 1) % 40;
    const row = Math.floor((cycle - 1) / 40);

    if (row < 6) {
      const pixel = Math.abs(column - X) <= 1 ? "#" : ".";
      screen[row] += pixel;
    }
  }

  for (const instruction of program) {
    if (instruction.type === "noop") {
      tick();
    } else if (instruction.type === "addx") {
      tick();
      tick();
      X += instruction.value;
    }
  }

  return "\n" + screen.join("\n");
}
