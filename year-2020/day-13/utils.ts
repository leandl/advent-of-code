export type BusId<T = number> = T;

export type ShuttleSchedule = {
  earliestDeparture: number;
  activeBuses: BusId[];
};

export function parseSchedule([
  timestampLine,
  busesLine,
]: string[]): ShuttleSchedule {
  const earliestDeparture = Number(timestampLine);

  const activeBuses = busesLine
    .split(",")
    .flatMap((value): BusId[] => (value === "x" ? [] : [Number(value)]));

  return { earliestDeparture, activeBuses };
}

type BusConstraint = {
  id: BusId<bigint>;
  offset: bigint;
};

export type ScheduleConstraints = BusConstraint[];

export function parseConstraints([, busesLine]: string[]): ScheduleConstraints {
  return busesLine.split(",").flatMap((value, index) => {
    if (value === "x") return [];

    return [
      {
        id: BigInt(value),
        offset: BigInt(index),
      },
    ] as ScheduleConstraints;
  });
}
