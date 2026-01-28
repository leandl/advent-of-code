export type OrbitMap = Map<string, string[]>;

export function parseOrbitMap(lines: string[]): OrbitMap {
  const map: OrbitMap = new Map();

  for (const line of lines) {
    const [center, orbiter] = line.trim().split(")");

    if (!map.has(center)) {
      map.set(center, []);
    }

    map.get(center)!.push(orbiter);
  }

  return map;
}
