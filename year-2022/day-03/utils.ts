export function getPriority(char: string): number {
  const code = char.charCodeAt(0);

  if (code >= 97 && code <= 122) {
    return code - 96; // a-z -> 1-26
  }

  if (code >= 65 && code <= 90) {
    return code - 64 + 26; // A-Z -> 27-52
  }

  throw new Error(`Invalid item type: ${char}`);
}
