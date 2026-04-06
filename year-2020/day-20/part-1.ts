import { getBorders, normalizeEdge, Tile } from "./utils";

export function part1Run(tiles: Tile[]) {
  const edgeCount = new Map<string, number>();

  // contar todas as bordas
  for (const tile of tiles) {
    for (const edge of getBorders(tile)) {
      const normalized = normalizeEdge(edge);
      edgeCount.set(normalized, (edgeCount.get(normalized) || 0) + 1);
    }
  }

  const cornerTiles: Tile[] = [];

  for (const tile of tiles) {
    let uniqueEdges = 0;

    for (const edge of getBorders(tile)) {
      const normalized = normalizeEdge(edge);

      if (edgeCount.get(normalized) === 1) {
        uniqueEdges++;
      }
    }

    if (uniqueEdges === 2) {
      cornerTiles.push(tile);
    }
  }

  return cornerTiles.reduce((acc, tile) => acc * tile.id, 1);
}
