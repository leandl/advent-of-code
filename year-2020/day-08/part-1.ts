import { Instruction } from "./utils";

export function part1Run(instructions: Instruction[]) {
  let acc = 0;
  let ip = 0; // instruction pointer
  const executed = new Set<number>();

  while (!executed.has(ip)) {
    executed.add(ip);

    const instruction = instructions[ip];

    switch (instruction.op) {
      case "acc":
        acc += instruction.arg;
        ip++;
        break;

      case "jmp":
        ip += instruction.arg;
        break;

      case "nop":
        ip++;
        break;
    }
  }

  return acc;
}
