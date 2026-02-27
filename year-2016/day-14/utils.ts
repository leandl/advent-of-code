export function findTriple(hash: string): string | null {
  for (let i = 0; i < hash.length - 2; i++) {
    if (hash[i] === hash[i + 1] && hash[i] === hash[i + 2]) {
      return hash[i];
    }
  }
  return null;
}

export function hasFiveInRow(hash: string, char: string): boolean {
  const target = char.repeat(5);
  return hash.includes(target);
}
