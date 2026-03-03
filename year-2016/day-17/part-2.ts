import { md5 } from "../../utils/function";
import { DIRECTOINS, isOpen, State } from "./utils";

export function part2Run(passcode: string): number {
  const stack: State[] = [{ x: 0, y: 0, path: "" }];
  let longest = 0;

  while (stack.length > 0) {
    const { x, y, path } = stack.pop()!;

    // Chegou ao cofre → atualiza e NÃO continua
    if (x === 3 && y === 3) {
      if (path.length > longest) longest = path.length;
      continue;
    }

    const hash = md5(passcode + path);
    const doors = hash.charCodeAt(0); // só para evitar slice (micro otimização)

    const first4 = hash; // evita criar substring

    for (let i = 0; i < 4; i++) {
      const c = first4[i];
      if (!isOpen(c)) continue;

      const nx = x + DIRECTOINS[i].dx;
      const ny = y + DIRECTOINS[i].dy;

      if (nx < 0 || nx > 3 || ny < 0 || ny > 3) continue;

      stack.push({
        x: nx,
        y: ny,
        path: path + DIRECTOINS[i].move,
      });
    }
  }

  return longest;
}
