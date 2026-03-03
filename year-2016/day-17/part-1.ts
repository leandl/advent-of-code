import { md5 } from "../../utils/function";
import { DIRECTOINS, isOpen, State } from "./utils";

export function part1Run(passcode: string) {
  const queue: State[] = [{ x: 0, y: 0, path: "" }];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { x, y, path } = current;

    if (x === 3 && y === 3) {
      return path;
    }

    const hash = md5(passcode + path);
    const doors = hash.slice(0, 4);

    for (let i = 0; i < 4; i++) {
      if (!isOpen(doors[i])) continue;

      const nx = x + DIRECTOINS[i].dx;
      const ny = y + DIRECTOINS[i].dy;

      if (nx < 0 || nx > 3 || ny < 0 || ny > 3) continue;

      queue.push({
        x: nx,
        y: ny,
        path: path + DIRECTOINS[i].move,
      });
    }
  }

  return null;
}
