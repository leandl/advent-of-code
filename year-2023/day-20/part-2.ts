import { ModuleMap, Pulse } from "./utils";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function part2Run(modules: ModuleMap) {
  // 1. encontrar quem aponta para rx
  const parentOfRx = Object.values(modules).find((m) =>
    m.outputs.includes("rx"),
  );

  if (!parentOfRx || parentOfRx.type !== "conjunction") {
    throw new Error("Estrutura inesperada");
  }

  // 2. inputs desse conjunction
  const inputs = Object.keys(parentOfRx.memory);

  const cycles: Record<string, number> = {};
  let press = 0;

  while (Object.keys(cycles).length < inputs.length) {
    press++;

    const queue: Pulse[] = [
      { from: "button", to: "broadcaster", signal: "low" },
    ];

    while (queue.length) {
      const pulse = queue.shift()!;

      const module = modules[pulse.to];
      if (!module) continue;

      if (
        pulse.to === parentOfRx.name &&
        pulse.signal === "high" &&
        !cycles[pulse.from]
      ) {
        cycles[pulse.from] = press;
      }

      if (module.type === "broadcaster") {
        for (const out of module.outputs) {
          queue.push({ from: module.name, to: out, signal: pulse.signal });
        }
      } else if (module.type === "flipflop") {
        if (pulse.signal === "high") continue;

        module.isOn = !module.isOn;
        const outSignal = module.isOn ? "high" : "low";

        for (const out of module.outputs) {
          queue.push({ from: module.name, to: out, signal: outSignal });
        }
      } else if (module.type === "conjunction") {
        module.memory[pulse.from] = pulse.signal;

        const allHigh = Object.values(module.memory).every((s) => s === "high");

        const outSignal = allHigh ? "low" : "high";

        for (const out of module.outputs) {
          queue.push({ from: module.name, to: out, signal: outSignal });
        }
      }
    }
  }

  // 3. LCM dos ciclos
  return Object.values(cycles).reduce((acc, val) => lcm(acc, val), 1);
}
