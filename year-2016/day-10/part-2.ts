import { Instructions, RunParams } from "./utils";

type SimulationResult = {
  bots: Map<number, number[]>;
  outputs: Map<number, number[]>;
};

export function runFullSimulation(
  instructions: Instructions,
): SimulationResult {
  const bots = new Map<number, number[]>();
  const outputs = new Map<number, number[]>();

  // Clona estado inicial
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

    const rule = instructions.rules.get(botId);
    if (!rule) throw new Error(`Bot ${botId} has no rule`);

    // LOW
    if (rule.low.type === "bot") {
      ensureBot(rule.low.id);
      bots.get(rule.low.id)!.push(lowValue);
    } else {
      ensureOutput(rule.low.id);
      outputs.get(rule.low.id)!.push(lowValue);
    }

    // HIGH
    if (rule.high.type === "bot") {
      ensureBot(rule.high.id);
      bots.get(rule.high.id)!.push(highValue);
    } else {
      ensureOutput(rule.high.id);
      outputs.get(rule.high.id)!.push(highValue);
    }

    bots.set(botId, []);
  }

  return { bots, outputs };
}

export function part2Run({ instructions }: RunParams) {
  const { outputs } = runFullSimulation(instructions);

  const v0 = outputs.get(0)?.[0] ?? 0;
  const v1 = outputs.get(1)?.[0] ?? 0;
  const v2 = outputs.get(2)?.[0] ?? 0;

  return v0 * v1 * v2;
}
