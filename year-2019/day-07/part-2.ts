import { IntcodeComputer } from "../../utils/intcode-computer";
import { permutations } from "./utils";

export function part2Run(program: number[]) {
  const phaseSettings = permutations([5, 6, 7, 8, 9]);
  let maxSignal = -Infinity;

  for (const phases of phaseSettings) {
    const computers = phases.map(() => new IntcodeComputer(program));

    // setup phases
    for (let i = 0; i < 5; i++) {
      computers[i].provideInput(phases[i]);
    }

    computers[0].provideInput(0);
    let halted = new Array(5).fill(false);
    let lastOutput = 0;

    while (!halted.every(Boolean)) {
      for (let i = 0; i < 5; i++) {
        if (halted[i]) continue;

        const comp = computers[i];

        const res = comp.run();

        if (res.type === "need_input") {
          continue;
        }

        if (res.type === "output") {
          const next = (i + 1) % 5;
          computers[next].provideInput(res.value);

          if (i === 4) {
            lastOutput = res.value;
          }
        }

        if (res.type === "halt") {
          halted[i] = true;
        }
      }
    }

    maxSignal = Math.max(maxSignal, lastOutput);
  }

  return maxSignal;
}
