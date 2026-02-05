import { Program } from "./utils";

type Node = {
  name: string;
  weight: number;
  children: Node[];
};

function buildTree(programs: Program[]): Node {
  const map = new Map<string, Node>();

  // cria todos os nós
  for (const p of programs) {
    map.set(p.name, {
      name: p.name,
      weight: p.weight,
      children: [],
    });
  }

  // conecta os filhos
  for (const p of programs) {
    const node = map.get(p.name)!;
    for (const childName of p.children) {
      node.children.push(map.get(childName)!);
    }
  }

  // raiz = programa que nunca é filho
  const all = new Set(programs.map((p) => p.name));
  const children = new Set(programs.flatMap((p) => p.children));

  const rootName = [...all].find((name) => !children.has(name));
  if (!rootName) throw new Error("Root not found");

  return map.get(rootName)!;
}

type DfsResult = {
  totalWeight: number;
  correctedWeight?: number;
};
function dfs(node: Node): DfsResult {
  const childResults = node.children.map(dfs);

  // se algum filho já achou a resposta, propaga
  const found = childResults.find((r) => r.correctedWeight !== undefined);
  if (found) {
    return found;
  }

  const childWeights = childResults.map((r) => r.totalWeight);

  if (childWeights.length > 0) {
    const counts = new Map<number, number>();

    for (const w of childWeights) {
      counts.set(w, (counts.get(w) ?? 0) + 1);
    }

    // desequilíbrio encontrado neste nó
    if (counts.size > 1) {
      const entries = [...counts.entries()];

      const [correctWeight] = entries.find(([, c]) => c > 1)!;
      const [wrongWeight] = entries.find(([, c]) => c === 1)!;

      const wrongChildIndex = childWeights.indexOf(wrongWeight);
      const wrongChild = node.children[wrongChildIndex];

      const diff = correctWeight - wrongWeight;

      return {
        totalWeight: 0, // irrelevante daqui pra cima
        correctedWeight: wrongChild.weight + diff,
      };
    }
  }

  const totalWeight = node.weight + childWeights.reduce((a, b) => a + b, 0);

  return { totalWeight };
}

export function part2Run(programs: Program[]) {
  const root = buildTree(programs);
  const result = dfs(root);

  if (result.correctedWeight === undefined) {
    throw new Error("No imbalance found");
  }

  return result.correctedWeight;
}
