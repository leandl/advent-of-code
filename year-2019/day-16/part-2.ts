export function part2Run(base: number[]): string {
  const offset = Number(base.slice(0, 7).join(""));

  const fullLength = base.length * 10000;

  const size = fullLength - offset;
  const signal = new Array<number>(size);

  for (let i = 0; i < size; i++) {
    signal[i] = base[(offset + i) % base.length];
  }

  for (let phase = 0; phase < 100; phase++) {
    let sum = 0;

    for (let i = size - 1; i >= 0; i--) {
      sum += signal[i];
      signal[i] = sum % 10;
    }
  }

  return signal.slice(0, 8).join("");
}
