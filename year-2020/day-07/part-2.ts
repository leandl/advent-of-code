import { BagColor, BagRule } from "./utils";

function buildRuleMap(rules: BagRule[]): Map<BagColor, BagRule> {
  const map = new Map<BagColor, BagRule>();
  for (const rule of rules) {
    map.set(rule.color, rule);
  }
  return map;
}

function countTotalBagsInside(rules: BagRule[], startColor: BagColor): number {
  const ruleMap = buildRuleMap(rules);
  const memo = new Map<BagColor, number>();

  function dfs(color: BagColor): number {
    if (memo.has(color)) {
      return memo.get(color)!;
    }

    const rule = ruleMap.get(color);
    if (!rule) return 0;

    let total = 0;

    for (const inner of rule.contains) {
      total += inner.quantity * (1 + dfs(inner.color));
    }

    memo.set(color, total);
    return total;
  }

  return dfs(startColor);
}

export function part2Run(bagRules: BagRule[]) {
  return countTotalBagsInside(bagRules, "shiny gold");
}
