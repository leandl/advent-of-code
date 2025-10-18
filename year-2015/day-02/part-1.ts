import { getMid } from "./utils";

function calcSmallestSide(l: number, w: number, h: number) {
  const min = Math.min(l, w, h);
  const mid = getMid(l, w, h);
  return min * mid;
}

function calcAreaRectPrism(l: number, w: number, h: number) {
  return 2 * l * w + 2 * w * h + 2 * h * l;
}

export function part1Run(lines: string[]) {
  let total = 0;
  for (let index = 0; index < lines.length; index++) {
    const size = lines[index];

    const [length, width, height] = size.split("x").map(Number) as [
      number,
      number,
      number
    ];

    total +=
      calcAreaRectPrism(length, width, height) +
      calcSmallestSide(length, width, height);
  }

  return total;
}
