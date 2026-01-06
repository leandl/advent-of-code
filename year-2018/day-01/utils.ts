export enum Operator {
  PLUS = "+",
  LESS = "-",
}

type Frequency = [Operator, number];

function parseFrequency(line: string): Frequency {
  return [line[0] as Operator, Number(line.slice(1))];
}

export function parseFrequencies(lines: string[]) {
  return lines.map(parseFrequency);
}
