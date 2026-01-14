type Point = `${number},${number}`;

export function part2Run(limit: number) {
  const grid = new Map<Point, number>();

  const directions = [
    [1, 0], // direita
    [0, 1], // cima
    [-1, 0], // esquerda
    [0, -1], // baixo
  ];

  const neighbors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  let x = 0;
  let y = 0;
  grid.set("0,0", 1);

  let stepSize = 1;
  let dirIndex = 0;

  while (true) {
    for (let i = 0; i < 2; i++) {
      const [dx, dy] = directions[dirIndex % 4];

      for (let step = 0; step < stepSize; step++) {
        x += dx;
        y += dy;

        let sum = 0;
        for (const [nx, ny] of neighbors) {
          sum += grid.get(`${x + nx},${y + ny}` as Point) ?? 0;
        }

        if (sum > limit) {
          return sum;
        }

        grid.set(`${x},${y}`, sum);
      }

      dirIndex++;
    }

    stepSize++;
  }
}
