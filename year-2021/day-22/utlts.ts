export type Step = {
  on: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  z1: number;
  z2: number;
};

type Box3D = [[number, number, number], [number, number, number]];

// ---------- INTERSECTION ----------

function intersect(a: Box3D, b: Box3D): Box3D | null {
  const res: Box3D = [
    [
      Math.max(a[0][0], b[0][0]),
      Math.max(a[0][1], b[0][1]),
      Math.max(a[0][2], b[0][2]),
    ],
    [
      Math.min(a[1][0], b[1][0]),
      Math.min(a[1][1], b[1][1]),
      Math.min(a[1][2], b[1][2]),
    ],
  ];

  for (let i = 0; i < 3; i++) {
    if (res[0][i] > res[1][i]) return null;
  }

  return res;
}

// ---------- CUT (remove interseção de um box) ----------

function cut(box: Box3D, cut: Box3D, out: Box3D[]) {
  // X slices
  if (cut[0][0] > box[0][0]) {
    out.push([box[0], [cut[0][0] - 1, box[1][1], box[1][2]]]);
  }

  if (cut[1][0] < box[1][0]) {
    out.push([[cut[1][0] + 1, box[0][1], box[0][2]], box[1]]);
  }

  // Y slices
  if (cut[1][1] < box[1][1]) {
    out.push([
      [cut[0][0], cut[1][1] + 1, box[0][2]],
      [cut[1][0], box[1][1], box[1][2]],
    ]);
  }

  if (cut[0][1] > box[0][1]) {
    out.push([
      [cut[0][0], box[0][1], box[0][2]],
      [cut[1][0], cut[0][1] - 1, box[1][2]],
    ]);
  }

  // Z slices
  if (cut[0][2] > box[0][2]) {
    out.push([
      [cut[0][0], cut[0][1], box[0][2]],
      [cut[1][0], cut[1][1], cut[0][2] - 1],
    ]);
  }

  if (cut[1][2] < box[1][2]) {
    out.push([
      [cut[0][0], cut[0][1], cut[1][2] + 1],
      [cut[1][0], cut[1][1], box[1][2]],
    ]);
  }
}

// ---------- VOLUME ----------

function volume(box: Box3D): bigint {
  return BigInt(
    (box[1][0] - box[0][0] + 1) *
      (box[1][1] - box[0][1] + 1) *
      (box[1][2] - box[0][2] + 1),
  );
}

// ---------- CORE ----------

export function computeReactorVolume(steps: Step[]): bigint {
  let boxes: Box3D[] = [];
  let total = 0n;

  for (const step of steps) {
    const cuboid: Box3D = [
      [step.x1, step.y1, step.z1],
      [step.x2, step.y2, step.z2],
    ];

    if (boxes.length > 0) {
      const newBoxes: Box3D[] = [];

      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        const inter = intersect(cuboid, b);

        if (inter) {
          // remove volume
          total -= volume(inter);

          // cortar box atual em pedaços
          cut(b, inter, newBoxes);

          // invalidar box antigo
          boxes[i] = [
            [0, 0, 0],
            [-1, -1, -1],
          ];
        }
      }

      boxes.push(...newBoxes);
    }

    if (step.on) {
      boxes.push(cuboid);
      total += volume(cuboid);
    }
  }

  return total;
}

// ---------- PARSE ----------

export function parseSteps(lines: string[]): Step[] {
  return lines.map((line) => {
    const [state, rest] = line.split(" ");
    const [x, y, z] = rest.split(",");

    const [x1, x2] = x.slice(2).split("..").map(Number);
    const [y1, y2] = y.slice(2).split("..").map(Number);
    const [z1, z2] = z.slice(2).split("..").map(Number);

    return { on: state === "on", x1, x2, y1, y2, z1, z2 };
  });
}

// ---------- CLAMP (PART 1) ----------

export function clampStep(step: Step, min: number, max: number): Step | null {
  const x1 = Math.max(step.x1, min);
  const x2 = Math.min(step.x2, max);
  const y1 = Math.max(step.y1, min);
  const y2 = Math.min(step.y2, max);
  const z1 = Math.max(step.z1, min);
  const z2 = Math.min(step.z2, max);

  if (x1 > x2 || y1 > y2 || z1 > z2) return null;

  return { ...step, x1, x2, y1, y2, z1, z2 };
}
