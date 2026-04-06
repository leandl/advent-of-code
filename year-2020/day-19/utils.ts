export type RuleId = number;

// ---------------- RULE TYPES ----------------

type TerminalRule = {
  kind: "terminal";
  char: string;
};

type CompositeRule = {
  kind: "composite";
  alternatives: RuleId[][];
};

export type GrammarRule = TerminalRule | CompositeRule;

export type MessageGrammar = {
  ruleMap: Map<RuleId, GrammarRule>;
  messages: string[];
};

// ---------------- PARSE ----------------

export function parseMonsterMessages(input: string): MessageGrammar {
  const [rawRules, rawMessages] = input.split("\n\n");

  return {
    ruleMap: parseRuleDefinitions(rawRules),
    messages: parseMessageList(rawMessages),
  };
}

function parseRuleDefinitions(rawRules: string): Map<RuleId, GrammarRule> {
  const ruleMap = new Map<RuleId, GrammarRule>();

  for (const line of rawRules.split("\n")) {
    const [idText, definitionText] = line.split(": ");
    const id = Number(idText);

    if (definitionText.includes('"')) {
      ruleMap.set(id, {
        kind: "terminal",
        char: definitionText.replace(/"/g, ""),
      });
      continue;
    }

    const alternatives = definitionText
      .split(" | ")
      .map((sequence) => sequence.split(" ").map(Number));

    ruleMap.set(id, {
      kind: "composite",
      alternatives,
    });
  }

  return ruleMap;
}

function parseMessageList(rawMessages: string): string[] {
  return rawMessages.split("\n").filter(Boolean);
}

export function expandRule(
  ruleId: RuleId,
  ruleMap: Map<RuleId, GrammarRule>,
  cache: Map<RuleId, Set<string>>,
): Set<string> {
  if (cache.has(ruleId)) {
    return cache.get(ruleId)!;
  }

  const rule = ruleMap.get(ruleId);
  if (!rule) {
    throw new Error(`Rule ${ruleId} not found`);
  }

  // Terminal case
  if (rule.kind === "terminal") {
    const result = new Set([rule.char]);
    cache.set(ruleId, result);
    return result;
  }

  const results = new Set<string>();

  // For each alternative (OR)
  for (const sequence of rule.alternatives) {
    let partialMatches: string[] = [""];

    // For each rule in sequence (AND)
    for (const subRuleId of sequence) {
      const subMatches = expandRule(subRuleId, ruleMap, cache);
      const nextMatches: string[] = [];

      for (const prefix of partialMatches) {
        for (const match of subMatches) {
          nextMatches.push(prefix + match);
        }
      }

      partialMatches = nextMatches;
    }

    for (const match of partialMatches) {
      results.add(match);
    }
  }

  cache.set(ruleId, results);
  return results;
}
