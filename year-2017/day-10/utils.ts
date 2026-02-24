const LIST_SIZE = 256;

export function knot(lengths: number[], rounds: number = 1): number[] {
  const list = Array.from({ length: LIST_SIZE }, (_, i) => i);

  let currentPosition = 0;
  let skipSize = 0;

  for (let round = 0; round < rounds; round++) {
    for (const length of lengths) {
      for (let offset = 0; offset < Math.floor(length / 2); offset++) {
        const a = (currentPosition + offset) % LIST_SIZE;
        const b = (currentPosition + length - offset - 1) % LIST_SIZE;

        [list[a], list[b]] = [list[b], list[a]];
      }

      currentPosition += length + skipSize;
      skipSize++;
    }
  }

  return list;
}
