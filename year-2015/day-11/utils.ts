const FORBIDEN_CHARS = ["i", "o", "l"];

function hasForbiddenChars(str: string): boolean {
  for (const char of str) {
    if (FORBIDEN_CHARS.includes(char)) {
      return true;
    }
  }

  return false;
}

function hasThreeConsecutiveCharacters(str: string): boolean {
  const lastCheckIndex = str.length - 2;
  for (let index = 0; index < lastCheckIndex; index++) {
    const charCode1 = str[index].charCodeAt(0);
    const charCode2 = str[index + 1].charCodeAt(0);
    const charCode3 = str[index + 2].charCodeAt(0);

    if (charCode2 - charCode1 === 1 && charCode3 - charCode2 === 1) {
      return true;
    }
  }

  return false;
}

function hasDoubleConsecutiveDuplicateLetters(word: string): boolean {
  const lengthWithioutLastItem = word.length - 1;
  const consecutiveDuplicateLetters: string[] = [];

  for (let index = 0; index < lengthWithioutLastItem; index++) {
    const char = word[index];
    const nextChar = word[index + 1];

    if (char === nextChar && !consecutiveDuplicateLetters.includes(char)) {
      consecutiveDuplicateLetters.push(char);
      index += 1;
      if (consecutiveDuplicateLetters.length === 2) {
        return true;
      }
    }
  }

  return false;
}

function validPassword(str: string): boolean {
  return (
    !hasForbiddenChars(str) &&
    hasThreeConsecutiveCharacters(str) &&
    hasDoubleConsecutiveDuplicateLetters(str)
  );
}

function getNextChar(char: string): string {
  const charCode = char.charCodeAt(0);
  const nextCharCode = charCode + 1;
  const nextChar = String.fromCharCode(nextCharCode);
  return nextChar;
}

function incrementPassword(str: string): string {
  const arrayString = str.split("");
  for (let index = arrayString.length - 1; index >= 0; index--) {
    const char = arrayString[index];
    if (char === "z") {
      arrayString[index] = "a";
      continue;
    }

    let nextChar = getNextChar(char);

    if (FORBIDEN_CHARS.includes(nextChar)) {
      nextChar = getNextChar(char);
    }

    arrayString[index] = nextChar;
    break;
  }

  return arrayString.join("");
}

export function generateNewPassword(str: string): string {
  let input = str;
  do {
    input = incrementPassword(input);
    if (validPassword(input)) {
      return input;
    }
  } while (true);
}
