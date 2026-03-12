export function part1Run(steps: number) {
  const buffer: number[] = [0];
  let pos = 0;

  for (let i = 1; i <= 2017; i++) {
    pos = (pos + steps) % buffer.length;
    buffer.splice(pos + 1, 0, i);
    pos = pos + 1;
  }

  const index2017 = buffer.indexOf(2017);
  return buffer[(index2017 + 1) % buffer.length];
}
