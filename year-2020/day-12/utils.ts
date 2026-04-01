export enum Action {
  NORTH = "N",
  SOUTH = "S",
  EAST = "E",
  WEST = "W",
  LEFT = "L",
  RIGHT = "R",
  FORWARD = "F",
}

export type Instruction = {
  action: Action;
  value: number;
};

export function parseInstructions(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const action = line[0] as Action;

    if (!Object.values(Action).includes(action)) {
      throw new Error(`Invalid action: ${action}`);
    }

    return {
      action,
      value: Number(line.slice(1)),
    };
  });
}
