import { Component } from "./utils";

type Result = {
  length: number;
  strength: number;
};

export function part2Run(components: Component[]) {
  function dfs(port: number, used: boolean[]): Result {
    let best: Result = { length: 0, strength: 0 };

    for (let i = 0; i < components.length; i++) {
      if (used[i]) continue;

      const [a, b] = components[i];

      if (a === port || b === port) {
        used[i] = true;

        const nextPort = a === port ? b : a;
        const sub = dfs(nextPort, used);

        const current: Result = {
          length: sub.length + 1,
          strength: sub.strength + a + b,
        };

        if (
          current.length > best.length ||
          (current.length === best.length && current.strength > best.strength)
        ) {
          best = current;
        }

        used[i] = false;
      }
    }

    return best;
  }

  const result = dfs(0, Array(components.length).fill(false));
  return result.strength;
}
