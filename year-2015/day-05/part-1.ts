export function part1Run(lines: string[]) {
  function hasAtLeastThreeVowels(word: string): boolean {
    const vowels = "aeiou";
    let countVowels = 0;

    for (const char of word) {
      if (!vowels.includes(char)) {
        continue;
      }

      countVowels += 1;
      if (countVowels >= 3) {
        return true;
      }
    }

    return false;
  }

  function hasConsecutiveDuplicateLetters(word: string): boolean {
    const lengthWithioutLastItem = word.length - 1;
    for (let index = 0; index < lengthWithioutLastItem; index++) {
      const char = word[index];
      const nextChar = word[index + 1];

      if (char === nextChar) {
        return true;
      }
    }

    return false;
  }

  const invalidConsecutiveAlphabetPair = new Set(["ab", "cd", "pq", "xy"]);

  function hasInvalidConsecutiveAlphabetPair(word: string): boolean {
    const wordLower = word.toLowerCase();
    const lengthWithioutLastItem = wordLower.length - 1;
    for (let index = 0; index < lengthWithioutLastItem; index++) {
      const char = wordLower[index];
      const nextChar = wordLower[index + 1];

      const charPair = `${char}${nextChar}`;

      if (invalidConsecutiveAlphabetPair.has(charPair)) {
        return true;
      }
    }

    return false;
  }

  let goods = 0;

  for (const word of lines) {
    goods +=
      hasAtLeastThreeVowels(word) &&
      hasConsecutiveDuplicateLetters(word) &&
      !hasInvalidConsecutiveAlphabetPair(word)
        ? 1
        : 0;
  }

  return goods;
}
