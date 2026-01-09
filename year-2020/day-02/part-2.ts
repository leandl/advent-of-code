import { parseInputPuzzle } from "./utils";

export function part2Run(lines: string[]) {
  const passwordPolicies = parseInputPuzzle(lines);
  let sum = 0;

  for (const passwordPolicy of passwordPolicies) {
    const { min: pos1, max: pos2, letter, password } = passwordPolicy;

    const firstMatch = password[pos1 - 1] === letter;
    const secondMatch = password[pos2 - 1] === letter;

    // XOR: exatamente um true
    if (firstMatch !== secondMatch) {
      sum += 1;
    }
  }

  return sum;
}
