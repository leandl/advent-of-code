import { parseInstructions } from "./utils";

function solveMachine(pattern: boolean[], buttonGroups: number[][]): number {
  const n = pattern.length;
  const m = buttonGroups.length;

  // Matriz A (n x m) mod 2
  const A = Array.from({ length: n }, () => Array(m).fill(0));

  // Preenche matriz de toggles
  for (let j = 0; j < m; j++) {
    for (const light of buttonGroups[j]) {
      A[light][j] = 1;
    }
  }

  // Vetor b (target)
  const b: number[] = pattern.map((v) => (v ? 1 : 0));

  // Gauss mod 2
  let row = 0;
  const pivotPos: number[] = Array(n).fill(-1);

  for (let col = 0; col < m && row < n; col++) {
    // encontra linha com 1 na coluna
    let pivot = row;
    while (pivot < n && A[pivot][col] === 0) pivot++;

    if (pivot === n) continue;

    // troca linhas
    [A[row], A[pivot]] = [A[pivot], A[row]];
    [b[row], b[pivot]] = [b[pivot], b[row]];

    pivotPos[row] = col;

    // zera outras linhas
    for (let r = 0; r < n; r++) {
      if (r !== row && A[r][col] === 1) {
        for (let c = col; c < m; c++) {
          A[r][c] ^= A[row][c];
        }
        b[r] ^= b[row];
      }
    }

    row++;
  }

  // verifica inconsistências
  for (let r = row; r < n; r++) {
    if (b[r] === 1) return Infinity; // sem solução
  }

  // constrói solução particular
  const x0 = Array(m).fill(0);

  for (let r = 0; r < row; r++) {
    const col = pivotPos[r];
    x0[col] = b[r];
  }

  // variáveis livres = não pivôs
  const freeVars = [];
  for (let col = 0; col < m; col++) {
    if (!pivotPos.includes(col)) freeVars.push(col);
  }

  // se não há variáveis livres → solução única
  if (freeVars.length === 0) {
    return x0.reduce((a, b) => a + b, 0);
  }

  // se há variáveis livres → gerar todas combinações
  const k = freeVars.length;
  let best = Infinity;

  for (let mask = 0; mask < 1 << k; mask++) {
    const x = [...x0];

    for (let i = 0; i < k; i++) {
      if (mask & (1 << i)) {
        const freeCol = freeVars[i];

        // somar vetor do espaço nulo
        for (let r = 0; r < n; r++) {
          if (A[r][freeCol] === 1) {
            const pivotCol = pivotPos[r];
            if (pivotCol !== -1) x[pivotCol] ^= 1;
          }
        }

        x[freeCol] ^= 1;
      }
    }

    best = Math.min(
      best,
      x.reduce((a, b) => a + b, 0)
    );
  }

  return best;
}

export function part1Run(lines: string[]): number {
  const instructions = parseInstructions(lines);

  let sun = 0;
  for (const instruction of instructions) {
    sun += solveMachine(
      instruction.indicatorPattern,
      instruction.buttonToggleGroups
    );
  }

  return sun;
}
