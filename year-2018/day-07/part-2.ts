import { DependencyGraph } from "./utils";

type Worker = {
  step: string | null;
  remainingTime: number;
};

function getStepDuration(step: string, baseDuration: number): number {
  const letterValue = step.charCodeAt(0) - "A".charCodeAt(0) + 1;
  return baseDuration + letterValue;
}

function calculateTotalTime(
  graph: DependencyGraph,
  workerCount: number,
  baseDuration: number
): number {
  const allSteps = new Set(graph.allSteps);
  const prerequisitesByStep = new Map(
    Array.from(graph.prerequisitesByStep.entries()).map(([step, prereqs]) => [
      step,
      new Set(prereqs),
    ])
  );

  const workers: Worker[] = Array.from({ length: workerCount }, () => ({
    step: null,
    remainingTime: 0,
  }));

  const inProgress = new Set<string>();
  let time = 0;

  while (allSteps.size > 0 || inProgress.size > 0) {
    // 1. Finaliza tarefas
    for (const worker of workers) {
      if (worker.step && worker.remainingTime === 0) {
        const finishedStep = worker.step;

        worker.step = null;
        inProgress.delete(finishedStep);
        allSteps.delete(finishedStep);

        for (const prereqs of prerequisitesByStep.values()) {
          prereqs.delete(finishedStep);
        }
      }
    }

    // 2. Descobre passos disponíveis
    const availableSteps = Array.from(allSteps)
      .filter(
        (step) =>
          prerequisitesByStep.get(step)!.size === 0 && !inProgress.has(step)
      )
      .sort();

    // 3. Atribui passos a workers livres
    for (const worker of workers) {
      if (!worker.step && availableSteps.length > 0) {
        const step = availableSteps.shift()!;
        worker.step = step;
        worker.remainingTime = getStepDuration(step, baseDuration);
        inProgress.add(step);
      }
    }

    // 4. Avança o tempo
    if (inProgress.size > 0) {
      time++;

      for (const worker of workers) {
        if (worker.step) {
          worker.remainingTime--;
        }
      }
    }
  }

  return time;
}

export function part2Run(dependencyGraph: DependencyGraph) {
  return calculateTotalTime(dependencyGraph, 5, 60);
}
