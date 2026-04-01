export function permutations(arr: number[]): number[][] {
  if (arr.length === 0) return [[]];

  return arr.flatMap((value, index) => {
    const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];
    return permutations(rest).map((p) => [value, ...p]);
  });
}
