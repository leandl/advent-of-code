export function part2Run(stones: string[]) {
  const blinks = 75;
  const memo = new Map<string, number>();

  function count(stone: string, steps: number): number {
    const key = `${stone}|${steps}`;
    if (memo.has(key)) return memo.get(key)!;

    if (steps === 0) return 1;

    let result: number;

    if (stone === "0") {
      result = count("1", steps - 1);
    } else if (stone.length % 2 === 0) {
      const mid = stone.length / 2;

      let left = stone.slice(0, mid);
      let right = stone.slice(mid);

      left = String(Number(left));
      right = String(Number(right));

      result = count(left, steps - 1) + count(right, steps - 1);
    } else {
      const next = (BigInt(stone) * 2024n).toString();
      result = count(next, steps - 1);
    }

    memo.set(key, result);
    return result;
  }

  let total = 0;

  for (const stone of stones) {
    total += count(stone, blinks);
  }

  return total;
}
