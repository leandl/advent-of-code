import { getMid } from "./utils";

function calcFeetofRibbon(l: number, w: number, h: number) {
  const min = Math.min(l, w, h);
  const mid = getMid(l, w, h);

  return min * 2 + mid * 2;
}

function calcWrapThePresent(l: number, w: number, h: number) {
  return l * w * h;
}

export function part2Run(lines: string[]) {
  let total = 0;
  for (let index = 0; index < lines.length; index++) {
    const size = lines[index];

    const [length, width, height] = size.split("x").map(Number) as [
      number,
      number,
      number
    ];

    total +=
      calcFeetofRibbon(length, width, height) +
      calcWrapThePresent(length, width, height);
  }

  return total;
}
