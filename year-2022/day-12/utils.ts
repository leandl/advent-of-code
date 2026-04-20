import { Grid, parseGrid } from "../../utils/parsers";

type Coordinates = {
  x: number;
  y: number;
};

export type HeightMap = {
  elevations: Grid<number>;
  start: Coordinates;
  end: Coordinates;
};

function getElevation(char: string): number {
  return char.charCodeAt(0) - "a".charCodeAt(0);
}

export function parseHeightMap(lines: string[]): HeightMap {
  const charGrid = parseGrid(lines); // mantém S e E intactos

  let start: Coordinates = { x: 0, y: 0 };
  let end: Coordinates = { x: 0, y: 0 };

  const elevations = charGrid.map((row, y) =>
    row.map((cell, x) => {
      if (cell === "S") {
        start = { x, y };
        return 0; // mesma altura de 'a'
      }

      if (cell === "E") {
        end = { x, y };
        return 25; // mesma altura de 'z'
      }

      return getElevation(cell);
    }),
  );

  return { elevations, start, end };
}

type QueueNode = {
  x: number;
  y: number;
  distance: number;
};

export function bfs(
  elevations: number[][],
  startNodes: Coordinates[],
  canMove: (current: number, next: number) => boolean,
  isGoal: (x: number, y: number, elevation: number) => boolean,
): number {
  const numRows = elevations.length;
  const numCols = elevations[0].length;

  const visited: boolean[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false),
  );

  const queue: QueueNode[] = [];

  for (const start of startNodes) {
    queue.push({ x: start.x, y: start.y, distance: 0 });
    visited[start.y][start.x] = true;
  }

  const directions: Coordinates[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];

    const currentElevation = elevations[current.y][current.x];

    if (isGoal(current.x, current.y, currentElevation)) {
      return current.distance;
    }

    for (const dir of directions) {
      const nx = current.x + dir.x;
      const ny = current.y + dir.y;

      const isOutOfBounds = nx < 0 || ny < 0 || nx >= numCols || ny >= numRows;

      if (isOutOfBounds || visited[ny][nx]) continue;

      const nextElevation = elevations[ny][nx];

      if (!canMove(currentElevation, nextElevation)) continue;

      visited[ny][nx] = true;

      queue.push({
        x: nx,
        y: ny,
        distance: current.distance + 1,
      });
    }
  }

  return -1;
}
