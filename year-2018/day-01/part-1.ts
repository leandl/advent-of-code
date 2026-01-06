import { Operator, parseFrequencies } from "./utils";

export function part1Run(lines: string[]) {
  const frequencies = parseFrequencies(lines);

  let currentFrequency = 0;

  for (const frequency of frequencies) {
    const [frequencyOperator, frequencyNumber] = frequency;

    if (frequencyOperator === Operator.PLUS) {
      currentFrequency += frequencyNumber;
    } else {
      currentFrequency -= frequencyNumber;
    }
  }

  return currentFrequency;
}
