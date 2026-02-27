export type Point = {
  x: number;
  y: number;
  steps: number;
};

export type RunParams = {
  favoriteNumber: number;
  target: {
    x: number;
    y: number;
  };
};

function countBits(n: number): number {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

export function isOpen(favoriteNumber: number, x: number, y: number): boolean {
  if (x < 0 || y < 0) return false;

  const value = x * x + 3 * x + 2 * x * y + y + y * y + favoriteNumber;

  return countBits(value) % 2 === 0;
}
