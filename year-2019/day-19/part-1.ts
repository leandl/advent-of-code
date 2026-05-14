import { IntcodeComputer } from "../../utils/intcode-computer";

export function part1Run(program: number[]) {
  let affected = 0;

  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      const computer = new IntcodeComputer([...program]);

      const inputQueue = [x, y];
      let inputIndex = 0;
      let outputValue = 0;

      while (true) {
        const res = computer.run();

        if (res.type === "output") {
          outputValue = res.value;
        }

        if (res.type === "need_input") {
          const value = inputQueue[inputIndex++];
          if (value === undefined) {
            throw new Error("Input esgotado");
          }
          computer.io.provideInput(value);
        }

        if (res.type === "halt") {
          break;
        }
      }

      if (outputValue === 1) {
        affected++;
      }
    }
  }

  return affected;
}
