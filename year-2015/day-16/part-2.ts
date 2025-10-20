import { AuntSue, DataAuntSue, parseAuntSue, regexAuntSue } from "./utils";

const dataRealAuntSue: DataAuntSue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function isValidDataAuntSue(auntSue: AuntSue): boolean {
  for (const datakey in auntSue.data) {
    const dataValue = auntSue.data[datakey as keyof DataAuntSue]!;
    const realDataValue = dataRealAuntSue[datakey as keyof DataAuntSue];

    if (datakey === "cats" || datakey == "trees") {
      if (realDataValue >= dataValue) {
        return false;
      }
    } else if (datakey === "pomeranians" || datakey == "goldfish") {
      if (realDataValue <= dataValue) {
        return false;
      }
    } else {
      if (realDataValue !== dataValue) {
        return false;
      }
    }
  }

  return true;
}

export function part2Run(lines: string[]) {
  const auntSues = new Array<AuntSue>();
  for (const line of lines) {
    const match = regexAuntSue.exec(line);
    if (match) {
      const auntSue = parseAuntSue(match);
      auntSues.push(auntSue);
    }
  }

  for (const auntSue of auntSues) {
    if (isValidDataAuntSue(auntSue)) {
      return auntSue.name;
    }
  }
}
