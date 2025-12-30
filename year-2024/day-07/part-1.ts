import { evaluateEquation, Operator, parseInputPuzzle, Test } from "./utils";

function generateOperatorCombinations(length: number): Operator[][] {
  const combinations: Operator[][] = [];
  const total = 1 << length; // 2^(length)

  for (let mask = 0; mask < total; mask++) {
    const ops: Operator[] = [];

    for (let i = 0; i < length; i++) {
      ops.push(mask & (1 << i) ? Operator.MULTIPLICATION : Operator.PLUS);
    }

    combinations.push(ops);
  }

  return combinations;
}

function canProduceTarget(test: Test): boolean {
  const { target, numbers } = test;
  const operatorCount = numbers.length - 1;

  const combinations = generateOperatorCombinations(operatorCount);

  for (const ops of combinations) {
    if (evaluateEquation(numbers, ops) === target) {
      return true;
    }
  }

  return false;
}

export function part1Run(lines: string[]): number {
  const tests = parseInputPuzzle(lines);
  let sum = 0;

  for (const test of tests) {
    if (canProduceTarget(test)) {
      sum += test.target;
    }
  }

  return sum;
}
