type Item = {
  chip: number;
  generator: number;
};

export type State = {
  elevator: number;
  pairs: Item[];
};

const FLOORS = 4;

function isFloorSafe(pairs: Item[], floor: number): boolean {
  const generators = new Set<number>();

  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].generator === floor) {
      generators.add(i);
    }
  }

  if (generators.size === 0) return true;

  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].chip === floor && pairs[i].generator !== floor) {
      return false;
    }
  }

  return true;
}

function isValid(state: State): boolean {
  for (let f = 0; f < FLOORS; f++) {
    if (!isFloorSafe(state.pairs, f)) return false;
  }
  return true;
}

function getKey(state: State): string {
  const normalized = state.pairs
    .map((p) => [p.chip, p.generator])
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  return state.elevator + "|" + normalized.map((p) => p.join(",")).join("|");
}

function isGoal(state: State): boolean {
  return state.pairs.every((p) => p.chip === 3 && p.generator === 3);
}

function nextStates(state: State): State[] {
  const results: State[] = [];
  const { elevator, pairs } = state;

  const items: { type: "chip" | "gen"; index: number }[] = [];

  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].chip === elevator) items.push({ type: "chip", index: i });
    if (pairs[i].generator === elevator) items.push({ type: "gen", index: i });
  }

  const moves: (typeof items)[] = [];

  for (let i = 0; i < items.length; i++) {
    moves.push([items[i]]);
  }

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      moves.push([items[i], items[j]]);
    }
  }

  for (const dir of [-1, 1]) {
    const newFloor = elevator + dir;
    if (newFloor < 0 || newFloor >= FLOORS) continue;

    for (const move of moves) {
      const newPairs: Item[] = pairs.map((p) => ({ ...p }));

      for (const item of move) {
        if (item.type === "chip") {
          newPairs[item.index].chip = newFloor;
        } else {
          newPairs[item.index].generator = newFloor;
        }
      }

      const newState: State = {
        elevator: newFloor,
        pairs: newPairs,
      };

      if (isValid(newState)) {
        results.push(newState);
      }
    }
  }

  return results;
}

export function solve(initial: State): number {
  const visited = new Set<string>();
  const queue: [State, number][] = [[initial, 0]];

  visited.add(getKey(initial));

  while (queue.length > 0) {
    const [state, steps] = queue.shift()!;

    if (isGoal(state)) return steps;

    for (const next of nextStates(state)) {
      const key = getKey(next);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push([next, steps + 1]);
      }
    }
  }

  return -1;
}
