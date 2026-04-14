import { clampStep, computeReactorVolume, Step } from "./utlts";

export function part1Run(steps: Step[]) {
  const stepsFiltered = steps
    .map((s) => clampStep(s, -50, 50))
    .filter((s): s is Step => s !== null);

  return computeReactorVolume(stepsFiltered).toString();
}
