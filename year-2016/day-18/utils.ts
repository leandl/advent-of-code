export function countSafeTiles(input: string, totalRows = 40): number {
  let currentRow = input.trim();
  const width = currentRow.length;

  let safeCount = 0;

  safeCount += countSafe(currentRow);

  for (let row = 1; row < totalRows; row++) {
    let nextRow = "";

    for (let i = 0; i < width; i++) {
      const left = i > 0 ? currentRow[i - 1] : ".";
      const right = i < width - 1 ? currentRow[i + 1] : ".";

      nextRow += left !== right ? "^" : ".";
    }

    safeCount += countSafe(nextRow);
    currentRow = nextRow;
  }

  return safeCount;
}

function countSafe(row: string): number {
  let count = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === ".") count++;
  }
  return count;
}
