const PAPER_ROLL = "@";

type Coordinate = {
  x: number;
  y: number;
};

export function canForkliftAccessRoll(matrix: string[], coord: Coordinate) {
  const { x, y } = coord;

  if (matrix[y]?.[x] !== PAPER_ROLL) {
    return false;
  }

  let adjacentRolls = 0;
  for (let dy = -1; dy <= 1; dy++) {
    const ny = y + dy;

    if (ny < 0 || ny >= matrix.length) continue;

    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const nx = x + dx;
      if (nx < 0 || nx >= matrix[ny].length) continue;

      if (matrix[ny][nx] === PAPER_ROLL) {
        adjacentRolls++;

        if (adjacentRolls >= 4) {
          return false;
        }
      }
    }
  }

  return true;
}
