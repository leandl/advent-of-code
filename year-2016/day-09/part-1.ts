export function part1Run(input: string) {
  const data = input.replace(/\s+/g, "");
  let length = 0;
  let i = 0;

  while (i < data.length) {
    if (data[i] === "(") {
      const endMarker = data.indexOf(")", i);
      const marker = data.substring(i + 1, endMarker);
      const [charsStr, repeatStr] = marker.split("x");

      const numChars = parseInt(charsStr, 10);
      const repeat = parseInt(repeatStr, 10);

      length += numChars * repeat;

      i = endMarker + 1 + numChars;
    } else {
      length++;
      i++;
    }
  }

  return length;
}
