import { Action, Instruction } from "./utils";

export function part2Run(instructions: Instruction[]): number {
  let shipX = 0;
  let shipY = 0;

  let wpX = 10; // waypoint relativo ao navio
  let wpY = 1;

  function rotateRight(times: number) {
    for (let i = 0; i < times; i++) {
      const temp = wpX;
      wpX = wpY;
      wpY = -temp;
    }
  }

  function rotateLeft(times: number) {
    for (let i = 0; i < times; i++) {
      const temp = wpX;
      wpX = -wpY;
      wpY = temp;
    }
  }

  for (const { action, value } of instructions) {
    switch (action) {
      case Action.NORTH:
        wpY += value;
        break;

      case Action.SOUTH:
        wpY -= value;
        break;

      case Action.EAST:
        wpX += value;
        break;

      case Action.WEST:
        wpX -= value;
        break;

      case Action.RIGHT:
        rotateRight(value / 90);
        break;

      case Action.LEFT:
        rotateLeft(value / 90);
        break;

      case Action.FORWARD:
        shipX += wpX * value;
        shipY += wpY * value;
        break;
    }
  }

  return Math.abs(shipX) + Math.abs(shipY);
}
