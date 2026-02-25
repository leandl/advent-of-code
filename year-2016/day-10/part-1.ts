import { RunParams } from "./utils";

export function part1Run({ instructions, compareValues }: RunParams) {
  const [valueA, valueB] = compareValues;

  const bots = new Map<number, number[]>();
  const outputs = new Map<number, number[]>();

  // Clonar estado inicial
  for (const [id, chips] of instructions.initialBots.entries()) {
    bots.set(id, [...chips]);
  }

  function ensureBot(id: number) {
    if (!bots.has(id)) bots.set(id, []);
  }

  function ensureOutput(id: number) {
    if (!outputs.has(id)) outputs.set(id, []);
  }

  while (true) {
    const activeBot = [...bots.entries()].find(
      ([_, chips]) => chips.length === 2,
    );

    if (!activeBot) break;

    const [botId, chips] = activeBot;
    const [lowValue, highValue] = chips.sort((a, b) => a - b);

    if (
      lowValue === Math.min(valueA, valueB) &&
      highValue === Math.max(valueA, valueB)
    ) {
      return botId;
    }

    const rule = instructions.rules.get(botId);
    if (!rule) throw new Error(`Bot ${botId} has no rule`);

    // Entrega LOW
    if (rule.low.type === "bot") {
      ensureBot(rule.low.id);
      bots.get(rule.low.id)!.push(lowValue);
    } else {
      ensureOutput(rule.low.id);
      outputs.get(rule.low.id)!.push(lowValue);
    }

    // Entrega HIGH
    if (rule.high.type === "bot") {
      ensureBot(rule.high.id);
      bots.get(rule.high.id)!.push(highValue);
    } else {
      ensureOutput(rule.high.id);
      outputs.get(rule.high.id)!.push(highValue);
    }

    bots.set(botId, []);
  }

  return null;
}
