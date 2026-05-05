import { CubeBoard, Instruction, Dir } from "./utils";

const RIGHT: Dir = 0;
const DOWN: Dir = 1;
const LEFT: Dir = 2;
const UP: Dir = 3;

type Face = {
  data: string[];
  coords: [number, number]; // (fx, fy)
  side: Partial<Record<Dir, { face: Face; rot: number }>>;
};

type Pos = {
  face: Face;
  x: number;
  y: number;
  d: Dir;
};

function rotate(dir: Dir, count: number): Dir {
  return ((dir + count + 4) % 4) as Dir;
}

export function part2Run([{ grid, size }, instructions]: [
  CubeBoard,
  Instruction[],
]) {
  const SIZE = size;

  // ---- construir faces ----
  const faceData: string[][][] = Array.from({ length: 7 }, () =>
    Array.from({ length: 7 }, () => []),
  );

  // agrupar linhas em blocos SIZE
  for (let by = 0; by < grid.length; by += SIZE) {
    for (let i = 0; i < SIZE; i++) {
      const line = grid[by + i] ?? "";
      for (let bx = 0; bx < line.length; bx += SIZE) {
        const chunk = line.slice(bx, bx + SIZE);
        if (chunk.trim().length > 0) {
          faceData[by / SIZE + 1][bx / SIZE + 1].push(chunk);
        }
      }
    }
  }

  const faces: (Face | null)[][] = Array.from({ length: 7 }, () =>
    Array(7).fill(null),
  );

  const faceCoords: [number, number][] = [];

  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      if (faceData[y][x].length > 0) {
        const face: Face = {
          data: faceData[y][x],
          coords: [x, y],
          side: {},
        };
        faces[x][y] = face;
        faceCoords.push([x, y]);
      }
    }
  }

  // ---- conexões diretas ----
  for (const [x, y] of faceCoords) {
    const f = faces[x][y]!;

    if (faces[x - 1]?.[y]) f.side[LEFT] = { face: faces[x - 1][y]!, rot: 0 };
    if (faces[x + 1]?.[y]) f.side[RIGHT] = { face: faces[x + 1][y]!, rot: 0 };
    if (faces[x]?.[y - 1]) f.side[UP] = { face: faces[x][y - 1]!, rot: 0 };
    if (faces[x]?.[y + 1]) f.side[DOWN] = { face: faces[x][y + 1]!, rot: 0 };
  }

  // ---- completar conexões (fold do cubo) ----
  let changed = true;

  while (changed) {
    changed = false;

    for (const [x, y] of faceCoords) {
      const f = faces[x][y]!;

      for (const d of [RIGHT, DOWN, LEFT, UP] as Dir[]) {
        if (f.side[d]) continue;

        for (const [sideDir, rot1] of [
          [rotate(d, 1), 1],
          [rotate(d, -1), -1],
        ] as [Dir, number][]) {
          const s1 = f.side[sideDir];
          if (!s1) continue;

          const s2 = s1.face.side[rotate(d, s1.rot)];
          if (!s2) continue;

          f.side[d] = {
            face: s2.face,
            rot: (rot1 + s1.rot + s2.rot + 4) % 4,
          };

          changed = true;
          break;
        }
      }
    }
  }

  // ---- movimento ----
  function move(pos: Pos): Pos {
    let { face, x, y, d } = pos;

    let nx = x + [1, 0, -1, 0][d];
    let ny = y + [0, 1, 0, -1][d];
    let nd = d;

    if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) {
      const edge = face.side[d]!;
      face = edge.face;
      nd = rotate(d, edge.rot);

      nx = (nx + SIZE) % SIZE;
      ny = (ny + SIZE) % SIZE;

      let tx = nx;
      let ty = ny;

      if (edge.rot === 1) {
        [tx, ty] = [
          [SIZE - 1 - ny, 0],
          [SIZE - 1, nx],
          [SIZE - 1 - ny, SIZE - 1],
          [0, nx],
        ][d];
      } else if (edge.rot === 2) {
        tx = SIZE - 1 - nx;
        ty = SIZE - 1 - ny;
      } else if (edge.rot === 3) {
        [tx, ty] = [
          [ny, SIZE - 1],
          [0, SIZE - 1 - nx],
          [ny, 0],
          [SIZE - 1, SIZE - 1 - nx],
        ][d];
      }

      nx = tx;
      ny = ty;
    }

    return { face, x: nx, y: ny, d: nd };
  }

  function walk(pos: Pos, steps: number): Pos {
    let cur = pos;

    for (let i = 0; i < steps; i++) {
      const next = move(cur);
      if (next.face.data[next.y][next.x] === "#") break;
      cur = next;
    }

    return cur;
  }

  // ---- posição inicial ----
  const topY = Math.min(...faceCoords.map(([, y]) => y));
  const topX = Math.min(
    ...faceCoords.filter(([, y]) => y === topY).map(([x]) => x),
  );

  let pos: Pos = {
    face: faces[topX][topY]!,
    x: 0,
    y: 0,
    d: RIGHT,
  };

  // ---- executar instruções ----
  for (const instr of instructions) {
    if (instr === "L") pos.d = rotate(pos.d, -1);
    else if (instr === "R") pos.d = rotate(pos.d, 1);
    else pos = walk(pos, instr);
  }

  const [fx, fy] = pos.face.coords;

  return (
    1000 * ((fy - 1) * SIZE + pos.y + 1) +
    4 * ((fx - 1) * SIZE + pos.x + 1) +
    pos.d
  );
}
