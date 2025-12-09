import { calcArea, parsePoints, Point } from "./utils";

type EdgeBoundingBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

/**
 * Constrói caixas delimitadoras (AABBs) para cada segmento do perímetro.
 */
function buildEdgeBoundingBoxes(vertices: Point[]): EdgeBoundingBox[] {
  const edgeBoxes: EdgeBoundingBox[] = [];
  const count = vertices.length;
  if (count === 0) return edgeBoxes;

  for (let i = 0; i < count - 1; i++) {
    const a = vertices[i];
    const b = vertices[i + 1];
    edgeBoxes.push({
      minX: Math.min(a.x, b.x),
      minY: Math.min(a.y, b.y),
      maxX: Math.max(a.x, b.x),
      maxY: Math.max(a.y, b.y),
    });
  }

  // último → primeiro (fecha o polígono)
  const last = vertices[count - 1];
  const first = vertices[0];
  edgeBoxes.push({
    minX: Math.min(last.x, first.x),
    minY: Math.min(last.y, first.y),
    maxX: Math.max(last.x, first.x),
    maxY: Math.max(last.y, first.y),
  });

  return edgeBoxes;
}

/**
 * Verifica se um retângulo está totalmente fora de todos os segmentos
 * do perímetro do polígono.
 */
function rectangleIsClearOfEdges(
  edgeBoxes: EdgeBoundingBox[],
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): boolean {
  for (const edge of edgeBoxes) {
    // Se houver interseção, o retângulo não está completamente livre
    const intersects =
      minX < edge.maxX &&
      maxX > edge.minX &&
      minY < edge.maxY &&
      maxY > edge.minY;

    if (intersects) {
      return false;
    }
  }
  return true;
}

export function part2Run(lines: string[]): number {
  const vertices = parsePoints(lines);
  const vertexCount = vertices.length;

  const edgeBoxes = buildEdgeBoundingBoxes(vertices);

  let maxArea = 0;

  for (let i = 0; i < vertexCount; i++) {
    const pA = vertices[i];

    for (let j = i + 1; j < vertexCount; j++) {
      const pB = vertices[j];

      const area = calcArea(pA, pB);

      if (area <= maxArea) continue;

      // se é vertical ou horizontal, já é válido
      if (pA.x === pB.x || pA.y === pB.y) {
        maxArea = area;
        continue;
      }

      const minX = Math.min(pA.x, pB.x);
      const minY = Math.min(pA.y, pB.y);
      const maxX = Math.max(pA.x, pB.x);
      const maxY = Math.max(pA.y, pB.y);

      if (rectangleIsClearOfEdges(edgeBoxes, minX, minY, maxX, maxY)) {
        maxArea = area;
      }
    }
  }

  return maxArea;
}
