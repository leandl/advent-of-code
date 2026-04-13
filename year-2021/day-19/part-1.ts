import { reconstructBeaconMap, Scanner } from "./utlts";

export function part1Run(scanners: Scanner[]) {
  const { beaconsCount } = reconstructBeaconMap(scanners);
  return beaconsCount;
}
