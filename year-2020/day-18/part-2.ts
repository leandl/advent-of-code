function evaluate(expr: string): number {
  let i = 0;

  const skip = () => {
    while (expr[i] === " ") i++;
  };

  const parseFactor = (): number => {
    skip();

    if (expr[i] === "(") {
      i++; // (
      const val = parseExpression();
      skip();
      i++; // )
      return val;
    }

    let start = i;
    while (i < expr.length && /\d/.test(expr[i])) i++;
    return Number(expr.slice(start, i));
  };

  // soma (maior precedência)
  const parseTerm = (): number => {
    let value = parseFactor();

    while (true) {
      skip();
      if (expr[i] !== "+") break;

      i++; // +
      const next = parseFactor();
      value += next;
    }

    return value;
  };

  // multiplicação (menor precedência)
  const parseExpression = (): number => {
    let value = parseTerm();

    while (true) {
      skip();
      if (expr[i] !== "*") break;

      i++; // *
      const next = parseTerm();
      value *= next;
    }

    return value;
  };

  return parseExpression();
}

export function sumHomeworkAdvanced(input: string[]): number {
  return input.reduce((sum, line) => sum + evaluate(line), 0);
}

export function part2Run(lines: string[]) {
  return lines.reduce((sum, line) => sum + evaluate(line), 0);
}
