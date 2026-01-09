import { getCombinations } from "../../utils/function";
import { multiply, sum } from "./utils";

export function part1Run(numbers: number[]) {
  for (const combination of getCombinations(numbers, 2)) {
    if (sum(...combination) === 2020) {
      return multiply(...combination);
    }
  }
}
