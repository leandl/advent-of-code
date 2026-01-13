const ROOM_REGEX = /^([a-z-]+)-(\d+)\[([a-z]{5})\]$/;

type Room = {
  name: string;
  sectorId: number;
  checksum: string;
};

export function parseRooms(lines: string[]): Room[] {
  const triangles = new Array<Room>();

  for (const line of lines) {
    const match = line.match(ROOM_REGEX);
    if (!match) {
      console.log(line);
      continue;
    }

    const [, name, sectorId, checksum] = match;

    triangles.push({
      name,
      sectorId: Number(sectorId),
      checksum,
    });
  }

  return triangles;
}

function computeChecksum(name: string): string {
  const counts = new Map<string, number>();

  for (const char of name.replace(/-/g, "")) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => {
      // 1️⃣ frequência (desc)
      if (b[1] !== a[1]) return b[1] - a[1];
      // 2️⃣ alfabética (asc)
      return a[0].localeCompare(b[0]);
    })
    .slice(0, 5)
    .map(([char]) => char)
    .join("");
}

export function isRealRoom(room: Room): boolean {
  return computeChecksum(room.name) === room.checksum;
}
