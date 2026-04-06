type TileId = number;

export type Tile = {
  id: TileId;
  grid: string[];
};

export function parseTiles(input: string): Tile[] {
  return input.split("\n\n").map((block) => {
    const [header, ...rows] = block.split("\n");
    const id = Number(header.match(/\d+/)![0]);

    return {
      id,
      grid: rows,
    };
  });
}

export function getBorders(tile: Tile): string[] {
  const { grid } = tile;

  const top = grid[0];
  const bottom = grid[grid.length - 1];
  const left = grid.map((row) => row[0]).join("");
  const right = grid.map((row) => row[row.length - 1]).join("");

  return [top, bottom, left, right];
}

function reverse(str: string): string {
  return str.split("").reverse().join("");
}

// normaliza para evitar duplicidade (ex: ABC == CBA)
export function normalizeEdge(edge: string): string {
  const reversed = reverse(edge);
  return edge < reversed ? edge : reversed;
}
