function blink(stones: string[]): string[] {
  const result: string[] = [];

  for (const stone of stones) {
    if (stone === "0") {
      result.push("1");
      continue;
    }

    if (stone.length % 2 === 0) {
      const mid = stone.length / 2;

      let left = stone.slice(0, mid);
      let right = stone.slice(mid);

      // remove leading zeros
      left = String(Number(left));
      right = String(Number(right));

      result.push(left, right);
      continue;
    }

    // multiply by 2024 (usar BigInt)
    const multiplied = (BigInt(stone) * 2024n).toString();
    result.push(multiplied);
  }

  return result;
}

export function part1Run(stones: string[]) {
  const blinks = 25;

  for (let i = 0; i < blinks; i++) {
    stones = blink(stones);
  }

  return stones.length;
}
