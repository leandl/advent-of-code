export type Dir = 0 | 1 | 2 | 3;

export const DIRS = [
  [0, 1], // direita
  [1, 0], // baixo
  [0, -1], // esquerda
  [-1, 0], // cima
];

export type Board = {
  grid: string[];
  width: number;
  height: number;
};

export type Instruction = number | "L" | "R";

function parseBoard(rawMap: string): Board {
  const rows = rawMap.split("\n");
  const width = Math.max(...rows.map((r) => r.length));
  const grid = rows.map((r) => r.padEnd(width, " "));

  return {
    grid,
    width,
    height: grid.length,
  };
}

function parsePath(rawPath: string): Instruction[] {
  return rawPath
    .match(/\d+|[LR]/g)!
    .map((token) => (token === "L" || token === "R" ? token : Number(token)));
}

export function parseBoardAndPath(input: string): [Board, Instruction[]] {
  const [rawMap, rawPath] = input.split("\n\n");

  const borad = parseBoard(rawMap);
  const instructions = parsePath(rawPath);

  return [borad, instructions];
}

export type CubeBoard = {
  grid: string[];
  width: number;
  height: number;
  size: number;
  faces: Map<string, number>; // "fr,fc" -> faceId
};

function parseCubeBoard(rawMap: string): CubeBoard {
  const rows = rawMap.split("\n");
  const width = Math.max(...rows.map((r) => r.length));
  const grid = rows.map((r) => r.padEnd(width, " "));

  const segments = rows
    .flatMap((r) => r.match(/[.#]+/g) ?? [])
    .map((s) => s.length);

  const size = Math.min(...segments);

  const faces = new Map<string, number>();
  let faceId = 1;

  const blockRows = Math.ceil(grid.length / size);
  const blockCols = Math.ceil(width / size);

  for (let br = 0; br < blockRows; br++) {
    for (let bc = 0; bc < blockCols; bc++) {
      const r = br * size;
      const c = bc * size;

      if (r >= grid.length || c >= width) continue;

      if (grid[r][c] !== " ") {
        faces.set(`${br},${bc}`, faceId++);
      }
    }
  }

  return {
    grid,
    width,
    height: grid.length,
    size,
    faces,
  };
}

export function parseCubeBoardAndPath(
  input: string,
): [CubeBoard, Instruction[]] {
  const [rawMap, rawPath] = input.split("\n\n");

  const board = parseCubeBoard(rawMap);
  const instructions = parsePath(rawPath);

  return [board, instructions];
}
