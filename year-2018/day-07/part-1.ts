import { DependencyGraph } from "./utils";

export function part1Run({ allSteps, prerequisitesByStep }: DependencyGraph) {
  let result = "";

  while (allSteps.size > 0) {
    const availableSteps = Array.from(allSteps)
      .filter((step) => prerequisitesByStep.get(step)!.size === 0)
      .sort();

    const nextStep = availableSteps[0];
    result += nextStep;

    // Remove o passo escolhido
    allSteps.delete(nextStep);
    prerequisitesByStep.delete(nextStep);

    // Remove esse passo das dependências dos outros
    for (const deps of prerequisitesByStep.values()) {
      deps.delete(nextStep);
    }
  }

  return result;
}
