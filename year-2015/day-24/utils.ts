export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export function product(arr: number[]): number {
  return arr.reduce((a, b) => a * b, 1);
}

export function* combinations<T>(arr: T[], k: number): Generator<T[]> {
  const n = arr.length;
  if (k > n || k <= 0) return;

  const indices = Array.from({ length: k }, (_, i) => i);

  while (true) {
    yield indices.map((i) => arr[i]);

    let pos = k - 1;
    while (pos >= 0 && indices[pos] === n - k + pos) pos--;
    if (pos < 0) break;

    indices[pos]++;
    for (let j = pos + 1; j < k; j++) indices[j] = indices[j - 1] + 1;
  }
}

// Subset-sum rápido usando bitset (bitmask em número)
export function canFindSubsetWithSum(
  weights: number[],
  target: number
): boolean {
  let bitset = 1n; // bit 0 set
  for (const w of weights) {
    bitset |= bitset << BigInt(w);
    if ((bitset >> BigInt(target)) & 1n) return true;
  }
  return ((bitset >> BigInt(target)) & 1n) === 1n;
}
