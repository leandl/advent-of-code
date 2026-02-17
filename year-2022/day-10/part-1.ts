import { Instruction } from "./utils";

export function part1Run(program: Instruction[]) {
  let X = 1;
  let cycle = 0;
  let sum = 0;

  const interestingCycles = new Set([20, 60, 100, 140, 180, 220]);

  function tick() {
    cycle++;

    if (interestingCycles.has(cycle)) {
      sum += cycle * X;
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

  return sum;
}
