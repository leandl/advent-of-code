import { createHash } from "crypto";

export function updateData<T extends Record<string, any>>(
  data: T,
  newData: Partial<T>,
): T {
  return {
    ...data,
    ...newData,
  };
}

export function* getCombinations<T>(arr: T[], k: number): Generator<T[]> {
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

export function md5(input: string): string {
  return createHash("md5").update(input).digest("hex");
}

export function pipe<A, B>(ab: (a: A) => B): (a: A) => B;
export function pipe<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C;
export function pipe<A, B, C, D>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
): (a: A) => D;
export function pipe(...fns: Function[]) {
  return (value: any) => fns.reduce((acc, fn) => fn(acc), value);
}

export function memo<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}
