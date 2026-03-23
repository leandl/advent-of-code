type Direction = "N" | "S" | "E" | "W";

type Position = Readonly<{
  x: number;
  y: number;
}>;

type PositionKey = string;

export function toKey(position: Position): PositionKey {
  return `${position.x},${position.y}` as PositionKey;
}

function fromKey(key: PositionKey): Position {
  const [x, y] = key.split(",").map(Number);
  return { x, y };
}

function isDirection(char: string): char is Direction {
  return char === "N" || char === "S" || char === "E" || char === "W";
}

function move(position: Position, dir: Direction): Position {
  switch (dir) {
    case "N":
      return { x: position.x, y: position.y - 1 };
    case "S":
      return { x: position.x, y: position.y + 1 };
    case "E":
      return { x: position.x + 1, y: position.y };
    case "W":
      return { x: position.x - 1, y: position.y };
  }
}

type Graph = Map<PositionKey, Set<PositionKey>>;

type BranchFrame = {
  start: Set<PositionKey>;
  ends: Set<PositionKey>;
};

export function buildGraph(regex: string): Graph {
  const graph: Graph = new Map();

  const connect = (a: Position, b: Position) => {
    const ka = toKey(a);
    const kb = toKey(b);

    if (!graph.has(ka)) graph.set(ka, new Set());
    if (!graph.has(kb)) graph.set(kb, new Set());

    graph.get(ka)!.add(kb);
    graph.get(kb)!.add(ka);
  };

  const pattern = regex.slice(1, -1); // remove ^ $

  let current = new Set<PositionKey>([toKey({ x: 0, y: 0 })]);
  const stack: BranchFrame[] = [];

  for (const char of pattern) {
    if (isDirection(char)) {
      const next = new Set<PositionKey>();

      for (const key of current) {
        const from = fromKey(key);
        const to = move(from, char);

        connect(from, to);
        next.add(toKey(to));
      }

      current = next;
    } else if (char === "(") {
      stack.push({
        start: new Set(current),
        ends: new Set(),
      });
    } else if (char === "|") {
      const top = stack[stack.length - 1];
      current.forEach((k) => top.ends.add(k));
      current = new Set(top.start);
    } else if (char === ")") {
      const top = stack.pop()!;
      current.forEach((k) => top.ends.add(k));
      current = top.ends;
    }
  }

  return graph;
}

export function bfs(
  graph: Graph,
  start: PositionKey,
): Map<PositionKey, number> {
  const distances = new Map<PositionKey, number>();
  const queue: PositionKey[] = [start];

  distances.set(start, 0);

  while (queue.length) {
    const current = queue.shift()!;
    const dist = distances.get(current)!;

    for (const next of graph.get(current) ?? []) {
      if (!distances.has(next)) {
        distances.set(next, dist + 1);
        queue.push(next);
      }
    }
  }

  return distances;
}
