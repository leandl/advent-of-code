export function part2Run(graph: Map<string, string[]>) {
  function isSmallCave(cave: string): boolean {
    return cave === cave.toLowerCase();
  }

  function dfs(
    current: string,
    visited: Map<string, number>,
    usedDoubleVisit: boolean,
  ): number {
    if (current === "end") return 1;

    let paths = 0;

    for (const neighbor of graph.get(current) || []) {
      if (neighbor === "start") continue;

      const visits = visited.get(neighbor) || 0;

      if (isSmallCave(neighbor)) {
        if (visits === 0) {
          visited.set(neighbor, 1);
          paths += dfs(neighbor, visited, usedDoubleVisit);
          visited.set(neighbor, 0);
        } else if (visits === 1 && !usedDoubleVisit) {
          // usa o "poder" de visitar uma small cave 2x
          visited.set(neighbor, 2);
          paths += dfs(neighbor, visited, true);
          visited.set(neighbor, 1);
        }
      } else {
        paths += dfs(neighbor, visited, usedDoubleVisit);
      }
    }

    return paths;
  }

  const visited = new Map<string, number>();
  visited.set("start", 1);

  return dfs("start", visited, false);
}
