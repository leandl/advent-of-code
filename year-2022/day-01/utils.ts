export function parseElveCalories(lines: string[]): Array<number[]> {
  const elves = new Array<number[]>();
  let currentElveIndex = 0;

  elves[currentElveIndex] = new Array<number>();

  for (const line of lines) {
    if (line === "") {
      currentElveIndex += 1;
      elves[currentElveIndex] = new Array<number>();
      continue;
    }

    elves[currentElveIndex].push(Number(line));
  }

  return elves;
}
