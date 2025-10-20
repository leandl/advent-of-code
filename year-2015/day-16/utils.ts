// Sue 5: goldfish: 1, trees: 3, perfumes: 10
export const regexAuntSue = /(^.*): (.*): (.*), (.*): (.*), (.*): (.*)/;

export type DataAuntSue = {
  children: number;
  cats: number;
  samoyeds: number;
  pomeranians: number;
  akitas: number;
  vizslas: number;
  goldfish: number;
  trees: number;
  cars: number;
  perfumes: number;
};

export type AuntSue = {
  name: string;
  data: Partial<DataAuntSue>;
};

export function parseAuntSue(match: RegExpExecArray): AuntSue {
  return {
    name: match[1],
    data: {
      [match[2]]: Number(match[3]),
      [match[4]]: Number(match[5]),
      [match[6]]: Number(match[7]),
    },
  } as AuntSue;
}
