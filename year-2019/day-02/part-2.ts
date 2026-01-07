import { parseInput, restoreGravityAssist, runIntcode } from "./utils";

export function part2Run(input: string) {
  const program = parseInput(input);
  const target = 19690720;

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const restoredProgram = restoreGravityAssist(program, noun, verb);
      const result = runIntcode(restoredProgram);

      if (result[0] === target) {
        return 100 * noun + verb;
      }
    }
  }

  throw new Error("Nenhuma combinação encontrada");
}
