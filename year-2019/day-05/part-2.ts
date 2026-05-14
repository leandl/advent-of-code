import { IntcodeComputer } from "../../utils/intcode-computer";

export function part2Run(program: number[]) {
  let diagnosticCode = 0;

  const computer = new IntcodeComputer(program);

  while (true) {
    const response = computer.run();

    if (response.type === "need_input") {
      computer.provideInput(5);
      continue;
    }

    if (response.type === "output") {
      diagnosticCode = response.value;
    }

    if (response.type === "halt") break;
  }

  return diagnosticCode;
}
