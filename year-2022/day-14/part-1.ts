import { key, Point } from "./utils";

export function part1Run(occupied: Set<string>) {
  const source: Point = { x: 500, y: 0 };

  // descobrir limite do abyss
  let maxY = 0;
  for (const pos of occupied) {
    const y = Number(pos.split(",")[1]);
    if (y > maxY) maxY = y;
  }

  let sandCount = 0;

  while (true) {
    let x = source.x;
    let y = source.y;

    while (true) {
      if (y > maxY) {
        // caiu no abyss
        return sandCount;
      }

      // baixo
      if (!occupied.has(key(x, y + 1))) {
        y++;
        continue;
      }

      // baixo-esquerda
      if (!occupied.has(key(x - 1, y + 1))) {
        x--;
        y++;
        continue;
      }

      // baixo-direita
      if (!occupied.has(key(x + 1, y + 1))) {
        x++;
        y++;
        continue;
      }

      // parou
      occupied.add(key(x, y));
      sandCount++;
      break;
    }
  }
}
