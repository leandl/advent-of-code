import { Grid } from "../../utils/parsers";

type Faction = "Elf" | "Goblin";

class Unit {
  id: number;
  faction: Faction;
  hp = 200;
  attack = 3;
  x: number;
  y: number;
  alive = true;

  constructor(id: number, faction: Faction, x: number, y: number) {
    this.id = id;
    this.faction = faction;
    this.x = x;
    this.y = y;
  }
}

const DIRS = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function readingOrder(ax: number, ay: number, bx: number, by: number) {
  return ay - by || ax - bx;
}

export function simulate(
  grid: Grid<string>,
  elfAttack: number,
  failOnElfDeath: boolean,
): number | null {
  const h = grid.length;
  const w = grid[0].length;

  const units: Unit[] = [];
  const occupied: (Unit | null)[][] = Array.from({ length: h }, () =>
    Array(w).fill(null),
  );

  let id = 0;
  let elvesAlive = 0;
  let goblinsAlive = 0;

  // parse
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = grid[y][x];
      if (c === "E" || c === "G") {
        const faction: Faction = c === "E" ? "Elf" : "Goblin";
        const u = new Unit(id++, faction, x, y);

        if (faction === "Elf") {
          u.attack = elfAttack;
          elvesAlive++;
        } else {
          goblinsAlive++;
        }

        units.push(u);
        occupied[y][x] = u;
        grid[y][x] = ".";
      }
    }
  }

  function isOpen(x: number, y: number) {
    return grid[y][x] === "." && occupied[y][x] === null;
  }

  function getAdjacentEnemy(u: Unit): Unit | null {
    let best: Unit | null = null;

    for (const [dx, dy] of DIRS) {
      const nx = u.x + dx;
      const ny = u.y + dy;
      const other = occupied[ny][nx];

      if (!other || !other.alive || other.faction === u.faction) continue;

      if (
        !best ||
        other.hp < best.hp ||
        (other.hp === best.hp &&
          readingOrder(other.x, other.y, best.x, best.y) < 0)
      ) {
        best = other;
      }
    }

    return best;
  }

  // 🔥 REUSABLE BUFFERS (CRITICAL)
  const dist = Array.from({ length: h }, () => new Int32Array(w));
  const firstX = Array.from({ length: h }, () => new Int32Array(w));
  const firstY = Array.from({ length: h }, () => new Int32Array(w));

  const qx = new Int32Array(w * h);
  const qy = new Int32Array(w * h);

  function move(unit: Unit) {
    if (getAdjacentEnemy(unit)) return;

    // RESET instead of reallocate
    for (let y = 0; y < h; y++) {
      dist[y].fill(-1);
    }

    let head = 0,
      tail = 0;

    qx[tail] = unit.x;
    qy[tail] = unit.y;
    tail++;

    dist[unit.y][unit.x] = 0;

    let bestDist = Infinity;
    let targetX = -1,
      targetY = -1;

    while (head < tail) {
      const x = qx[head];
      const y = qy[head];
      head++;

      const d = dist[y][x];
      if (d > bestDist) break;

      for (const [dx, dy] of DIRS) {
        const nx = x + dx;
        const ny = y + dy;

        if (dist[ny][nx] !== -1) continue;
        if (!isOpen(nx, ny)) continue;

        dist[ny][nx] = d + 1;

        if (d === 0) {
          firstX[ny][nx] = nx;
          firstY[ny][nx] = ny;
        } else {
          firstX[ny][nx] = firstX[y][x];
          firstY[ny][nx] = firstY[y][x];
        }

        // check adjacency to enemy
        for (const [dx2, dy2] of DIRS) {
          const ex = nx + dx2;
          const ey = ny + dy2;
          const e = occupied[ey][ex];

          if (e && e.alive && e.faction !== unit.faction) {
            if (
              d + 1 < bestDist ||
              (d + 1 === bestDist && readingOrder(nx, ny, targetX, targetY) < 0)
            ) {
              bestDist = d + 1;
              targetX = nx;
              targetY = ny;
            }
            break;
          }
        }

        qx[tail] = nx;
        qy[tail] = ny;
        tail++;
      }
    }

    if (bestDist !== Infinity) {
      const stepX = firstX[targetY][targetX];
      const stepY = firstY[targetY][targetX];

      occupied[unit.y][unit.x] = null;
      unit.x = stepX;
      unit.y = stepY;
      occupied[unit.y][unit.x] = unit;
    }
  }

  let rounds = 0;

  while (true) {
    units.sort((a, b) => readingOrder(a.x, a.y, b.x, b.y));

    for (const unit of units) {
      if (!unit.alive) continue;

      if (elvesAlive === 0 || goblinsAlive === 0) {
        const hpSum = units
          .filter((u) => u.alive)
          .reduce((s, u) => s + u.hp, 0);

        return rounds * hpSum;
      }

      move(unit);

      const target = getAdjacentEnemy(unit);
      if (target) {
        target.hp -= unit.attack;

        if (target.hp <= 0) {
          target.alive = false;
          occupied[target.y][target.x] = null;

          if (target.faction === "Elf") {
            elvesAlive--;
            if (failOnElfDeath) return null;
          } else {
            goblinsAlive--;
          }
        }
      }
    }

    rounds++;
  }
}
