export type Race = {
  time: number;
  recordDistance: number;
};

export function parseRaces(input: string): Race[] {
  const lines = input.trim().split("\n");

  const times = lines[0].replace("Time:", "").trim().split(/\s+/).map(Number);

  const distances = lines[1]
    .replace("Distance:", "")
    .trim()
    .split(/\s+/)
    .map(Number);

  return times.map((time, i) => ({
    time,
    recordDistance: distances[i],
  }));
}

export function parseSingleRace(input: string): Race {
  const lines = input.trim().split("\n");

  const time = Number(lines[0].replace("Time:", "").replace(/\s+/g, ""));

  const recordDistance = Number(
    lines[1].replace("Distance:", "").replace(/\s+/g, "")
  );

  return { time, recordDistance };
}
