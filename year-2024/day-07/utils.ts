export enum Operator {
  PLUS = "+",
  MULTIPLICATION = "*",
  CONCATENATION = "||",
}

export type Test = {
  target: number;
  numbers: number[];
};

export function parseInputPuzzle(lines: string[]): Test[] {
  return lines.map((line) => {
    const [left, right] = line.split(":");
    const target = Number(left.trim());
    const numbers = right.trim().split(" ").map(Number);

    return {
      target,
      numbers,
    };
  });
}

export function evaluateEquation(
  numbers: number[],
  operators: Operator[]
): number {
  let result = numbers[0];

  for (let i = 0; i < operators.length; i++) {
    const next = numbers[i + 1];

    switch (operators[i]) {
      case Operator.PLUS:
        result += next;
        break;

      case Operator.MULTIPLICATION:
        result *= next;
        break;

      case Operator.CONCATENATION:
        result = Number(`${result}${next}`);
        break;
    }
  }

  return result;
}
