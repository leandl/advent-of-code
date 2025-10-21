import { getInitialMoleculeAndMoleculeReplacementsByLines } from "./utils";

export function* generateSimpleMolecule(
  initialMolecule: string,
  replacementToMolecule: Array<[string, string]>
): Generator<string> {
  for (let index = 0; index < initialMolecule.length; index++) {
    for (const [replacement, molecule] of replacementToMolecule) {
      if (index + replacement.length > initialMolecule.length) {
        continue;
      }

      if (molecule === "e") {
        if (initialMolecule === replacement) {
          yield "e";
        } else {
          continue;
        }
      }

      const subMolecule = initialMolecule.substring(
        index,
        index + replacement.length
      );

      if (subMolecule === replacement) {
        const startMolecule = initialMolecule.substring(0, index);
        const endMolecule = initialMolecule.substring(
          index + replacement.length,
          initialMolecule.length
        );

        yield `${startMolecule}${molecule}${endMolecule}`;
      }
    }
  }
}

function convertMoleculeToReplacementToReplacementToMolecule(
  moleculeToReplacement: Map<string, string[]>
): Array<[string, string]> {
  const replacementToMolecule = new Array<[string, string]>();

  for (const [molecule, replacements] of moleculeToReplacement) {
    for (const replacement of replacements) {
      replacementToMolecule.push([replacement, molecule]);
    }
  }

  replacementToMolecule.sort((a, b) => b[0].length - a[0].length);
  return replacementToMolecule;
}

export function part2Run(lines: string[]) {
  const { initialMolecule, moleculeToReplacement } =
    getInitialMoleculeAndMoleculeReplacementsByLines(lines);

  const replacementToMolecule =
    convertMoleculeToReplacementToReplacementToMolecule(moleculeToReplacement);

  let variant = initialMolecule;
  let steps = 0;

  while (variant !== "e") {
    for (const r of replacementToMolecule) {
      for (const newMolecule of generateSimpleMolecule(variant, [r])) {
        variant = newMolecule;
        steps += 1;
        break;
      }
    }
  }

  return steps;
}
