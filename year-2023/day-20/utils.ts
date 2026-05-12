type ModuleType = "broadcaster" | "flipflop" | "conjunction";

type BaseModule = {
  name: string;
  type: ModuleType;
  outputs: string[];
};

type FlipFlopModule = BaseModule & {
  type: "flipflop";
  isOn: boolean;
};

type ConjunctionModule = BaseModule & {
  type: "conjunction";
  memory: Record<string, "low" | "high">;
};

type BroadcasterModule = BaseModule & {
  type: "broadcaster";
};

type Module = FlipFlopModule | ConjunctionModule | BroadcasterModule;

export type ModuleMap = Record<string, Module>;

export function parseModules(lines: string[]): ModuleMap {
  const modules: ModuleMap = {};

  for (const line of lines) {
    const [left, right] = line.split(" -> ");
    const outputs = right.split(", ").map((s) => s.trim());

    if (left === "broadcaster") {
      modules["broadcaster"] = {
        name: "broadcaster",
        type: "broadcaster",
        outputs,
      };
    } else if (left.startsWith("%")) {
      const name = left.slice(1);
      modules[name] = {
        name,
        type: "flipflop",
        outputs,
        isOn: false,
      };
    } else if (left.startsWith("&")) {
      const name = left.slice(1);
      modules[name] = {
        name,
        type: "conjunction",
        outputs,
        memory: {},
      };
    }
  }

  // Inicializar memória dos conjunctions
  for (const mod of Object.values(modules)) {
    for (const out of mod.outputs) {
      const target = modules[out];
      if (target && target.type === "conjunction") {
        target.memory[mod.name] = "low";
      }
    }
  }

  return modules;
}

export type Pulse = {
  from: string;
  to: string;
  signal: "low" | "high";
};

export function simulateButtonPresses(
  modules: ModuleMap,
  presses: number,
): number {
  let lowCount = 0;
  let highCount = 0;

  for (let i = 0; i < presses; i++) {
    const queue: Pulse[] = [];

    // botão → broadcaster
    queue.push({
      from: "button",
      to: "broadcaster",
      signal: "low",
    });

    while (queue.length > 0) {
      const pulse = queue.shift()!;

      // contar
      if (pulse.signal === "low") lowCount++;
      else highCount++;

      const module = modules[pulse.to];
      if (!module) continue; // tipo "output"

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

  return lowCount * highCount;
}
