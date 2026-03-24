import { Bot } from "./utils";

function manhattan(a: Bot, b: Bot): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

export function part1Run(bots: Bot[]) {
  const strongest = bots.reduce((max, bot) => (bot.r > max.r ? bot : max));

  let count = 0;

  for (const bot of bots) {
    const dist = manhattan(bot, strongest);
    if (dist <= strongest.r) {
      count++;
    }
  }

  return count;
}
