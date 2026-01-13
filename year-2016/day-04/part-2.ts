import { isRealRoom, parseRooms } from "./utils";

function decryptName(name: string, sectorId: number): string {
  const shift = sectorId % 26;

  return name
    .split("")
    .map((char) => {
      if (char === "-") return " ";

      const code = char.charCodeAt(0) - 97; // a = 0
      const shifted = (code + shift) % 26;
      return String.fromCharCode(shifted + 97);
    })
    .join("");
}

export function part2Run(lines: string[]) {
  const rooms = parseRooms(lines);

  for (const room of rooms) {
    if (!isRealRoom(room)) {
      continue;
    }

    const decrypted = decryptName(room.name, room.sectorId);

    if (decrypted.includes("north")) {
      return room.sectorId;
    }
  }

  return null;
}
