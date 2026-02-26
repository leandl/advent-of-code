import { Instruction, runProgram } from "./utils";

export function part1Run(instructions: Instruction[]) {
  return runProgram(instructions, {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  }).a;
}
