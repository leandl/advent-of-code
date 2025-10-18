function cleanString(str: string): string {
  let newStr: string = str.slice(1, -1);

  newStr = newStr
    .replace(/\\"/g, '"') // \" → "
    .replace(/\\x[0-9a-f]{2}/gi, "_") // \xNN → 1 caractere
    .replace(/\\\\/g, "\\"); // \\ → \

  return newStr;
}

export function part1Run(lines: string[]) {
  let charRawCount = 0;
  let charCleanCount = 0;
  for (const line of lines) {
    charRawCount += line.length;
    charCleanCount += cleanString(line).length;
  }

  return charRawCount - charCleanCount;
}
