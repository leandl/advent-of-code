import { Instruction, runProgram } from "./utils";

export function part2Run(instructions: Instruction[]) {
  return runProgram(instructions, {
    a: 0,
    b: 0,
    c: 1,
    d: 0,
  }).a;
}
