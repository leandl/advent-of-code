export type Instruction = {
  target: string;
  operation: "inc" | "dec";
  amount: number;
  conditionRegister: string;
  conditionOperator: string;
  conditionValue: number;
};

export function parseInstructions(lines: string[]): Instruction[] {
  return lines.map((line) => {
    const [
      target,
      operation,
      amount,
      ,
      conditionRegister,
      conditionOperator,
      conditionValue,
    ] = line.split(" ");

    return {
      target,
      operation: operation as "inc" | "dec",
      amount: Number(amount),
      conditionRegister,
      conditionOperator,
      conditionValue: Number(conditionValue),
    };
  });
}

export function evaluateCondition(
  left: number,
  operator: string,
  right: number
): boolean {
  switch (operator) {
    case ">":
      return left > right;
    case "<":
      return left < right;
    case ">=":
      return left >= right;
    case "<=":
      return left <= right;
    case "==":
      return left === right;
    case "!=":
      return left !== right;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
