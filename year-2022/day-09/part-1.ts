import { Motion } from "./utils";

export function part1Run(motions: Motion[]) {
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };

  const visited = new Set<string>();
  visited.add("0,0");

  function isTouching() {
    return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
  }

  function moveTail() {
    const dx = head.x - tail.x;
    const dy = head.y - tail.y;

    tail.x += Math.sign(dx);
    tail.y += Math.sign(dy);
  }

  for (const motion of motions) {
    for (let i = 0; i < motion.steps; i++) {
      if (motion.direction === "U") head.y++;
      if (motion.direction === "D") head.y--;
      if (motion.direction === "R") head.x++;
      if (motion.direction === "L") head.x--;

      if (!isTouching()) {
        moveTail();
      }

      visited.add(`${tail.x},${tail.y}`);
    }
  }

  return visited.size;
}
