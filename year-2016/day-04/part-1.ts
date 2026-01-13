import { isRealRoom, parseRooms } from "./utils";

export function part1Run(lines: string[]) {
  const rooms = parseRooms(lines);

  let sum = 0;

  for (const room of rooms) {
    if (isRealRoom(room)) {
      sum += room.sectorId;
    }
  }

  return sum;
}
