export type Operator = "*" | "+";

export type Operation = [...number[], Operator];

export function parseVerticalOperations(linesRaw: string[]): Operation[] {
  const parsedRows: string[][] = [];

  for (const line of linesRaw) {
    const cells = line.split(" ").filter((cell) => cell !== "");
    parsedRows.push(cells);
  }

  const operations: Operation[] = [];
  const columnCount = parsedRows[0].length;
  const lastRowIndex = parsedRows.length - 1;

  for (let col = 0; col < columnCount; col++) {
    const opSymbol = parsedRows[lastRowIndex][col] as Operator;

    const operands: number[] = [];
    for (let row = 0; row < lastRowIndex; row++) {
      operands.push(Number(parsedRows[row][col]));
    }

    operations.push([...operands, opSymbol]);
  }

  return operations;
}

type ColumnRange = [number, number];

const RANGE_START = 0;
const RANGE_END = 1;

export function parseCephalopodColumnOperations(
  linesRaw: string[]
): Operation[] {
  const height = linesRaw.length;
  const width = linesRaw[0].length;
  const lastRowIndex = height - 1;

  const isSeparatorColumn = (col: number): boolean =>
    linesRaw.every((line) => line[col] === " ");

  const problemRanges: ColumnRange[] = [];
  let currentStart = 0;

  for (let col = 1; col < width; col++) {
    if (isSeparatorColumn(col)) {
      problemRanges.push([currentStart, col - 1]);
      currentStart = col + 1;
    }
  }

  problemRanges.push([currentStart, width - 1]);

  const operations: Operation[] = [];

  for (const range of problemRanges) {
    const operands: number[] = [];

    for (let col = range[RANGE_START]; col <= range[RANGE_END]; col++) {
      let digitString = "";

      for (let row = 0; row < lastRowIndex; row++) {
        digitString += linesRaw[row][col];
      }

      operands.push(Number(digitString));
    }

    const operator = linesRaw[lastRowIndex][range[RANGE_START]] as Operator;

    operations.push([...operands, operator]);
  }

  return operations;
}
