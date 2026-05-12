import { IntcodeComputer } from "../../utils/m-intcode-computer";

export function part2Run(program: number[]) {
  let diagnosticCode = 0;

  const computer = new IntcodeComputer(program, {
    input: () => 5, // system ID do thermal radiator controller
    output: (value) => {
      diagnosticCode = value;
    },
  });

  computer.run();

  return diagnosticCode;
}
