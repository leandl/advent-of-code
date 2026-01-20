import { convertBinaryStringToNumber } from "./utils";

function getRating(lines: string[], criteria: "oxygen" | "co2"): string {
  let remaining = [...lines];
  let bitIndex = 0;

  while (remaining.length > 1) {
    let ones = 0;

    for (const line of remaining) {
      if (line[bitIndex] === "1") ones++;
    }

    const zeros = remaining.length - ones;

    let bitToKeep: string;

    if (criteria === "oxygen") {
      bitToKeep = ones >= zeros ? "1" : "0";
    } else {
      bitToKeep = zeros <= ones ? "0" : "1";
    }

    remaining = remaining.filter((line) => line[bitIndex] === bitToKeep);

    bitIndex++;
  }

  return remaining[0];
}

export function part2Run(lines: string[]) {
  const oxygenBinary = getRating(lines, "oxygen");
  const co2Binary = getRating(lines, "co2");

  const oxygen = convertBinaryStringToNumber(oxygenBinary);
  const co2 = convertBinaryStringToNumber(co2Binary);

  return oxygen * co2;
}
