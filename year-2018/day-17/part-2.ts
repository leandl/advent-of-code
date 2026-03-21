import { Cell, GroundScan, SPRING_X } from "./utils";

export function part2Run({ clay, bounds }: GroundScan): number {
  const { minY, maxY } = bounds;

  const grid = new Map<string, Cell>();

  const get = (x: number, y: number): Cell => {
    if (clay.has(`${x},${y}`)) return "#";
    return grid.get(`${x},${y}`) ?? ".";
  };

  const set = (x: number, y: number, val: Cell) => {
    grid.set(`${x},${y}`, val);
  };

  function flow(x: number, y: number): void {
    if (y > maxY) return;

    if (get(x, y) === ".") {
      set(x, y, "|");
    }

    if (get(x, y + 1) === ".") {
      flow(x, y + 1);
    }

    if (get(x, y + 1) === "|") return;

    if (get(x, y + 1) === "#" || get(x, y + 1) === "~") {
      let left = x;
      let right = x;

      let blockedLeft = false;
      let blockedRight = false;

      // LEFT
      while (true) {
        left--;
        const below = get(left, y + 1);

        if (get(left, y) === "#") {
          blockedLeft = true;
          break;
        }

        set(left, y, "|");

        if (below === "." || below === "|") {
          flow(left, y + 1);
          if (get(left, y + 1) !== "~") break;
        }
      }

      // RIGHT
      while (true) {
        right++;
        const below = get(right, y + 1);

        if (get(right, y) === "#") {
          blockedRight = true;
          break;
        }

        set(right, y, "|");

        if (below === "." || below === "|") {
          flow(right, y + 1);
          if (get(right, y + 1) !== "~") break;
        }
      }

      // settle
      if (blockedLeft && blockedRight) {
        for (let i = left + 1; i < right; i++) {
          set(i, y, "~");
        }

        flow(x, y - 1);
      }
    }
  }

  flow(SPRING_X, 0);

  let count = 0;

  for (const [key, val] of grid.entries()) {
    if (val !== "~") continue;

    const [, yStr] = key.split(",");
    const y = Number(yStr);

    if (y >= minY && y <= maxY) {
      count++;
    }
  }

  return count;
}
