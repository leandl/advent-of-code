type Point = { x: number; y: number };
export type Sensor = {
  pos: Point;
  beacon: Point;
  dist: number;
};

function manhattan(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function parseSensors(lines: string[]): Sensor[] {
  const regex =
    /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;

  return lines.map((line) => {
    const match = line.match(regex);
    if (!match) throw new Error("linha inválida");

    const [, sx, sy, bx, by] = match.map(Number);

    const pos = { x: sx, y: sy };
    const beacon = { x: bx, y: by };

    return {
      pos,
      beacon,
      dist: manhattan(pos, beacon),
    };
  });
}

function mergeIntervals(intervals: [number, number][]): [number, number][] {
  intervals.sort((a, b) => a[0] - b[0]);

  const result: [number, number][] = [];

  for (const [start, end] of intervals) {
    if (result.length === 0) {
      result.push([start, end]);
      continue;
    }

    const last = result[result.length - 1];

    if (start <= last[1] + 1) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}

export function countImpossiblePositions(
  sensors: Sensor[],
  targetY: number,
): number {
  const intervals: [number, number][] = [];
  const beaconsOnRow = new Set<number>();

  for (const s of sensors) {
    // guarda beacons na linha alvo
    if (s.beacon.y === targetY) {
      beaconsOnRow.add(s.beacon.x);
    }

    const dy = Math.abs(s.pos.y - targetY);

    // se não alcança a linha
    if (dy > s.dist) continue;

    const remaining = s.dist - dy;

    intervals.push([s.pos.x - remaining, s.pos.x + remaining]);
  }

  const merged = mergeIntervals(intervals);

  let total = 0;

  for (const [start, end] of merged) {
    total += end - start + 1;
  }

  // remove posições onde já existe beacon
  for (const bx of beaconsOnRow) {
    for (const [start, end] of merged) {
      if (bx >= start && bx <= end) {
        total--;
        break;
      }
    }
  }

  return total;
}

function isValid(p: Point, sensors: Sensor[]): boolean {
  for (const s of sensors) {
    if (manhattan(p, s.pos) <= s.dist) {
      return false;
    }
  }
  return true;
}

export function findTuningFrequency(
  sensors: Sensor[],
  maxCoord = 4_000_000,
): number {
  for (const s of sensors) {
    const d = s.dist + 1;

    // percorre o losango (perímetro)
    for (let dx = -d; dx <= d; dx++) {
      const dy = d - Math.abs(dx);

      const candidates = [
        { x: s.pos.x + dx, y: s.pos.y + dy },
        { x: s.pos.x + dx, y: s.pos.y - dy },
      ];

      for (const p of candidates) {
        // dentro da área permitida
        if (p.x < 0 || p.y < 0 || p.x > maxCoord || p.y > maxCoord) {
          continue;
        }

        if (isValid(p, sensors)) {
          // encontrou!
          return p.x * 4_000_000 + p.y;
        }
      }
    }
  }

  throw new Error("Beacon não encontrado");
}
