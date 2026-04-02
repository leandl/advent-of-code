import { BusId, ShuttleSchedule } from "./utils";

function getWaitTime(timestamp: number, busId: BusId): number {
  const remainder = timestamp % busId;
  return remainder === 0 ? 0 : busId - remainder;
}

function findBestBus(schedule: ShuttleSchedule): {
  busId: BusId;
  waitTime: number;
} {
  return schedule.activeBuses.reduce(
    (best, busId) => {
      const waitTime = getWaitTime(schedule.earliestDeparture, busId);

      if (waitTime < best.waitTime) {
        return { busId, waitTime };
      }

      return best;
    },
    { busId: 0, waitTime: Number.POSITIVE_INFINITY },
  );
}

export function part1Run(schedule: ShuttleSchedule) {
  const { busId, waitTime } = findBestBus(schedule);

  return busId * waitTime;
}
