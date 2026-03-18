export type PlantSimulationConfig = {
  initialPlants: Set<number>;
  growthRules: Set<string>;
};

export function parsePlantSimulation(lines: string[]): PlantSimulationConfig {
  const initialStr = lines[0].replace("initial state: ", "").trim();

  const initialPlants = new Set<number>();
  for (let i = 0; i < initialStr.length; i++) {
    if (initialStr[i] === "#") {
      initialPlants.add(i);
    }
  }

  const growthRules = new Set<string>();
  for (let i = 2; i < lines.length; i++) {
    if (!lines[i]) continue;

    const [pattern, result] = lines[i].split(" => ");
    if (result === "#") {
      growthRules.add(pattern);
    }
  }

  return { initialPlants, growthRules };
}

export function computeNextGeneration(
  currentPlants: Set<number>,
  growthRules: Set<string>,
): Set<number> {
  const nextPlants = new Set<number>();

  const min = Math.min(...currentPlants);
  const max = Math.max(...currentPlants);

  for (let i = min - 2; i <= max + 2; i++) {
    let pattern = "";

    for (let d = -2; d <= 2; d++) {
      pattern += currentPlants.has(i + d) ? "#" : ".";
    }

    if (growthRules.has(pattern)) {
      nextPlants.add(i);
    }
  }

  return nextPlants;
}
