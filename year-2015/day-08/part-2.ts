function addCharString(str: string): string {
  let newStr: string = str.slice(1, -1);

  newStr = newStr
    .replace(/\\"/g, '///"') // \" → ///"
    .replace(/\\x([0-9a-f]{2})/gi, "//x$1") // \xNN → //xNN
    .replace(/\\\\/g, "////"); // \\ → ////

  newStr = `"/"${newStr}/""`;

  return newStr;
}

export function part2Run(lines: string[]) {
  let charRawCount = 0;
  let charAddCharCount = 0;
  for (const line of lines) {
    charRawCount += line.length;
    charAddCharCount += addCharString(line).length;
  }

  return charAddCharCount - charRawCount;
}
