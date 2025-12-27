const regexMul = /mul\((\d+),(\d+)\)/gm;
const regexMulWithEnable = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/gm;

export function parseMul(content: string): [number, number][] {
  return [...content.matchAll(regexMul)].map((match) => [
    Number(match[1]),
    Number(match[2]),
  ]);
}

export function parseMulWithEnable(content: string): [number, number][] {
  const result = new Array<[number, number]>();
  let enabled = true;

  for (const match of content.matchAll(regexMulWithEnable)) {
    if (match[0] === "do()") {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      result.push([Number(match[1]), Number(match[2])]);
    }
  }

  return result;
}
