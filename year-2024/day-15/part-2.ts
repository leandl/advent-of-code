import { Pos, WarehouseState } from "./utils";

function expandMap(grid: string[][]): string[][] {
  return grid.map((row) =>
    row.flatMap((cell) => {
      if (cell === "#") return ["#", "#"];
      if (cell === "O") return ["[", "]"];
      if (cell === ".") return [".", "."];
      if (cell === "@") return ["@", "."];
      return [];
    }),
  );
}

export function part2Run(input: WarehouseState) {
  let map = expandMap(input.grid);

  let robot: Pos = { r: 0, c: 0 };

  // find robot again (after expand)
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[0].length; c++) {
      if (map[r][c] === "@") robot = { r, c };
    }
  }

  const canMoveBox = (x: number, y: number, d: string): boolean => {
    let v1: string, v2: string;

    switch (d) {
      case "<":
        v1 = map[y][x - 1];
        if (v1 === ".") return true;
        if (v1 === "]") return canMoveBox(x - 2, y, d);
        return false;

      case ">":
        v1 = map[y][x + 2];
        if (v1 === ".") return true;
        if (v1 === "[") return canMoveBox(x + 2, y, d);
        return false;

      case "^":
        v1 = map[y - 1][x];
        v2 = map[y - 1][x + 1];

        if (v1 === "." && v2 === ".") return true;
        if (v1 === "#" || v2 === "#") return false;

        return (
          (v1 !== "[" || canMoveBox(x, y - 1, d)) &&
          (v2 !== "[" || canMoveBox(x + 1, y - 1, d)) &&
          (v1 !== "]" || canMoveBox(x - 1, y - 1, d))
        );

      case "v":
        v1 = map[y + 1][x];
        v2 = map[y + 1][x + 1];

        if (v1 === "." && v2 === ".") return true;
        if (v1 === "#" || v2 === "#") return false;

        return (
          (v1 !== "[" || canMoveBox(x, y + 1, d)) &&
          (v2 !== "[" || canMoveBox(x + 1, y + 1, d)) &&
          (v1 !== "]" || canMoveBox(x - 1, y + 1, d))
        );
    }

    return false;
  };

  const moveBox = (x: number, y: number, d: string) => {
    let v1: string, v2: string;

    switch (d) {
      case "<":
        if (map[y][x - 1] === "]") moveBox(x - 2, y, d);
        map[y][x - 1] = "[";
        map[y][x] = "]";
        map[y][x + 1] = ".";
        break;

      case ">":
        if (map[y][x + 2] === "[") moveBox(x + 2, y, d);
        map[y][x] = ".";
        map[y][x + 1] = "[";
        map[y][x + 2] = "]";
        break;

      case "^":
        v1 = map[y - 1][x];
        v2 = map[y - 1][x + 1];

        if (v1 === "[") moveBox(x, y - 1, d);
        if (v1 === "]") moveBox(x - 1, y - 1, d);
        if (v2 === "[") moveBox(x + 1, y - 1, d);

        map[y - 1][x] = "[";
        map[y - 1][x + 1] = "]";
        map[y][x] = ".";
        map[y][x + 1] = ".";
        break;

      case "v":
        v1 = map[y + 1][x];
        v2 = map[y + 1][x + 1];

        if (v1 === "[") moveBox(x, y + 1, d);
        if (v1 === "]") moveBox(x - 1, y + 1, d);
        if (v2 === "[") moveBox(x + 1, y + 1, d);

        map[y + 1][x] = "[";
        map[y + 1][x + 1] = "]";
        map[y][x] = ".";
        map[y][x + 1] = ".";
        break;
    }
  };

  const moveRobot = (nr: number, nc: number, d: string) => {
    const cell = map[nr][nc];
    let moved = false;

    if (cell === ".") moved = true;

    if (cell === "[") {
      if (canMoveBox(nc, nr, d)) {
        moveBox(nc, nr, d);
        moved = true;
      }
    }

    if (cell === "]") {
      if (canMoveBox(nc - 1, nr, d)) {
        moveBox(nc - 1, nr, d);
        moved = true;
      }
    }

    if (moved) {
      map[robot.r][robot.c] = ".";
      map[nr][nc] = "@";
      robot = { r: nr, c: nc };
    }
  };

  for (const m of input.moves) {
    if (m === "<") moveRobot(robot.r, robot.c - 1, m);
    if (m === ">") moveRobot(robot.r, robot.c + 1, m);
    if (m === "^") moveRobot(robot.r - 1, robot.c, m);
    if (m === "v") moveRobot(robot.r + 1, robot.c, m);
  }

  // GPS sum (usar '['!)
  let sum = 0;
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[0].length; c++) {
      if (map[r][c] === "[") {
        sum += 100 * r + c;
      }
    }
  }

  return sum;
}
