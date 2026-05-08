function hash(str: string): number {
  let value = 0;

  for (let i = 0; i < str.length; i++) {
    value += str.charCodeAt(i);
    value *= 17;
    value %= 256;
  }

  return value;
}

export function part1Run(input: string) {
  const steps = input.replace(/\n/g, "").split(",");

  let sum = 0;

  for (const step of steps) {
    sum += hash(step);
  }

  return sum;
}
