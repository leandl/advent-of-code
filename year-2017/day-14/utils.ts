export function knotHash(input: string): string {
  const lengths = [...input]
    .map((c) => c.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);

  const list = Array.from({ length: 256 }, (_, i) => i);
  let pos = 0;
  let skip = 0;

  const reverse = (start: number, length: number) => {
    for (let i = 0; i < length / 2; i++) {
      const a = (start + i) % list.length;
      const b = (start + length - 1 - i) % list.length;
      [list[a], list[b]] = [list[b], list[a]];
    }
  };

  for (let round = 0; round < 64; round++) {
    for (const length of lengths) {
      reverse(pos, length);
      pos = (pos + length + skip) % list.length;
      skip++;
    }
  }

  const dense: number[] = [];

  for (let i = 0; i < 16; i++) {
    let xor = list[i * 16];
    for (let j = 1; j < 16; j++) {
      xor ^= list[i * 16 + j];
    }
    dense.push(xor);
  }

  return dense.map((n) => n.toString(16).padStart(2, "0")).join("");
}
