export function isDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}

export function isSymbol(char: string): boolean {
  return !isDigit(char) && char !== ".";
}
