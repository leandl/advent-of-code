export type Node = {
  value: number;
  depth: number;
};

export function parseNodes(line: string): Node[] {
  const result: Node[] = [];
  let depth = 0;

  for (let i = 0; i < line.length; i++) {
    const c = line[i];

    if (c === "[") depth++;
    else if (c === "]") depth--;
    else if (/\d/.test(c)) {
      let num = c;
      while (/\d/.test(line[i + 1])) {
        num += line[++i];
      }
      result.push({ value: Number(num), depth });
    }
  }

  return result;
}

export function magnitude(nodes: Node[]): number {
  nodes = [...nodes];

  while (nodes.length > 1) {
    for (let i = 0; i < nodes.length - 1; i++) {
      if (nodes[i].depth === nodes[i + 1].depth) {
        const val = 3 * nodes[i].value + 2 * nodes[i + 1].value;

        nodes.splice(i, 2, {
          value: val,
          depth: nodes[i].depth - 1,
        });
        break;
      }
    }
  }

  return nodes[0].value;
}

export function add(a: Node[], b: Node[]): Node[] {
  const combined = [...a, ...b].map((n) => ({
    value: n.value,
    depth: n.depth + 1,
  }));

  return reduce(combined);
}

function reduce(nodes: Node[]): Node[] {
  while (true) {
    // explode
    let exploded = false;
    for (let i = 0; i < nodes.length - 1; i++) {
      if (nodes[i].depth > 4 && nodes[i].depth === nodes[i + 1].depth) {
        if (i > 0) nodes[i - 1].value += nodes[i].value;
        if (i + 2 < nodes.length) nodes[i + 2].value += nodes[i + 1].value;

        nodes.splice(i, 2, { value: 0, depth: nodes[i].depth - 1 });
        exploded = true;
        break;
      }
    }
    if (exploded) continue;

    // split
    let split = false;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value >= 10) {
        const { value, depth } = nodes[i];
        const left = Math.floor(value / 2);
        const right = Math.ceil(value / 2);

        nodes.splice(
          i,
          1,
          { value: left, depth: depth + 1 },
          { value: right, depth: depth + 1 },
        );

        split = true;
        break;
      }
    }

    if (!split) break;
  }

  return nodes;
}
