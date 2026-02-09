export type DependencyGraph = {
  allSteps: Set<string>;
  prerequisitesByStep: Map<string, Set<string>>;
};

export function parseDependencyGraph(lines: string[]): DependencyGraph {
  const allSteps = new Set<string>();
  const prerequisitesByStep = new Map<string, Set<string>>();

  for (const line of lines) {
    const match = line.match(
      /Step (\w) must be finished before step (\w) can begin\./
    );

    if (!match) continue;

    const [, prerequisite, step] = match;

    allSteps.add(prerequisite);
    allSteps.add(step);

    // garante entrada para todos os passos
    if (!prerequisitesByStep.has(prerequisite)) {
      prerequisitesByStep.set(prerequisite, new Set());
    }
    if (!prerequisitesByStep.has(step)) {
      prerequisitesByStep.set(step, new Set());
    }

    // step depende de prerequisite
    prerequisitesByStep.get(step)!.add(prerequisite);
  }

  return { allSteps, prerequisitesByStep };
}
