import { convertBinaryStringToNumber } from "./utils";

export function part1Run(lines: string[]) {
  const bitLength = lines[0].length;
  const count = Array(bitLength).fill(0);

  for (const line of lines) {
    for (let i = 0; i < bitLength; i++) {
      if (line[i] === "1") count[i]++;
    }
  }

  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < bitLength; i++) {
    if (count[i] > lines.length / 2) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  return (
    convertBinaryStringToNumber(gamma) * convertBinaryStringToNumber(epsilon)
  );
}
