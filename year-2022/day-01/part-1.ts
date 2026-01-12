import { parseElveCalories } from "./utils";

export function part1Run(lines: string[]) {
  const elves = parseElveCalories(lines);

  let maxCalories = 0;

  for (const elf of elves) {
    const totalCalories = elf.reduce((sum, value) => sum + value, 0);

    if (totalCalories > maxCalories) {
      maxCalories = totalCalories;
    }
  }

  return maxCalories;
}
