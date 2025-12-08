import { BEAM, EMPTY_CELL, findBeamSource, Position, SPLITTER } from "./utils";

function propagateBeam(
  grid: Array<string[]>,
  position: Position
): Array<string[]> {
  const { x, y } = position;

  // Limites do grid
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
    return grid;
  }

  // Apenas propaga pelo espaço vazio
  if (grid[y][x] !== EMPTY_CELL) {
    return grid;
  }

  for (let row = y; row < grid.length; row++) {
    const cell = grid[row][x];

    if (cell === BEAM) break;

    if (cell === SPLITTER) {
      propagateBeam(grid, { y: row, x: x - 1 });
      propagateBeam(grid, { y: row, x: x + 1 });
      break;
    }

    grid[row][x] = BEAM;
  }

  return grid;
}

export function part1Run(lines: string[]): number {
  const grid = lines.map((line) => Array.from(line));
  const sourcePosition = findBeamSource(grid);

  const finalGrid = propagateBeam(grid, sourcePosition);
  let splitCount = 0;

  for (let y = 1; y < finalGrid.length; y++) {
    for (let x = 0; x < finalGrid[y].length; x++) {
      const cell = finalGrid[y][x];

      if (cell !== SPLITTER) continue;

      // Se uma linha de feixe chega por cima, houve split
      if (finalGrid[y - 1][x] === BEAM) {
        splitCount++;
      }
    }
  }

  return splitCount;
}
