export function hotSprings(lines: string[], unfold = false): number {
  let total = 0;

  for (const line of lines) {
    let [pattern, nums] = line.split(" ");
    let groups = nums.split(",").map(Number);

    if (unfold) {
      pattern = Array(5).fill(pattern).join("?");
      groups = Array(5).fill(groups).flat();
    }

    const memo = new Map<string, number>();

    function dp(i: number, g: number, run: number): number {
      const key = `${i},${g},${run}`;
      if (memo.has(key)) return memo.get(key)!;

      // fim da string
      if (i === pattern.length) {
        if (run > 0) {
          if (g < groups.length && run === groups[g]) {
            g++;
          } else {
            return 0;
          }
        }
        return g === groups.length ? 1 : 0;
      }

      let ways = 0;
      const char = pattern[i];

      // tratar como '.'
      if (char === "." || char === "?") {
        if (run > 0) {
          if (g < groups.length && run === groups[g]) {
            ways += dp(i + 1, g + 1, 0);
          }
        } else {
          ways += dp(i + 1, g, 0);
        }
      }

      // tratar como '#'
      if (char === "#" || char === "?") {
        ways += dp(i + 1, g, run + 1);
      }

      memo.set(key, ways);
      return ways;
    }

    total += dp(0, 0, 0);
  }

  return total;
}
