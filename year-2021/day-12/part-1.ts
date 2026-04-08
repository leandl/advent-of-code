export function part1Run(graph: Map<string, string[]>) {
  function isSmallCave(cave: string): boolean {
    return cave === cave.toLowerCase();
  }

  function dfs(current: string, visited: Set<string>): number {
    if (current === "end") return 1;

    let paths = 0;

    for (const neighbor of graph.get(current) || []) {
      if (neighbor === "start") continue;

      if (isSmallCave(neighbor)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          paths += dfs(neighbor, visited);
          visited.delete(neighbor);
        }
      } else {
        paths += dfs(neighbor, visited);
      }
    }

    return paths;
  }

  const visited = new Set<string>();
  visited.add("start");

  return dfs("start", visited);
}
