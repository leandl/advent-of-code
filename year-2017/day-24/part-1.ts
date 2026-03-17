import { Component } from "./utils";

export function part1Run(components: Component[]) {
  function dfs(port: number, used: boolean[]): number {
    let best = 0;

    for (let i = 0; i < components.length; i++) {
      if (used[i]) continue;

      const [a, b] = components[i];

      if (a === port || b === port) {
        used[i] = true;

        const nextPort = a === port ? b : a;
        const strength = a + b;

        const total = strength + dfs(nextPort, used);
        best = Math.max(best, total);

        used[i] = false; // backtrack
      }
    }

    return best;
  }

  return dfs(0, Array(components.length).fill(false));
}
