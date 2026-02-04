import { AlmanacInput, AlmanacMaps, ConversionMap } from "./utils";

function applyMap(value: number, map: ConversionMap): number {
  for (const { destinationStart, sourceStart, length } of map) {
    if (value >= sourceStart && value < sourceStart + length) {
      return destinationStart + (value - sourceStart);
    }
  }
  return value;
}

function seedToLocation(seed: number, maps: AlmanacMaps): number {
  let value = seed;
  for (const map of maps) {
    value = applyMap(value, map);
  }
  return value;
}

export function part1Run({ seeds, maps }: AlmanacInput) {
  let minLocation = Infinity;

  for (const seed of seeds) {
    const location = seedToLocation(seed, maps);
    minLocation = Math.min(minLocation, location);
  }

  return minLocation;
}
