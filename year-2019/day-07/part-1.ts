import { IntcodeComputer } from "../../utils/intcode-computer";
import { permutations } from "./utils";

export function part1Run(program: number[]) {
  const phaseSettings = permutations([0, 1, 2, 3, 4]);
  let maxSignal = -Infinity;

  for (const phases of phaseSettings) {
    let signal = 0;

    for (let i = 0; i < 5; i++) {
      const computer = new IntcodeComputer(program);

      const inputs = [phases[i], signal];

      const output = computer.runUntilOutput(() => inputs.shift()!);

      signal = output!;
    }

    maxSignal = Math.max(maxSignal, signal);
  }

  return maxSignal;
}
