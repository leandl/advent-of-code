import { expandRule, MessageGrammar, RuleId } from "./utils";

export function part1Run({ messages, ruleMap }: MessageGrammar) {
  const cache = new Map<RuleId, Set<string>>();
  const validMessages = expandRule(0, ruleMap, cache);

  let count = 0;

  for (const message of messages) {
    if (validMessages.has(message)) {
      count++;
    }
  }

  return count;
}
