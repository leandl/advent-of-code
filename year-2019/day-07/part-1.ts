import { IntcodeComputer } from "../../utils/intcode-computer";
import { permutations } from "./utils";

export function part1Run(program: number[]) {
  const phaseSettings = permutations([0, 1, 2, 3, 4]);
  let maxSignal = -Infinity;

  for (const phases of phaseSettings) {
    let signal = 0;

    for (let i = 0; i < 5; i++) {
      const computer = new IntcodeComputer(program);
      const phase = phases[i];

      computer.provideInput(phase);

      while (true) {
        const res = computer.run();

        if (res.type === "need_input") {
          computer.provideInput(signal);
          continue;
        }

        if (res.type === "output") {
          signal = res.value;
        }

        if (res.type === "halt") {
          break;
        }
      }
    }

    maxSignal = Math.max(maxSignal, signal);
  }

  return maxSignal;
}
