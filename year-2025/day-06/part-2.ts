import { parseCephalopodColumnOperations, Operator } from "./utils";

export function part2Run(lines: string[]): number {
  const operations = parseCephalopodColumnOperations(lines);
  let totalSum = 0;

  for (const operation of operations) {
    const lastIndex = operation.length - 1;
    const operator = operation[lastIndex] as Operator;
    const operands = operation.slice(0, lastIndex) as number[];

    let result = operands[0];
    for (let i = 1; i < operands.length; i++) {
      const value = operands[i];
      result = operator === "+" ? result + value : result * value;
    }

    totalSum += result;
  }

  return totalSum;
}
