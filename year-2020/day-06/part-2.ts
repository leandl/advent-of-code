import { Group } from "./utils";

export function part2Run(groups: Group[]) {
  let total = 0;

  for (const group of groups) {
    let commonAnswers = new Set(group[0]);

    for (let i = 1; i < group.length; i++) {
      const personAnswers = new Set(group[i]);

      commonAnswers = new Set(
        [...commonAnswers].filter((answer) => personAnswers.has(answer))
      );
    }

    total += commonAnswers.size;
  }

  return total;
}
