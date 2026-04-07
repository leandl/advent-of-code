export type Dir = "e" | "w" | "ne" | "nw" | "se" | "sw";

const directions: Record<Dir, [number, number]> = {
  e: [1, 0],
  w: [-1, 0],
  ne: [1, -1],
  nw: [0, -1],
  se: [0, 1],
  sw: [-1, 1],
};

export const neighbors: [number, number][] = Object.values(directions);

function parseLine(line: string): Dir[] {
  const result: Dir[] = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === "n" || line[i] === "s") {
      result.push(line.slice(i, i + 2) as Dir);
      i += 2;
    } else {
      result.push(line[i] as Dir);
      i += 1;
    }
  }

  return result;
}
export function parseLines(lines: string[]): Array<Dir[]> {
  return lines.map(parseLine);
}

function walk(dirs: Dir[]): [number, number] {
  let q = 0;
  let r = 0;

  for (const dir of dirs) {
    const [dq, dr] = directions[dir];
    q += dq;
    r += dr;
  }

  return [q, r];
}

export function getInitialBlackTiles(lines: Array<Dir[]>) {
  const blackTiles = new Set<string>();

  for (const dirs of lines) {
    const [q, r] = walk(dirs);

    const key = `${q},${r}`;

    if (blackTiles.has(key)) {
      blackTiles.delete(key);
    } else {
      blackTiles.add(key);
    }
  }

  return blackTiles;
}
