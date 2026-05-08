type Lens = {
  label: string;
  focal: number;
};

function hash(str: string): number {
  let value = 0;

  for (let i = 0; i < str.length; i++) {
    value += str.charCodeAt(i);
    value *= 17;
    value %= 256;
  }

  return value;
}

type StepSet = {
  type: "SET";
  label: string;
  focal: number;
};

type StepRemove = {
  type: "REMOVE";
  label: string;
};

type Step = StepSet | StepRemove;

function parseStep(step: string): Step {
  if (step.includes("=")) {
    const [label, focalStr] = step.split("=");
    return { type: "SET", label, focal: Number(focalStr) };
  } else {
    const label = step.replace("-", "");
    return { type: "REMOVE", label };
  }
}

export function part2Run(input: string) {
  const steps = input.replace(/\n/g, "").split(",");

  // 256 boxes
  const boxes: Array<Lens[]> = Array.from({ length: 256 }, () => []);

  for (const step of steps) {
    const parsed = parseStep(step);
    const boxIndex = hash(parsed.label);

    const box = boxes[boxIndex];

    if (parsed.type === "REMOVE") {
      const idx = box.findIndex((lens) => lens.label === parsed.label);
      if (idx !== -1) {
        box.splice(idx, 1);
      }
    } else {
      const existingIndex = box.findIndex(
        (lens) => lens.label === parsed.label,
      );

      if (existingIndex !== -1) {
        // substitui mantendo posição
        box[existingIndex].focal = parsed.focal;
      } else {
        // adiciona no final
        box.push({ label: parsed.label, focal: parsed.focal });
      }
    }
  }

  // calcula focusing power
  let total = 0;

  for (let b = 0; b < boxes.length; b++) {
    const box = boxes[b];

    for (let i = 0; i < box.length; i++) {
      const lens = box[i];

      const power =
        (b + 1) * // box number + 1
        (i + 1) * // slot position
        lens.focal;

      total += power;
    }
  }

  return total;
}
