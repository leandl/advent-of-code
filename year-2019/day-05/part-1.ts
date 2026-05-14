import { IntcodeComputer } from "../../utils/intcode-computer";

export function part1Run(program: number[]) {
  let diagnosticCode = 0;

  const computer = new IntcodeComputer(program);

  while (true) {
    const response = computer.run();

    if (response.type === "need_input") {
      computer.provideInput(1);
      continue;
    }

    if (response.type === "output") {
      diagnosticCode = response.value;
    }

    if (response.type === "halt") break;
  }

  return diagnosticCode;
}
