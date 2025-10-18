export type VarOrNumber = string | `${number}`;

export type OperatorBetweenTwoVarOrNumber = "AND" | "OR" | "LSHIFT" | "RSHIFT";
export type Operation =
  | `${VarOrNumber} ${OperatorBetweenTwoVarOrNumber} ${VarOrNumber}`
  | `NOT ${VarOrNumber}`;

export type VarValue = Operation | `${VarOrNumber}`;

export type Instruction = `${VarValue} -> ${string}`;

export const regexInstruction = /(^.*) -> (.*)/;
export const regexOperationBetweenTwoVarOrNumber = /(^.*) (.*) (.*)/;
export const regexOperationNotVarOrNumber = /^NOT (.*)/;
export const regexNumber = /^\d+$/;

export function parseAssignment(match: RegExpExecArray): [string, VarValue] {
  return [match[2], match[1]];
}

function parseBinaryOperation(
  match: RegExpExecArray
): [VarOrNumber, OperatorBetweenTwoVarOrNumber, VarOrNumber] {
  return [match[1], match[2], match[3]] as [
    VarOrNumber,
    OperatorBetweenTwoVarOrNumber,
    VarOrNumber
  ];
}

function parseUnaryOperation(match: RegExpExecArray): [VarOrNumber] {
  return [match[1]];
}

export function evaluate(
  key: string,
  vars: Map<string, VarValue>,
  cache: Map<string, number> = new Map<string, number>()
): number {
  if (cache.has(key)) return cache.get(key)!;

  // Se for número direto
  if (regexNumber.test(key)) {
    const num = Number(key);
    return num;
  }

  const expr = vars.get(key);
  if (!expr) throw new Error(`Variável ${key} não definida`);

  // Se expressão for um número
  if (regexNumber.test(expr)) {
    const num = Number(expr);
    cache.set(key, num);
    return num;
  }

  // Operações binárias (AND, OR, LSHIFT, RSHIFT)
  const binMatch = regexOperationBetweenTwoVarOrNumber.exec(expr);
  if (binMatch) {
    const [a, op, b] = parseBinaryOperation(binMatch);
    const n1 = evaluate(a, vars, cache);
    const n2 = evaluate(b, vars, cache);

    let result: number;
    switch (op) {
      case "AND":
        result = n1 & n2;
        break;
      case "OR":
        result = n1 | n2;
        break;
      case "LSHIFT":
        result = n1 << n2;
        break;
      case "RSHIFT":
        result = n1 >> n2;
        break;
      default:
        throw new Error(`Operador desconhecido: ${op}`);
    }

    result &= 0xffff;
    cache.set(key, result);
    return result;
  }

  // Operação NOT
  const notMatch = regexOperationNotVarOrNumber.exec(expr);
  if (notMatch) {
    const [a] = parseUnaryOperation(notMatch);
    const val = evaluate(a, vars, cache);
    const result = ~val & 0xffff;
    cache.set(key, result);
    return result;
  }

  // Se for apenas redirecionamento: x -> y
  const result = evaluate(expr, vars, cache) & 0xffff;
  cache.set(key, result);
  return result;
}
