import { expandRule, MessageGrammar, RuleId } from "./utils";

export function part2Run({ messages, ruleMap }: MessageGrammar) {
  const cache = new Map<RuleId, Set<string>>();

  const rule42 = expandRule(42, ruleMap, cache);
  const rule31 = expandRule(31, ruleMap, cache);

  const size = [...rule42][0].length; // todos têm mesmo tamanho

  let validCount = 0;

  for (const message of messages) {
    const chunks: string[] = [];

    for (let i = 0; i < message.length; i += size) {
      chunks.push(message.slice(i, i + size));
    }

    let i = 0;

    // contar prefixo de 42
    let count42 = 0;
    while (i < chunks.length && rule42.has(chunks[i])) {
      count42++;
      i++;
    }

    // contar sufixo de 31
    let count31 = 0;
    while (i < chunks.length && rule31.has(chunks[i])) {
      count31++;
      i++;
    }

    // precisa consumir tudo
    if (i !== chunks.length) continue;

    // regra principal
    if (count31 >= 1 && count42 > count31) {
      validCount++;
    }
  }

  return validCount;
}
