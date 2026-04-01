import { IntcodeComputer } from "../../utils/intcode-computer";

export function part1Run(program: number[]) {
  const comp = new IntcodeComputer(program);

  // ===== ASCII helper =====
  const runAscii = (inputStr: string): string => {
    const inputQueue = inputStr.split("").map((c) => c.charCodeAt(0));
    let output = "";

    while (!comp.isHalted()) {
      const out = comp.runUntilOutput(() => {
        if (inputQueue.length === 0) return 0;
        return inputQueue.shift()!;
      });

      if (out === null) break;
      output += String.fromCharCode(out);
    }

    return output;
  };

  const cmd = (s: string) => runAscii(s + "\n");

  // ===== SCRIPT DE EXPLORAÇÃO =====
  // ⚠️ Esse script depende do seu input (mapa fixo do puzzle)
  // Esse é um caminho comum usado pela galera (pode variar se você explorou diferente)

  const script = [
    "south",
    "take sand",

    "south",
    "take space law space brochure",

    "north",
    "north",
    "west",
    "take wreath",

    "east",
    "north",
    "take pointer",

    "south",
    "west",
    "take prime number",

    "east",
    "north",
    "west",
    "take mutex",

    "east",
    "south",
    "east",
    "take asterisk",

    "west",
    "south",
    "west",
    "south",
    "take loom",

    // ir até checkpoint
    "north",
    "east",
    "north",
    "west",
  ];

  for (const s of script) {
    cmd(s);
  }

  const ALL_ITEMS = [
    "asterisk",
    "mutex",
    "loom",
    "sand",
    "space law space brochure",
    "wreath",
    "pointer",
    "prime number",
  ];

  function* subsets(items: string[]) {
    const n = items.length;
    for (let mask = 0; mask < 1 << n; mask++) {
      const res: string[] = [];
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) res.push(items[i]);
      }
      yield res;
    }
  }

  // ===== BRUTE FORCE DO PESO =====
  for (const combo of subsets(ALL_ITEMS)) {
    // drop tudo
    for (const item of ALL_ITEMS) {
      cmd(`drop ${item}`);
    }

    // pega subset
    for (const item of combo) {
      cmd(`take ${item}`);
    }

    const out = cmd("north");

    console.log(out);

    if (!out.includes("Alert")) {
      // extrai senha (número no texto)
      const match = out.match(/\d+/);
      if (match) {
        return Number(match[0]);
      }

      return out; // fallback
    }
  }

  throw new Error("nenhuma combinação funcionou");
}
