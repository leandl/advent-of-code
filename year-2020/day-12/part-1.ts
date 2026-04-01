import { Action, Instruction, parseInstructions } from "./utils";

export function part1Run(instructions: Instruction[]) {
  let x = 0;
  let y = 0;

  const directions = [Action.EAST, Action.SOUTH, Action.WEST, Action.NORTH];

  let dirIndex = 0;

  for (const { action, value } of instructions) {
    switch (action) {
      case Action.NORTH:
        y += value;
        break;
      case Action.SOUTH:
        y -= value;
        break;
      case Action.EAST:
        x += value;
        break;
      case Action.WEST:
        x -= value;
        break;

      case Action.LEFT:
        dirIndex = (dirIndex - value / 90 + 4) % 4;
        break;

      case Action.RIGHT:
        dirIndex = (dirIndex + value / 90) % 4;
        break;

      case Action.FORWARD: {
        const dir = directions[dirIndex];
        if (dir === Action.NORTH) y += value;
        if (dir === Action.SOUTH) y -= value;
        if (dir === Action.EAST) x += value;
        if (dir === Action.WEST) x -= value;
        break;
      }
    }
  }

  return Math.abs(x) + Math.abs(y);
}
