import { computeNextGeneration, PlantSimulationConfig } from "./utils";

export function part1Run({
  initialPlants,
  growthRules,
}: PlantSimulationConfig) {
  let plants = initialPlants;

  for (let i = 0; i < 20; i++) {
    plants = computeNextGeneration(plants, growthRules);
  }

  return [...plants].reduce((sum, p) => sum + p, 0);
}
