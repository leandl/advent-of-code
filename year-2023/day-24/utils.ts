export type HailData = {
  px: Float64Array;
  py: Float64Array;
  vx: Float64Array;
  vy: Float64Array;
};

export function parseHail(lines: string[]): HailData {
  const n = lines.length;

  const px = new Float64Array(n);
  const py = new Float64Array(n);
  const vx = new Float64Array(n);
  const vy = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    const s = lines[i];

    let idx = 0;

    function readNumber(): number {
      let sign = 1;
      let num = 0;

      // pular espaços
      while (s[idx] === " ") idx++;

      if (s[idx] === "-") {
        sign = -1;
        idx++;
      }

      while (idx < s.length) {
        const c = s.charCodeAt(idx);
        if (c < 48 || c > 57) break;
        num = num * 10 + (c - 48);
        idx++;
      }

      return num * sign;
    }

    px[i] = readNumber();
    idx++; // ,
    py[i] = readNumber();
    idx++; // ,
    readNumber(); // pz (ignorado)

    idx += 3; // " @ "

    vx[i] = readNumber();
    idx++; // ,
    vy[i] = readNumber();
    // vz ignorado
  }

  return { px, py, vx, vy };
}

export type Vec3 = [number, number, number];

export type Hail3DData = {
  p: Vec3[];
  v: Vec3[];
};

export function parseHail3D(lines: string[]): Hail3DData {
  const p: Vec3[] = [];
  const v: Vec3[] = [];

  for (const line of lines) {
    const [a, b] = line.split(" @ ");
    const [x, y, z] = a.split(", ").map(Number);
    const [vx, vy, vz] = b.split(", ").map(Number);

    p.push([x, y, z]);
    v.push([vx, vy, vz]);
  }

  return { p, v };
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

type Hail = {
  p: Vec3;
  v: Vec3;
};

export function toHailArray(data: Hail3DData): Hail[] {
  const n = data.p.length;
  const res = new Array<Hail>(n);

  for (let i = 0; i < n; i++) {
    res[i] = {
      p: data.p[i],
      v: data.v[i],
    };
  }

  return res;
}

export function buildSystem(hails: Hail[]) {
  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 2; i++) {
    const hi = hails[i];
    const hj = hails[i + 1];

    const ci = cross(hi.p, hi.v);
    const cj = cross(hj.p, hj.v);

    // equivalente ao [::-1]
    b.push(ci[2] - cj[2]);
    b.push(ci[1] - cj[1]);
    b.push(ci[0] - cj[0]);

    // row 1
    A.push([
      +(hi.v[1] - hj.v[1]),
      -(hi.v[0] - hj.v[0]),
      0,
      -(hi.p[1] - hj.p[1]),
      +(hi.p[0] - hj.p[0]),
      0,
    ]);

    // row 2
    A.push([
      -(hi.v[2] - hj.v[2]),
      0,
      +(hi.v[0] - hj.v[0]),
      +(hi.p[2] - hj.p[2]),
      0,
      -(hi.p[0] - hj.p[0]),
    ]);

    // row 3
    A.push([
      0,
      +(hi.v[2] - hj.v[2]),
      -(hi.v[1] - hj.v[1]),
      0,
      -(hi.p[2] - hj.p[2]),
      +(hi.p[1] - hj.p[1]),
    ]);
  }

  return { A, b };
}

export function solveLinear(A: number[][], b: number[]): number[] | null {
  const n = 6;

  // augment
  for (let i = 0; i < n; i++) {
    A[i].push(b[i]);
  }

  for (let i = 0; i < n; i++) {
    // pivot
    let pivot = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(A[j][i]) > Math.abs(A[pivot][i])) {
        pivot = j;
      }
    }

    if (Math.abs(A[pivot][i]) < 1e-9) return null;

    [A[i], A[pivot]] = [A[pivot], A[i]];

    // normalize
    const div = A[i][i];
    for (let j = i; j <= n; j++) A[i][j] /= div;

    // eliminate
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const factor = A[j][i];
      for (let k = i; k <= n; k++) {
        A[j][k] -= factor * A[i][k];
      }
    }
  }

  return A.map((row) => row[n]);
}

export function validate(sol: number[], h: Hail[]): boolean {
  const [rx, ry, rz, vx, vy, vz] = sol;

  for (let i = 0; i < 3; i++) {
    const hi = h[i];

    const t = (hi.p[0] - rx) / (vx - hi.v[0]);
    if (!Number.isFinite(t)) return false;

    const y = ry + vy * t;
    const z = rz + vz * t;

    if (Math.abs(y - (hi.p[1] + hi.v[1] * t)) > 1e-6) return false;
    if (Math.abs(z - (hi.p[2] + hi.v[2] * t)) > 1e-6) return false;
  }

  return true;
}
