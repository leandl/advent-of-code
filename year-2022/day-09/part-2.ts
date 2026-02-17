import { Motion } from "./utils";

export type Position = {
  x: number;
  y: number;
};

export function part2Run(motions: Motion[]) {
  // 10 nós (0 = head, 9 = tail)
  const rope = Array.from({ length: 10 }, () => ({
    x: 0,
    y: 0,
  }));

  const visited = new Set<string>();
  visited.add("0,0");

  function isTouching(a: Position, b: Position) {
    return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
  }

  function follow(leader: Position, follower: Position) {
    const dx = leader.x - follower.x;
    const dy = leader.y - follower.y;

    if (!isTouching(leader, follower)) {
      follower.x += Math.sign(dx);
      follower.y += Math.sign(dy);
    }
  }

  for (const motion of motions) {
    for (let step = 0; step < motion.steps; step++) {
      // mover cabeça
      if (motion.direction === "U") rope[0].y++;
      if (motion.direction === "D") rope[0].y--;
      if (motion.direction === "R") rope[0].x++;
      if (motion.direction === "L") rope[0].x--;

      // cada nó segue o anterior
      for (let i = 1; i < rope.length; i++) {
        follow(rope[i - 1], rope[i]);
      }

      // registrar posição do último nó
      const tail = rope[9];
      visited.add(`${tail.x},${tail.y}`);
    }
  }

  return visited.size;
}
