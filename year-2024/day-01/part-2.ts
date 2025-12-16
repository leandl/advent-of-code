import { LocationId, parseLocationLists } from "./utils";

function buildFrequencyMap(values: LocationId[]): Map<LocationId, number> {
  const frequency = new Map<LocationId, number>();

  for (const value of values) {
    const frequencyValue = frequency.get(value) ?? 0;
    frequency.set(value, frequencyValue + 1);
  }

  return frequency;
}

export function part2Run(lines: string[]) {
  const [leftList, rightList] = parseLocationLists(lines);
  const rightFrequency = buildFrequencyMap(rightList);

  let similarityScore = 0;
  for (const locationId of leftList) {
    const rightFrequencyValue = rightFrequency.get(locationId) ?? 0;
    similarityScore += locationId * rightFrequencyValue;
  }

  return similarityScore;
}
