import { IntcodeComputer } from "../../utils/intcode-computer";
import { permutations } from "./utils";

export function part2Run(program: number[]) {
  const phaseSettings = permutations([5, 6, 7, 8, 9]);
  let maxSignal = -Infinity;

  for (const phases of phaseSettings) {
    // cria os 5 amplificadores
    const computers = phases.map(() => new IntcodeComputer(program));

    // fila de input para cada amp
    const queues: number[][] = phases.map((phase) => [phase]);

    // primeiro input do sistema
    queues[0].push(0);

    let lastOutput = 0;

    // loop até o último computador parar
    while (!computers[4].isHalted()) {
      for (let i = 0; i < 5; i++) {
        const computer = computers[i];
        const queue = queues[i];

        const output = computer.runUntilOutput(() => {
          if (queue.length === 0) {
            throw new Error(`Amp ${i} tentou ler sem input`);
          }
          return queue.shift()!;
        });

        // se produziu output
        if (output !== null) {
          const next = (i + 1) % 5;
          queues[next].push(output);

          if (i === 4) {
            lastOutput = output;
          }
        }
      }
    }

    maxSignal = Math.max(maxSignal, lastOutput);
  }

  return maxSignal;
}
