import { Operator, parseFrequencies } from "./utils";

export function part2Run(lines: string[]) {
  const frequencies = parseFrequencies(lines);

  let currentFrequency = 0;
  let frequencyVisited = new Set<number>([0]);

  while (true) {
    for (const frequency of frequencies) {
      const [frequencyOperator, frequencyNumber] = frequency;

      if (frequencyOperator === Operator.PLUS) {
        currentFrequency += frequencyNumber;
      } else {
        currentFrequency -= frequencyNumber;
      }

      if (frequencyVisited.has(currentFrequency)) {
        return currentFrequency;
      }

      frequencyVisited.add(currentFrequency);
    }
  }
}
