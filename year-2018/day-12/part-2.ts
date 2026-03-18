import { computeNextGeneration, PlantSimulationConfig } from "./utils";

export function part2Run({
  initialPlants,
  growthRules,
}: PlantSimulationConfig) {
  let plants = new Set(initialPlants);

  let lastSum = 0;
  let lastDiff = 0;
  let stableCount = 0;

  const TARGET = 50_000_000_000;

  for (let gen = 1; gen <= TARGET; gen++) {
    plants = computeNextGeneration(plants, growthRules);

    const sum = [...plants].reduce((s, p) => s + p, 0);
    const diff = sum - lastSum;

    // checar se estabilizou (mesmo crescimento várias vezes)
    if (diff === lastDiff) {
      stableCount++;
      if (stableCount > 50) {
        const remaining = TARGET - gen;
        return sum + remaining * diff;
      }
    } else {
      stableCount = 0;
    }

    lastSum = sum;
    lastDiff = diff;
  }

  return [...plants].reduce((s, p) => s + p, 0);
}
