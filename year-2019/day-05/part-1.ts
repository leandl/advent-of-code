import { IntcodeComputer } from "../../utils/m-intcode-computer";

export function part1Run(program: number[]) {
  let diagnosticCode = 0;

  const computer = new IntcodeComputer(program, {
    input: () => 1, // input = 1 (air conditioner ID)
    output: (value) => {
      diagnosticCode = value;
    },
  });

  computer.run();

  return diagnosticCode;
}
