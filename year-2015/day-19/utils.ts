// H => HO
export const regexDataMolecule = /(^.*) => (.*)/;
type MoleculeReplacement = `${string} => ${string}`;

export function parseDataMolecule(match: RegExpExecArray): [string, string] {
  return [match[1], match[2]] as [string, string];
}

export function cleanInputMolecule(lines: string[]) {
  const moleculeReplacements = new Array<MoleculeReplacement>();
  const initialMolecule = lines[lines.length - 1];

  const lastIndexMoleculeReplacementsInLines = lines.length - 3;
  for (let index = 0; index <= lastIndexMoleculeReplacementsInLines; index++) {
    const moleculeReplacement = lines[index] as MoleculeReplacement;
    moleculeReplacements.push(moleculeReplacement);
  }

  return {
    initialMolecule,
    moleculeReplacements,
  };
}

export function getInitialMoleculeAndMoleculeReplacementsByLines(
  lines: string[]
) {
  const { initialMolecule, moleculeReplacements } = cleanInputMolecule(lines);
  const moleculeToReplacement = new Map<string, string[]>();

  for (const line of moleculeReplacements) {
    const match = regexDataMolecule.exec(line);
    if (match) {
      const [molecule, replacement] = parseDataMolecule(match);
      moleculeToReplacement.set(
        molecule,
        moleculeToReplacement.has(molecule)
          ? [...moleculeToReplacement.get(molecule)!, replacement]
          : [replacement]
      );
    }
  }

  return {
    initialMolecule,
    moleculeToReplacement,
  };
}

export function* generateCombinations(
  initialMolecule: string,
  moleculeToReplacement: Map<string, string[]>
): Generator<string> {
  for (let index = 0; index < initialMolecule.length; index++) {
    for (const [molecule, replacements] of moleculeToReplacement) {
      if (index + molecule.length > initialMolecule.length) {
        continue;
      }

      const subMolecule = initialMolecule.substring(
        index,
        index + molecule.length
      );

      if (subMolecule === molecule) {
        const startMolecule = initialMolecule.substring(0, index);
        const endMolecule = initialMolecule.substring(
          index + molecule.length,
          initialMolecule.length
        );

        for (const replacement of replacements) {
          yield `${startMolecule}${replacement}${endMolecule}`;
        }
      }
    }
  }
}
