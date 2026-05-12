type MachinePart = {
  x: number;
  m: number;
  a: number;
  s: number;
};

type ConditionalRule = {
  type: "condition";
  field: keyof MachinePart;
  operator: "<" | ">";
  threshold: number;
  destination: string;
};

type DefaultRule = {
  type: "default";
  destination: string;
};

type WorkflowRule = ConditionalRule | DefaultRule;

type WorkflowMap = Record<string, WorkflowRule[]>;

// --------------------
// PARSE INPUT
// --------------------

export type PuzzleData = {
  workflowMap: WorkflowMap;
  machineParts: MachinePart[];
};

export function parseWorkflowsAndParts(input: string): PuzzleData {
  const [rawWorkflows, rawParts] = input.trim().split("\n\n");

  const workflows: WorkflowMap = {};

  for (const line of rawWorkflows.split("\n")) {
    const [workflowName, rulesBlock] = line.split("{");
    const rulesContent = rulesBlock.slice(0, -1); // remove '}'

    const parsedRules: WorkflowRule[] = rulesContent
      .split(",")
      .map((ruleStr) => {
        if (!ruleStr.includes(":")) {
          return {
            type: "default",
            destination: ruleStr,
          };
        }

        const [condition, destination] = ruleStr.split(":");

        const field = condition[0] as keyof MachinePart;
        const operator = condition[1] as "<" | ">";
        const threshold = Number(condition.slice(2));

        return {
          type: "condition",
          field,
          operator,
          threshold,
          destination,
        };
      });

    workflows[workflowName] = parsedRules;
  }

  const parts: MachinePart[] = rawParts.split("\n").map((line) => {
    const part: Partial<MachinePart> = {};

    line
      .slice(1, -1)
      .split(",")
      .forEach((entry) => {
        const [key, value] = entry.split("=");
        part[key as keyof MachinePart] = Number(value);
      });

    return part as MachinePart;
  });

  return { workflowMap: workflows, machineParts: parts };
}

// --------------------
// WORKFLOW EXECUTION
// --------------------

export function isPartAccepted(
  part: MachinePart,
  workflows: WorkflowMap,
): boolean {
  let currentWorkflow = "in";

  while (true) {
    const rules = workflows[currentWorkflow];

    for (const rule of rules) {
      if (rule.type === "default") {
        if (rule.destination === "A") return true;
        if (rule.destination === "R") return false;

        currentWorkflow = rule.destination;
        break;
      }

      const partValue = part[rule.field];

      const conditionMatches =
        rule.operator === "<"
          ? partValue < rule.threshold
          : partValue > rule.threshold;

      if (conditionMatches) {
        if (rule.destination === "A") return true;
        if (rule.destination === "R") return false;

        currentWorkflow = rule.destination;
        break;
      }
    }
  }
}

type Range = { min: number; max: number };

type MachinePartRange = {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
};

function countCombinations(range: MachinePartRange): number {
  return (
    (range.x.max - range.x.min + 1) *
    (range.m.max - range.m.min + 1) *
    (range.a.max - range.a.min + 1) *
    (range.s.max - range.s.min + 1)
  );
}

function splitRange(
  range: Range,
  operator: "<" | ">",
  threshold: number,
): { match?: Range; rest?: Range } {
  if (operator === "<") {
    const match =
      range.min < threshold
        ? { min: range.min, max: Math.min(range.max, threshold - 1) }
        : undefined;

    const rest =
      range.max >= threshold
        ? { min: Math.max(range.min, threshold), max: range.max }
        : undefined;

    return { match, rest };
  } else {
    const match =
      range.max > threshold
        ? { min: Math.max(range.min, threshold + 1), max: range.max }
        : undefined;

    const rest =
      range.min <= threshold
        ? { min: range.min, max: Math.min(range.max, threshold) }
        : undefined;

    return { match, rest };
  }
}

export function countAcceptedCombinations(workflows: WorkflowMap): number {
  const initial: MachinePartRange = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 },
  };

  function dfs(range: MachinePartRange, workflowName: string): number {
    if (workflowName === "A") return countCombinations(range);
    if (workflowName === "R") return 0;

    let total = 0;
    let currentRange = { ...range };

    for (const rule of workflows[workflowName]) {
      if (rule.type === "default") {
        total += dfs(currentRange, rule.destination);
        break;
      }

      const { field, operator, threshold, destination } = rule;

      const { match, rest } = splitRange(
        currentRange[field],
        operator,
        threshold,
      );

      // Parte que satisfaz a regra
      if (match) {
        const nextRange: MachinePartRange = {
          ...currentRange,
          [field]: match,
        };

        total += dfs(nextRange, destination);
      }

      // Continua com o restante para próxima regra
      if (rest) {
        currentRange = {
          ...currentRange,
          [field]: rest,
        };
      } else {
        break;
      }
    }

    return total;
  }

  return dfs(initial, "in");
}
