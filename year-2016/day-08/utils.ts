export const WIDTH = 50;
export const HEIGHT = 6;

type Screen = boolean[][];

export function createScreen(): Screen {
  return Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => false)
  );
}

function rect(screen: Screen, w: number, h: number) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      screen[y][x] = true;
    }
  }
}

function rotateRow(screen: Screen, y: number, by: number) {
  const original = [...screen[y]];

  for (let x = 0; x < WIDTH; x++) {
    screen[y][(x + by) % WIDTH] = original[x];
  }
}

function rotateColumn(screen: Screen, x: number, by: number) {
  const original = screen.map((row) => row[x]);

  for (let y = 0; y < HEIGHT; y++) {
    screen[(y + by) % HEIGHT][x] = original[y];
  }
}

export function applyInstruction(screen: Screen, line: string) {
  let match;

  match = line.match(/^rect (\d+)x(\d+)$/);
  if (match) {
    rect(screen, Number(match[1]), Number(match[2]));
    return;
  }

  match = line.match(/^rotate row y=(\d+) by (\d+)$/);
  if (match) {
    rotateRow(screen, Number(match[1]), Number(match[2]));
    return;
  }

  match = line.match(/^rotate column x=(\d+) by (\d+)$/);
  if (match) {
    rotateColumn(screen, Number(match[1]), Number(match[2]));
  }
}
