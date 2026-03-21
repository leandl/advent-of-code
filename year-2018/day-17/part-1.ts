import { Cell, GroundScan, SPRING_X } from "./utils";

export function part1Run({ clay, bounds }: GroundScan): number {
  const { minX, maxX, minY, maxY } = bounds;

  // Expand horizontal bounds to allow overflow
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

    // Fall down
    if (get(x, y + 1) === ".") {
      flow(x, y + 1);
    }

    if (get(x, y + 1) === "|") {
      return;
    }

    // Spread left/right if supported
    if (get(x, y + 1) === "#" || get(x, y + 1) === "~") {
      let left = x;
      let right = x;

      let blockedLeft = false;
      let blockedRight = false;

      // LEFT
      while (true) {
        left--;
        const below = get(left, y + 1);
        const curr = get(left, y);

        if (curr === "#") {
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
        const curr = get(right, y);

        if (curr === "#") {
          blockedRight = true;
          break;
        }

        set(right, y, "|");

        if (below === "." || below === "|") {
          flow(right, y + 1);
          if (get(right, y + 1) !== "~") break;
        }
      }

      // Convert to settled water if enclosed
      if (blockedLeft && blockedRight) {
        for (let i = left + 1; i < right; i++) {
          set(i, y, "~");
        }

        // propagate upward
        flow(x, y - 1);
      }
    }
  }

  // Start simulation
  flow(SPRING_X, 0);

  // Count reachable tiles
  let count = 0;

  for (const [key, val] of grid.entries()) {
    const [, yStr] = key.split(",");
    const y = Number(yStr);

    if (y >= minY && y <= maxY) {
      if (val === "|" || val === "~") {
        count++;
      }
    }
  }

  return count;
}
