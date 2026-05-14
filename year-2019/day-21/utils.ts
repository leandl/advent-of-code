import { IntcodeComputer } from "../../utils/intcode-computer";

export function runSpringdroid(program: number[], script: string[]): number {
  const computer = new IntcodeComputer([...program]);

  const inputQueue: number[] = [];

  // script → ASCII
  for (const line of script) {
    for (const ch of line) {
      inputQueue.push(ch.charCodeAt(0));
    }
    inputQueue.push(10); // newline
  }

  let inputIndex = 0;
  let lastOutput = 0;

  while (true) {
    const res = computer.run();

    if (res.type === "output") {
      lastOutput = res.value;

      // debug opcional ASCII
      if (res.value < 128) process.stdout.write(String.fromCharCode(res.value));
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

  return lastOutput;
}
