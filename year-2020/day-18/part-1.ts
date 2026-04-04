function evaluate(expr: string): number {
  let i = 0;

  const parse = (): number => {
    let value = 0;
    let op: "+" | "*" = "+";

    while (i < expr.length) {
      const ch = expr[i];

      if (ch === " ") {
        i++;
        continue;
      }

      let num: number;

      if (ch === "(") {
        i++; // pula '('
        num = parse(); // resolve sub-expressão
      } else if (ch === ")") {
        i++; // fecha e retorna
        return value;
      } else if (ch === "+" || ch === "*") {
        op = ch;
        i++;
        continue;
      } else {
        // número
        let start = i;
        while (i < expr.length && /\d/.test(expr[i])) i++;
        num = Number(expr.slice(start, i));
      }

      // aplica operação imediatamente (left-to-right)
      if (op === "+") {
        value += num;
      } else {
        value *= num;
      }
    }

    return value;
  };

  return parse();
}

export function part1Run(lines: string[]) {
  return lines.reduce((sum, line) => sum + evaluate(line), 0);
}
