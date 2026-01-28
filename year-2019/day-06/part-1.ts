import { OrbitMap } from "./utils";

export function part1Run(orbits: OrbitMap) {
  function dfs(object: string, depth: number): number {
    let sum = depth;
    const children = orbits.get(object) ?? [];
    for (const child of children) {
      sum += dfs(child, depth + 1);
    }

    return sum;
  }

  return dfs("COM", 0);
}
