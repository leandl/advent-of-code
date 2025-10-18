import { parseDataReindeer, regexDataReindeer } from "./utils";

function calcReindeerDistance(
  reindeerSprintKM: number,
  reindeerSprintSeconds: number,
  reindeerRest: number,
  raceTime: number
): number {
  let distanceTotal = 0;
  let remainingRaceTime = raceTime;

  while (remainingRaceTime > 0) {
    if (remainingRaceTime - reindeerSprintSeconds >= 0) {
      remainingRaceTime -= reindeerSprintSeconds;
      distanceTotal += reindeerSprintKM * reindeerSprintSeconds;
    } else {
      distanceTotal += reindeerSprintKM * remainingRaceTime;
      break;
    }

    remainingRaceTime -= reindeerRest;
  }

  return distanceTotal;
}

export function part1Run(lines: string[], raceTime: number) {
  let maxDistance = 0;
  for (const line of lines) {
    const match = regexDataReindeer.exec(line);
    if (match) {
      const [
        _reindeerName,
        reindeerSprintKM,
        reindeerSprintSeconds,
        reindeerRest,
      ] = parseDataReindeer(match);

      const reindeerDistance = calcReindeerDistance(
        reindeerSprintKM,
        reindeerSprintSeconds,
        reindeerRest,
        raceTime
      );

      maxDistance = Math.max(maxDistance, reindeerDistance);
    }
  }

  return maxDistance;
}
