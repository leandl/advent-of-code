import { parseInput, restoreGravityAssist, runIntcode } from "./utils";

export function part1Run(input: string) {
  const program = parseInput(input);
  const restoredProgram = restoreGravityAssist(program, 12, 2);
  const result = runIntcode(restoredProgram);

  return result[0];
}
