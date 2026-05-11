import { parseHexEncodedInstructions, solveFromInstructions } from "./utils";

export function part2Run(lines: string[]) {
  const instructions = parseHexEncodedInstructions(lines);
  return solveFromInstructions(instructions);
}
