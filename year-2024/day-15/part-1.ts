import { Pos, WarehouseState } from "./utils";

export function part1Run({ grid, moves, robot: start }: WarehouseState) {
  let robot: Pos = { ...start };

  function move(nr: number, nc: number) {
    const target = grid[nr][nc];

    // vazio → anda
    if (target === ".") {
      grid[robot.r][robot.c] = ".";
      grid[nr][nc] = "@";
      robot = { r: nr, c: nc };
      return;
    }

    // caixa → tenta empurrar cadeia
    if (target === "O") {
      const dr = nr - robot.r;
      const dc = nc - robot.c;

      let cr = nr;
      let cc = nc;

      // anda até achar . ou #
      while (grid[cr][cc] !== "." && grid[cr][cc] !== "#") {
        cr += dr;
        cc += dc;
      }

      // se não achou espaço → cancela
      if (grid[cr][cc] !== ".") return;

      // move a última caixa
      grid[cr][cc] = "O";

      // move robô
      grid[robot.r][robot.c] = ".";
      grid[nr][nc] = "@";
      robot = { r: nr, c: nc };
    }
  }

  for (const m of moves) {
    switch (m) {
      case "<":
        move(robot.r, robot.c - 1);
        break;
      case ">":
        move(robot.r, robot.c + 1);
        break;
      case "^":
        move(robot.r - 1, robot.c);
        break;
      case "v":
        move(robot.r + 1, robot.c);
        break;
    }
  }

  // GPS sum
  let sum = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "O") {
        sum += 100 * r + c;
      }
    }
  }

  return sum;
}
