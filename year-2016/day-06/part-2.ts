export function part2Run(lines: string[]) {
  const length = lines[0].length;
  let result = "";

  for (let i = 0; i < length; i++) {
    const frequency: Record<string, number> = {};

    for (const line of lines) {
      const char = line[i];
      frequency[char] = (frequency[char] ?? 0) + 1;
    }

    // encontra o caractere menos frequente
    let minChar = "";
    let minCount = Infinity;

    for (const char in frequency) {
      if (frequency[char] < minCount) {
        minCount = frequency[char];
        minChar = char;
      }
    }

    result += minChar;
  }

  return result;
}
