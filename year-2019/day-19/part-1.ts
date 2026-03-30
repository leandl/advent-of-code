import { IntcodeComputer } from "../../utils/intcode-computer";

export function part1Run(program: number[]) {
  let affected = 0;

  for (let y = 0; y < 50; y++) {
    for (let x = 0; x < 50; x++) {
      const computer = new IntcodeComputer([...program]);

      const inputs = [x, y];
      let inputIndex = 0;
      let outputValue = 0;

      computer.run({
        input: () => inputs[inputIndex++],
        output: (value: number) => {
          outputValue = value;
        },
      });

      if (outputValue === 1) {
        affected++;
      }
    }
  }

  return affected;
}
