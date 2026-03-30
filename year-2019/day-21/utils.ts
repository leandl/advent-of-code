import { IntcodeComputer } from "../../utils/intcode-computer";

export function runSpringdroid(program: number[], script: string[]): number {
  const computer = new IntcodeComputer([...program]);

  const inputQueue: number[] = [];

  // converter script → ASCII
  for (const line of script) {
    for (const ch of line) {
      inputQueue.push(ch.charCodeAt(0));
    }
    inputQueue.push(10); // newline
  }

  let inputIndex = 0;
  let lastOutput = 0;

  computer.run({
    input: () => inputQueue[inputIndex++],
    output: (value: number) => {
      lastOutput = value;

      // debug opcional (ASCII)
      if (value < 128) {
        // console.log(String.fromCharCode(value));
      }
    },
  });

  return lastOutput;
}
