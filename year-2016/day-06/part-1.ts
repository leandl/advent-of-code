export function part1Run(lines: string[]) {
  const length = lines[0].length;
  let result = "";

  for (let i = 0; i < length; i++) {
    const frequency: Record<string, number> = {};

    for (const line of lines) {
      const char = line[i];
      frequency[char] = (frequency[char] ?? 0) + 1;
    }

    // encontra o caractere mais frequente
    let maxChar = "";
    let maxCount = 0;

    for (const char in frequency) {
      if (frequency[char] > maxCount) {
        maxCount = frequency[char];
        maxChar = char;
      }
    }

    result += maxChar;
  }

  return result;
}
