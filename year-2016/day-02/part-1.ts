export function part1Run(lines: string[]) {
  // começa no "5"
  let row = 1;
  let col = 1;

  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  let code = "";

  for (const line of lines) {
    for (const move of line) {
      switch (move) {
        case "U":
          if (row > 0) row--;
          break;
        case "D":
          if (row < 2) row++;
          break;
        case "L":
          if (col > 0) col--;
          break;
        case "R":
          if (col < 2) col++;
          break;
      }
    }

    code += keypad[row][col];
  }

  return code;
}
