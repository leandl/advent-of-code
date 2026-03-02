export function part2Run(initialState: string, diskLength: number): string {
  let data = new Uint8Array(diskLength);
  let length = initialState.length;

  for (let i = 0; i < initialState.length; i++) {
    data[i] = initialState[i] === "1" ? 1 : 0;
  }

  while (length < diskLength) {
    const currentLength = length;

    if (currentLength >= diskLength) break;

    if (currentLength < diskLength) {
      data[currentLength] = 0;
    }

    for (
      let i = 0;
      i < currentLength && currentLength + 1 + i < diskLength;
      i++
    ) {
      data[currentLength + 1 + i] = data[currentLength - 1 - i] ^ 1;
    }

    length = currentLength * 2 + 1;
  }

  let checksumLength = diskLength;

  while (checksumLength % 2 === 0) {
    for (let i = 0; i < checksumLength; i += 2) {
      data[i / 2] = data[i] === data[i + 1] ? 1 : 0;
    }
    checksumLength /= 2;
  }

  return Array.from(data.slice(0, checksumLength)).join("");
}
