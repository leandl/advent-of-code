export type XmasEncodingParams = {
  numbers: number[];
  preambleLength: number;
};

function hasTwoSum(arr: number[], target: number): boolean {
  const seen = new Set<number>();

  for (const num of arr) {
    const complement = target - num;

    if (seen.has(complement) && complement !== num) {
      return true;
    }

    seen.add(num);
  }

  return false;
}

export function findFirstInvalidNumber({
  numbers,
  preambleLength,
}: XmasEncodingParams): number | null {
  for (let i = preambleLength; i < numbers.length; i++) {
    const current = numbers[i];
    const previous = numbers.slice(i - preambleLength, i);

    if (!hasTwoSum(previous, current)) {
      return current;
    }
  }

  return null;
}
