import { largestScannerDistance, reconstructBeaconMap, Scanner } from "./utlts";

export function part2Run(scanners: Scanner[]) {
  const { scannerPositions } = reconstructBeaconMap(scanners);

  return largestScannerDistance(scannerPositions);
}
