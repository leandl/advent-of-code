export type Blueprint = {
  id: number;
  oreRobotOre: number;
  clayRobotOre: number;
  obsidianRobotOre: number;
  obsidianRobotClay: number;
  geodeRobotOre: number;
  geodeRobotObsidian: number;
};

type State = {
  time: number;
  ore: number;
  clay: number;
  obs: number;
  geode: number;
  oreR: number;
  clayR: number;
  obsR: number;
  geoR: number;
};

export function parseBlueprints(lines: string[]): Blueprint[] {
  return lines.map((line) => {
    const nums = [...line.matchAll(/\d+/g)].map((x) => Number(x[0]));
    return {
      id: nums[0],
      oreRobotOre: nums[1],
      clayRobotOre: nums[2],
      obsidianRobotOre: nums[3],
      obsidianRobotClay: nums[4],
      geodeRobotOre: nums[5],
      geodeRobotObsidian: nums[6],
    };
  });
}

export function maxGeodes(bp: Blueprint, maxTime: number): number {
  let best = 0;
  const seen = new Set<string>();

  const maxOreCost = Math.max(
    bp.oreRobotOre,
    bp.clayRobotOre,
    bp.obsidianRobotOre,
    bp.geodeRobotOre,
  );

  function dfs(s: State) {
    if (s.time === maxTime) {
      best = Math.max(best, s.geode);
      return;
    }

    const remaining = maxTime - s.time;

    const maxPossible =
      s.geode + s.geoR * remaining + (remaining * (remaining - 1)) / 2;

    if (maxPossible <= best) return;

    // normalização (evita estados inúteis)
    const ore = Math.min(s.ore, remaining * maxOreCost);
    const clay = Math.min(s.clay, remaining * bp.obsidianRobotClay);
    const obs = Math.min(s.obs, remaining * bp.geodeRobotObsidian);

    const key = [
      s.time,
      ore,
      clay,
      obs,
      s.geode,
      s.oreR,
      s.clayR,
      s.obsR,
      s.geoR,
    ].join(",");

    if (seen.has(key)) return;
    seen.add(key);

    // tentar construir geode robot (prioridade máxima)
    if (s.ore >= bp.geodeRobotOre && s.obs >= bp.geodeRobotObsidian) {
      dfs({
        time: s.time + 1,
        ore: s.ore - bp.geodeRobotOre + s.oreR,
        clay: s.clay + s.clayR,
        obs: s.obs - bp.geodeRobotObsidian + s.obsR,
        geode: s.geode + s.geoR,
        oreR: s.oreR,
        clayR: s.clayR,
        obsR: s.obsR,
        geoR: s.geoR + 1,
      });
      return; // sempre melhor construir geode se possível
    }

    // construir obsidian robot
    if (
      s.ore >= bp.obsidianRobotOre &&
      s.clay >= bp.obsidianRobotClay &&
      s.obsR < bp.geodeRobotObsidian
    ) {
      dfs({
        time: s.time + 1,
        ore: s.ore - bp.obsidianRobotOre + s.oreR,
        clay: s.clay - bp.obsidianRobotClay + s.clayR,
        obs: s.obs + s.obsR,
        geode: s.geode + s.geoR,
        oreR: s.oreR,
        clayR: s.clayR,
        obsR: s.obsR + 1,
        geoR: s.geoR,
      });
    }

    // construir clay robot
    if (s.ore >= bp.clayRobotOre && s.clayR < bp.obsidianRobotClay) {
      dfs({
        time: s.time + 1,
        ore: s.ore - bp.clayRobotOre + s.oreR,
        clay: s.clay + s.clayR,
        obs: s.obs + s.obsR,
        geode: s.geode + s.geoR,
        oreR: s.oreR,
        clayR: s.clayR + 1,
        obsR: s.obsR,
        geoR: s.geoR,
      });
    }

    // construir ore robot
    if (s.ore >= bp.oreRobotOre && s.oreR < maxOreCost) {
      dfs({
        time: s.time + 1,
        ore: s.ore - bp.oreRobotOre + s.oreR,
        clay: s.clay + s.clayR,
        obs: s.obs + s.obsR,
        geode: s.geode + s.geoR,
        oreR: s.oreR + 1,
        clayR: s.clayR,
        obsR: s.obsR,
        geoR: s.geoR,
      });
    }

    // não construir nada
    dfs({
      time: s.time + 1,
      ore: s.ore + s.oreR,
      clay: s.clay + s.clayR,
      obs: s.obs + s.obsR,
      geode: s.geode + s.geoR,
      oreR: s.oreR,
      clayR: s.clayR,
      obsR: s.obsR,
      geoR: s.geoR,
    });
  }

  dfs({
    time: 0,
    ore: 0,
    clay: 0,
    obs: 0,
    geode: 0,
    oreR: 1,
    clayR: 0,
    obsR: 0,
    geoR: 0,
  });

  return best;
}
