import { Dir, getInitialBlackTiles, neighbors } from "./utils";

function key(q: number, r: number) {
  return `${q},${r}`;
}

export function part2Run(lines: Array<Dir[]>) {
  const days = 100;
  let black = getInitialBlackTiles(lines);

  for (let day = 0; day < days; day++) {
    const neighborCount = new Map<string, number>();

    // contar vizinhos
    for (const tile of black) {
      const [q, r] = tile.split(",").map(Number);

      for (const [dq, dr] of neighbors) {
        const k = key(q + dq, r + dr);
        neighborCount.set(k, (neighborCount.get(k) || 0) + 1);
      }
    }

    const nextBlack = new Set<string>();

    for (const [tile, count] of neighborCount.entries()) {
      const isBlack = black.has(tile);

      if (isBlack && (count === 1 || count === 2)) {
        nextBlack.add(tile);
      }

      if (!isBlack && count === 2) {
        nextBlack.add(tile);
      }
    }

    black = nextBlack;
  }

  return black.size;
}
