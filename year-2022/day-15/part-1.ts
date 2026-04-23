import { countImpossiblePositions, Sensor } from "./utils";

export function part1Run(sensors: Sensor[]) {
  return countImpossiblePositions(sensors, 2000000);
}
