type Target = { type: "bot"; id: number } | { type: "output"; id: number };

type BotRule = {
  low: Target;
  high: Target;
};

export type Instructions = {
  initialBots: Map<number, number[]>;
  rules: Map<number, BotRule>;
};

export function parseInstructions(lines: string[]): Instructions {
  const initialBots = new Map<number, number[]>();
  const rules = new Map<number, BotRule>();

  function ensureBot(id: number) {
    if (!initialBots.has(id)) initialBots.set(id, []);
  }

  for (const line of lines) {
    if (line.startsWith("value")) {
      const match = line.match(/value (\d+) goes to bot (\d+)/);
      if (!match) continue;

      const value = parseInt(match[1], 10);
      const botId = parseInt(match[2], 10);

      ensureBot(botId);
      initialBots.get(botId)!.push(value);
    }

    if (line.startsWith("bot")) {
      const match = line.match(
        /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/,
      );
      if (!match) continue;

      const botId = parseInt(match[1], 10);

      rules.set(botId, {
        low: { type: match[2] as "bot" | "output", id: parseInt(match[3], 10) },
        high: {
          type: match[4] as "bot" | "output",
          id: parseInt(match[5], 10),
        },
      });

      ensureBot(botId);
    }
  }

  return { initialBots, rules };
}

export type RunParams = {
  instructions: Instructions;
  compareValues: readonly [number, number];
};
