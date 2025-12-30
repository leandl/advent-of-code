import { evaluateEquation, parseInputPuzzle, Operator, Test } from "./utils";

function generateOperatorCombinations(length: number): Operator[][] {
  const combinations: Operator[][] = [];
  const operators: Operator[] = [
    Operator.PLUS,
    Operator.MULTIPLICATION,
    Operator.CONCATENATION,
  ];

  function backtrack(current: Operator[]) {
    if (current.length === length) {
      combinations.push([...current]);
      return;
    }

    for (const op of operators) {
      current.push(op);
      backtrack(current);
      current.pop();
    }
  }

  backtrack([]);
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

export function part2Run(lines: string[]): number {
  const tests = parseInputPuzzle(lines);
  let sum = 0;

  for (const test of tests) {
    if (canProduceTarget(test)) {
      sum += test.target;
    }
  }

  return sum;
}
