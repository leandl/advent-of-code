export function countTrees(map: string[], right: number, down: number): number {
  let treeCount = 0;
  let x = 0;
  let y = 0;

  const width = map[0].length;

  while (y < map.length) {
    if (map[y][x % width] === "#") {
      treeCount++;
    }

    x += right;
    y += down;
  }

  return treeCount;
}
