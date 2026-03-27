const BASE_PATTERN = [0, 1, 0, -1];

function buildPattern(position: number, length: number): number[] {
  const pattern: number[] = [];

  while (pattern.length <= length) {
    for (const val of BASE_PATTERN) {
      for (let i = 0; i < position; i++) {
        pattern.push(val);
      }
    }
  }

  pattern.shift(); // remove primeiro elemento
  return pattern.slice(0, length);
}

function applyPhase(input: number[]): number[] {
  const output: number[] = new Array(input.length);

  for (let i = 0; i < input.length; i++) {
    const pattern = buildPattern(i + 1, input.length);

    let sum = 0;
    for (let j = 0; j < input.length; j++) {
      sum += input[j] * pattern[j];
    }

    output[i] = Math.abs(sum) % 10;
  }

  return output;
}
export function part1Run(signal: number[]) {
  for (let phase = 0; phase < 100; phase++) {
    signal = applyPhase(signal);
  }

  return signal.slice(0, 8).join("");
}
