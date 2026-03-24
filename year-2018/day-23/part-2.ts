import { Bot } from "./utils";

type Cube = {
  x: number;
  y: number;
  z: number;
  size: number;
  botsInRange: number;
  distToOrigin: number;
};

function manhattan(x: number, y: number, z: number): number {
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

function distBotToCube(bot: Bot, cube: Cube): number {
  let dx = 0;
  if (bot.x < cube.x) dx = cube.x - bot.x;
  else if (bot.x > cube.x + cube.size - 1)
    dx = bot.x - (cube.x + cube.size - 1);

  let dy = 0;
  if (bot.y < cube.y) dy = cube.y - bot.y;
  else if (bot.y > cube.y + cube.size - 1)
    dy = bot.y - (cube.y + cube.size - 1);

  let dz = 0;
  if (bot.z < cube.z) dz = cube.z - bot.z;
  else if (bot.z > cube.z + cube.size - 1)
    dz = bot.z - (cube.z + cube.size - 1);

  return dx + dy + dz;
}

function botsInRange(cube: Cube, bots: Bot[]): number {
  let count = 0;
  for (const bot of bots) {
    if (distBotToCube(bot, cube) <= bot.r) {
      count++;
    }
  }
  return count;
}

// prioridade: mais bots > menor dist > menor size
function compare(a: Cube, b: Cube): number {
  if (b.botsInRange !== a.botsInRange) return b.botsInRange - a.botsInRange;

  if (a.distToOrigin !== b.distToOrigin) return a.distToOrigin - b.distToOrigin;

  return a.size - b.size;
}

export function part2Run(bots: Bot[]) {
  // bounding box inicial
  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;

  for (const b of bots) {
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    minZ = Math.min(minZ, b.z);
    maxX = Math.max(maxX, b.x);
    maxY = Math.max(maxY, b.y);
    maxZ = Math.max(maxZ, b.z);
  }

  // tamanho inicial (potência de 2)
  let size = 1;
  while (size < maxX - minX || size < maxY - minY || size < maxZ - minZ) {
    size *= 2;
  }

  const initial: Cube = {
    x: minX,
    y: minY,
    z: minZ,
    size,
    botsInRange: 0,
    distToOrigin: 0,
  };

  initial.botsInRange = botsInRange(initial, bots);
  initial.distToOrigin = manhattan(initial.x, initial.y, initial.z);

  const queue: Cube[] = [initial];

  while (queue.length > 0) {
    queue.sort(compare);
    const cube = queue.shift()!;

    if (cube.size === 1) {
      return cube.distToOrigin;
    }

    const half = Math.floor(cube.size / 2);

    for (let dx = 0; dx < 2; dx++) {
      for (let dy = 0; dy < 2; dy++) {
        for (let dz = 0; dz < 2; dz++) {
          const sub: Cube = {
            x: cube.x + dx * half,
            y: cube.y + dy * half,
            z: cube.z + dz * half,
            size: half,
            botsInRange: 0,
            distToOrigin: 0,
          };

          sub.botsInRange = botsInRange(sub, bots);
          sub.distToOrigin = manhattan(sub.x, sub.y, sub.z);

          queue.push(sub);
        }
      }
    }
  }

  throw new Error("No solution");
}
