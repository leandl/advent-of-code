import { Diretory } from "./utils";

const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_UNUSED_SPACE = 30000000;

function collectDirectorySizes(dir: Diretory, sizes: number[]): number {
  let total = 0;

  for (const child of dir.children.values()) {
    if (child.type === "FILE") {
      total += child.size;
    } else {
      total += collectDirectorySizes(child, sizes);
    }
  }

  sizes.push(total);
  return total;
}

export function part2Run(root: Diretory): number {
  const sizes: number[] = [];

  const usedSpace = collectDirectorySizes(root, sizes);

  const currentUnused = TOTAL_DISK_SPACE - usedSpace;
  const needToFree = REQUIRED_UNUSED_SPACE - currentUnused;

  if (needToFree <= 0) {
    return 0; // já tem espaço suficiente
  }

  // Filtra diretórios que são grandes o suficiente
  const candidates = sizes.filter((size) => size >= needToFree);

  return Math.min(...candidates);
}
