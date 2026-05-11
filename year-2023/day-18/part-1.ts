import { parsePlainInstructions, solveFromInstructions } from "./utils";

export function part1Run(lines: string[]) {
  const instructions = parsePlainInstructions(lines);
  return solveFromInstructions(instructions);
}
