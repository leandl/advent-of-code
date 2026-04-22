import { key } from "./utils";

export function part2Run(occupied: Set<string>) {
  const source = { x: 500, y: 0 };

  // encontrar maior Y
  let maxY = 0;
  for (const pos of occupied) {
    const y = Number(pos.split(",")[1]);
    if (y > maxY) maxY = y;
  }

  const floorY = maxY + 2;

  let sandCount = 0;

  while (true) {
    let x = source.x;
    let y = source.y;

    // se a fonte já está bloqueada, acabou
    if (occupied.has(key(x, y))) {
      return sandCount;
    }

    while (true) {
      // chão infinito
      if (y + 1 === floorY) {
        occupied.add(key(x, y));
        sandCount++;
        break;
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
