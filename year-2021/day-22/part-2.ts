import { computeReactorVolume, Step } from "./utlts";

export function part2Run(steps: Step[]) {
  return computeReactorVolume(steps).toString();
}
