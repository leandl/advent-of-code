function computeLength(data: string, start: number, end: number): number {
  let length = 0;
  let i = start;

  while (i < end) {
    if (data[i] === "(") {
      const endMarker = data.indexOf(")", i);
      const marker = data.substring(i + 1, endMarker);
      const [charsStr, repeatStr] = marker.split("x");

      const numChars = parseInt(charsStr, 10);
      const repeat = parseInt(repeatStr, 10);

      const sectionStart = endMarker + 1;
      const sectionEnd = sectionStart + numChars;

      const sectionLength = computeLength(data, sectionStart, sectionEnd);

      length += sectionLength * repeat;

      i = sectionEnd;
    } else {
      length++;
      i++;
    }
  }

  return length;
}

export function part2Run(input: string) {
  const data = input.replace(/\s+/g, "");
  return computeLength(data, 0, data.length);
}
