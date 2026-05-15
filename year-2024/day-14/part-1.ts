import { Robot, getPosition } from "./utils";

export function part1Run(robots: Robot[]) {
  const W = 101;
  const H = 103;
  const T = 100;

  const midX = Math.floor(W / 2); // 50
  const midY = Math.floor(H / 2); // 51

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  for (const r of robots) {
    const { x, y } = getPosition(r, T, W, H);

    // ignora linha do meio
    if (x === midX || y === midY) continue;

    if (x < midX && y < midY)
      q1++; // topo-esquerda
    else if (x > midX && y < midY)
      q2++; // topo-direita
    else if (x < midX && y > midY)
      q3++; // baixo-esquerda
    else if (x > midX && y > midY) q4++; // baixo-direita
  }

  return q1 * q2 * q3 * q4;
}
