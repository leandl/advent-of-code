type Direction = -1 | 1;

type Rule = {
  write: 0 | 1;
  move: Direction;
  next: string;
};

type State = {
  0: Rule;
  1: Rule;
};

export type Machine = {
  initialState: string;
  steps: number;
  states: Record<string, State>;
};

export function parseMachine(input: string): Machine {
  const lines = input.trim().split("\n");

  const initialState = lines[0].match(/Begin in state (\w+)/)![1];
  const steps = parseInt(lines[1].match(/after (\d+) steps/)![1], 10);

  const states: Record<string, State> = {};

  let i = 2;

  while (i < lines.length) {
    if (!lines[i].trim()) {
      i++;
      continue;
    }

    const stateName = lines[i].match(/In state (\w+)/)![1];
    i++;

    const state: Partial<State> = {};

    for (let v = 0 as 0 | 1; v <= 1; v++) {
      i++; // "If current value is X"

      const write = parseInt(
        lines[i++].match(/Write the value (\d)/)![1],
        10,
      ) as 0 | 1;

      const moveStr = lines[i++].match(/Move one slot to the (right|left)/)![1];
      const move: Direction = moveStr === "right" ? 1 : -1;

      const next = lines[i++].match(/state (\w+)/)![1];

      state[v] = { write, move, next };
    }

    states[stateName] = state as State;
  }

  return { initialState, steps, states };
}
