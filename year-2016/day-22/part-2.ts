import { Node } from "./utils";

type Pos = { x: number; y: number };

export function part2Run(nodes: Node[]): number {
  const maxX = Math.max(...nodes.map((n) => n.x));
  const maxY = Math.max(...nodes.map((n) => n.y));

  const grid = new Map<string, Node>();
  let empty!: Node;

  for (const n of nodes) {
    grid.set(`${n.x},${n.y}`, n);
    if (n.used === 0) empty = n;
  }

  const goal: Pos = { x: maxX, y: 0 };

  const isWall = (n: Node) => n.used > 100; // típico input AoC

  const key = (x: number, y: number) => `${x},${y}`;

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // BFS para mover o empty até target
  function bfs(start: Pos, target: Pos): number {
    const q: [Pos, number][] = [[start, 0]];
    const seen = new Set<string>([key(start.x, start.y)]);

    while (q.length) {
      const [{ x, y }, d] = q.shift()!;

      if (x === target.x && y === target.y) return d;

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx > maxX || ny > maxY) continue;

        const node = grid.get(key(nx, ny))!;
        if (isWall(node)) continue;

        const k = key(nx, ny);
        if (seen.has(k)) continue;

        seen.add(k);
        q.push([{ x: nx, y: ny }, d + 1]);
      }
    }

    throw new Error("no path");
  }

  // mover empty para a esquerda do goal
  const stepsToGoalLeft = bfs(
    { x: empty.x, y: empty.y },
    { x: goal.x - 1, y: goal.y },
  );

  // cada movimento do goal para esquerda custa 5
  const movesGoalAcross = (goal.x - 1) * 5;

  return stepsToGoalLeft + 1 + movesGoalAcross;
}
