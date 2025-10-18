function hasLetterRepeatingWithOneBetween(word: string): boolean {
  const lengthWithioutLastItem = word.length - 1;
  for (let index = 0; index < lengthWithioutLastItem; index++) {
    const char = word[index];
    const next2positionChar = word[index + 2];

    if (char === next2positionChar) {
      return true;
    }
  }

  return false;
}

function hasRepeatedLetterPairs(word: string): boolean {
  const wordLower = word.toLowerCase();
  const lengthWithioutLastItem = wordLower.length - 1;
  for (let index = 0; index < lengthWithioutLastItem; index++) {
    const char = wordLower[index];
    const nextChar = wordLower[index + 1];
    const sequence = `${char}${nextChar}`;

    for (
      let subIndex = index + 2;
      subIndex < lengthWithioutLastItem;
      subIndex++
    ) {
      const subChar = wordLower[subIndex];
      const nextSubChar = wordLower[subIndex + 1];
      const subSequence = `${subChar}${nextSubChar}`;

      if (sequence === subSequence) {
        return true;
      }
    }
  }

  return false;
}

export function part2Run(lines: string[]) {
  let goods = 0;

  for (const word of lines) {
    goods +=
      hasLetterRepeatingWithOneBetween(word) && hasRepeatedLetterPairs(word)
        ? 1
        : 0;
  }

  return goods;
}
