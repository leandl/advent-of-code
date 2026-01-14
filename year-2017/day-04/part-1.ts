export function part1Run(lines: string[]) {
  let validCount = 0;

  for (const line of lines) {
    const words = line.trim().split(" ");
    const uniqueWords = new Set(words);

    if (words.length === uniqueWords.size) {
      validCount++;
    }
  }

  return validCount;
}
