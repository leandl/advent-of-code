import {
  generateCombinations,
  getInitialMoleculeAndMoleculeReplacementsByLines,
} from "./utils";

export function part1Run(lines: string[]) {
  const { initialMolecule, moleculeToReplacement } =
    getInitialMoleculeAndMoleculeReplacementsByLines(lines);

  const allCombinations = new Set<string>();
  for (const combination of generateCombinations(
    initialMolecule,
    moleculeToReplacement
  )) {
    allCombinations.add(combination);
  }

  return allCombinations.size;
}
