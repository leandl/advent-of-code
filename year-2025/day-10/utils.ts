type Instruction = {
  indicatorPattern: boolean[]; // Ex: [false, true, true, false]
  buttonToggleGroups: number[][]; // Ex: [[3], [1,3], [2], ...]
  joltageValues: number[]; // Ex: [3, 5, 4, 7]
};

function parseInstruction(line: string): Instruction {
  // Extrai o padrão entre colchetes
  const indicatorMatch = line.match(/\[([.#]+)\]/);
  if (!indicatorMatch) {
    throw new Error("Formato inválido: padrão de luzes não encontrado");
  }

  // Converte . e # para booleanos
  const indicatorPattern = indicatorMatch[1].split("").map((ch) => ch === "#");

  // Extrai todos os grupos entre parênteses: botões e seus toggles
  const buttonMatches = [...line.matchAll(/\(([\d,]+)\)/g)];
  const buttonToggleGroups = buttonMatches.map((match) =>
    match[1].split(",").map((n) => Number(n))
  );

  // Extrai os valores entre chaves (joltage)
  const joltageMatch = line.match(/\{([\d,]+)\}/);
  if (!joltageMatch) {
    throw new Error("Formato inválido: valores de voltagem não encontrados");
  }
  const joltageValues = joltageMatch[1].split(",").map(Number);

  return {
    indicatorPattern,
    buttonToggleGroups,
    joltageValues,
  };
}

export function parseInstructions(lines: string[]): Instruction[] {
  return lines.map(parseInstruction);
}
