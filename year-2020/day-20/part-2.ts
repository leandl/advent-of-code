import { Tile } from "./utils";

type PlacedTile = {
  id: number;
  grid: string[];
};

function rotate(grid: string[]): string[] {
  const N = grid.length;
  const result: string[] = [];

  for (let c = 0; c < N; c++) {
    let row = "";
    for (let r = N - 1; r >= 0; r--) {
      row += grid[r][c];
    }
    result.push(row);
  }

  return result;
}

function flip(grid: string[]): string[] {
  return grid.map((row) => row.split("").reverse().join(""));
}

function getAllOrientations(grid: string[]): string[][] {
  const result: string[][] = [];
  let current = grid;

  for (let i = 0; i < 4; i++) {
    result.push(current);
    result.push(flip(current));
    current = rotate(current);
  }

  return result;
}

function getEdges(grid: string[]) {
  const top = grid[0];
  const bottom = grid[grid.length - 1];
  const left = grid.map((r) => r[0]).join("");
  const right = grid.map((r) => r[r.length - 1]).join("");

  return { top, bottom, left, right };
}

function assembleImage(tiles: Tile[]): PlacedTile[][] {
  const size = Math.sqrt(tiles.length);
  const grid: (PlacedTile | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null),
  );

  const used = new Set<number>();

  function fits(r: number, c: number, tile: string[]): boolean {
    const edges = getEdges(tile);

    // topo
    if (r > 0 && grid[r - 1][c]) {
      const above = getEdges(grid[r - 1][c]!.grid);
      if (above.bottom !== edges.top) return false;
    }

    // esquerda
    if (c > 0 && grid[r][c - 1]) {
      const left = getEdges(grid[r][c - 1]!.grid);
      if (left.right !== edges.left) return false;
    }

    return true;
  }

  function backtrack(pos: number): boolean {
    if (pos === size * size) return true;

    const r = Math.floor(pos / size);
    const c = pos % size;

    for (const tile of tiles) {
      if (used.has(tile.id)) continue;

      for (const variant of getAllOrientations(tile.grid)) {
        if (!fits(r, c, variant)) continue;

        grid[r][c] = { id: tile.id, grid: variant };
        used.add(tile.id);

        if (backtrack(pos + 1)) return true;

        used.delete(tile.id);
        grid[r][c] = null;
      }
    }

    return false;
  }

  backtrack(0);

  return grid as PlacedTile[][];
}

function removeBorders(tile: string[]): string[] {
  return tile.slice(1, -1).map((row) => row.slice(1, -1));
}

function buildFullImage(grid: PlacedTile[][]): string[] {
  const tileSize = grid[0][0].grid.length - 2;
  const result: string[] = [];

  for (const row of grid) {
    const innerTiles = row.map((t) => removeBorders(t.grid));

    for (let i = 0; i < tileSize; i++) {
      let line = "";
      for (const tile of innerTiles) {
        line += tile[i];
      }
      result.push(line);
    }
  }

  return result;
}

const monster = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   ",
];

const monsterCoords: [number, number][] = [];

for (let r = 0; r < monster.length; r++) {
  for (let c = 0; c < monster[0].length; c++) {
    if (monster[r][c] === "#") {
      monsterCoords.push([r, c]);
    }
  }
}

function countMonsters(image: string[]): number {
  let count = 0;

  for (let r = 0; r < image.length; r++) {
    for (let c = 0; c < image[0].length; c++) {
      if (
        monsterCoords.every(([dr, dc]) => {
          return image[r + dr]?.[c + dc] === "#";
        })
      ) {
        count++;
      }
    }
  }

  return count;
}

export function part2Run(tiles: Tile[]) {
  const assembled = assembleImage(tiles);
  const image = buildFullImage(assembled);

  for (const variant of getAllOrientations(image)) {
    const monsters = countMonsters(variant);

    if (monsters > 0) {
      const totalHashes = variant
        .join("")
        .split("")
        .filter((c) => c === "#").length;
      const monsterHashes = monsterCoords.length * monsters;

      return totalHashes - monsterHashes;
    }
  }

  throw new Error("No monsters found");
}
