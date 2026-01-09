import { getCombinations } from "../../utils/function";
import { multiply, sum } from "./utils";

export function part2Run(numbers: number[]) {
  for (const combination of getCombinations(numbers, 3)) {
    if (sum(...combination) === 2020) {
      return multiply(...combination);
    }
  }
}
