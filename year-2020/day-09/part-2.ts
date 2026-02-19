import { findFirstInvalidNumber, XmasEncodingParams } from "./utils";

export function part2Run({ numbers, preambleLength }: XmasEncodingParams) {
  const invalidNumber = findFirstInvalidNumber({ numbers, preambleLength });

  if (invalidNumber === null) {
    return null;
  }

  let start = 0;
  let sum = 0;

  for (let end = 0; end < numbers.length; end++) {
    sum += numbers[end];

    while (sum > invalidNumber && start < end) {
      sum -= numbers[start];
      start++;
    }

    if (sum === invalidNumber && end - start >= 1) {
      const range = numbers.slice(start, end + 1);
      const min = Math.min(...range);
      const max = Math.max(...range);
      return min + max;
    }
  }

  return null;
}
