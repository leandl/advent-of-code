import { parseInputPuzzle } from "./utils";

export function part1Run(lines: string[]) {
  const passwordPolicies = parseInputPuzzle(lines);
  let sum = 0;

  for (const passwordPolicy of passwordPolicies) {
    const { min, max, letter, password } = passwordPolicy;

    const count = password.split("").filter((char) => char === letter).length;

    if (count >= min && count <= max) {
      sum += 1;
    }
  }

  return sum;
}
