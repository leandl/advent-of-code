export function part2Run(lines: string[]) {
  // começa no "5"
  let row = 2;
  let col = 0;

  const keypad = [
    [null, null, "1", null, null],
    [null, "2", "3", "4", null],
    ["5", "6", "7", "8", "9"],
    [null, "A", "B", "C", null],
    [null, null, "D", null, null],
  ];

  let code = "";

  for (const line of lines) {
    for (const move of line) {
      let nextRow = row;
      let nextCol = col;

      switch (move) {
        case "U":
          nextRow--;
          break;
        case "D":
          nextRow++;
          break;
        case "L":
          nextCol--;
          break;
        case "R":
          nextCol++;
          break;
      }

      // Valida movimento
      if (
        keypad[nextRow] !== undefined &&
        keypad[nextRow][nextCol] !== undefined &&
        keypad[nextRow][nextCol] !== null
      ) {
        row = nextRow;
        col = nextCol;
      }
    }

    code += keypad[row][col];
  }

  return code;
}
