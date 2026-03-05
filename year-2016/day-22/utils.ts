export type Node = {
  x: number;
  y: number;
  size: number;
  used: number;
  avail: number;
};

export function parseNodes(lines: string[]): Node[] {
  const nodes: Node[] = [];

  for (const line of lines) {
    const match = line.match(/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T/);

    if (!match) continue;

    const [, x, y, size, used, avail] = match;

    nodes.push({
      x: Number(x),
      y: Number(y),
      size: Number(size),
      used: Number(used),
      avail: Number(avail),
    });
  }

  return nodes;
}
