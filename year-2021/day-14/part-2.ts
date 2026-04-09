import { countCharacters, getMostMinusLeast, Polymer, runSteps } from "./utils";

export function part2Run({ rules, template }: Polymer) {
  const pairCounts = runSteps(template, rules, 40);
  const charCounts = countCharacters(pairCounts, template);

  return getMostMinusLeast(charCounts);
}
