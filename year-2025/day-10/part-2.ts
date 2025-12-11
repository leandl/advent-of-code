import { parseInstructions } from "./utils";

// simplex + branch-and-bound (conversão do seu Python)
// Nota: fiel ao algoritmo original; mantém EPS e lógica.
// Entradas: buttonGroups: number[][] (ex: [[0,2],[1,3,4], ...])
//          joltageValues: number[] (ex: [3,5,4,7])
// Retorno: número mínimo de apertos (inteiro) ou null se inviável.

const EPS = 1e-9;
const INF = Number.POSITIVE_INFINITY;

type Matrix = number[][];

// --- Simplex solver (returns [objectiveValue, solutionVector|null]) ---
function simplex(
  constraints: Matrix,
  objectiveCoeffs: number[]
): [number, number[] | null] {
  const constraintCount = constraints.length;
  const variableCount = constraints[0].length - 1;

  // nonbasic variables indices and basic variables
  const nonbasicVariables = Array.from(
    { length: variableCount },
    (_, i) => i
  ).concat(-1);
  const basicVariables = Array.from(
    { length: constraintCount },
    (_, i) => variableCount + i
  );

  // build tableau: constraint rows, objective row, aux row
  const tableau: Matrix = [];

  for (let i = 0; i < constraintCount; i++) {
    tableau.push([...constraints[i], -1]); // will swap later like Python
  }
  // objectiveCoeffs + 2 zeros
  tableau.push([...objectiveCoeffs, 0, 0]);
  // last row zeros
  tableau.push(new Array(variableCount + 2).fill(0));

  // swap last two columns for each constraint row (like Python does)
  for (let i = 0; i < constraintCount; i++) {
    const tmp = tableau[i][variableCount];
    tableau[i][variableCount] = tableau[i][variableCount + 1];
    tableau[i][variableCount + 1] = tmp;
  }

  // set tableau[-1][variableCount] = 1 (Python: tableau[-1][variable_count] = 1)
  tableau[tableau.length - 1][variableCount] = 1;

  // pivot helper
  function pivot(pivotRow: number, pivotCol: number) {
    const pivotInverse = 1 / tableau[pivotRow][pivotCol];

    // update all other rows (constraint_count + 2 rows)
    for (let i = 0; i < constraintCount + 2; i++) {
      if (i === pivotRow) continue;
      for (let j = 0; j < variableCount + 2; j++) {
        if (j === pivotCol) continue;
        tableau[i][j] -=
          tableau[pivotRow][j] * tableau[i][pivotCol] * pivotInverse;
      }
    }

    // scale pivot row
    for (let j = 0; j < variableCount + 2; j++) {
      if (j === pivotCol) continue;
      tableau[pivotRow][j] *= pivotInverse;
    }

    // scale pivot column
    for (let i = 0; i < constraintCount + 2; i++) {
      if (i === pivotRow) continue;
      tableau[i][pivotCol] *= -pivotInverse;
    }

    tableau[pivotRow][pivotCol] = pivotInverse;

    // swap variable labels
    const tmpBasic = basicVariables[pivotRow];
    basicVariables[pivotRow] = nonbasicVariables[pivotCol];
    nonbasicVariables[pivotCol] = tmpBasic;
  }

  // find function for phase 0 or 1
  function find(phase: number): number {
    while (true) {
      // choose pivot_col
      let pivot_col = -1;
      // select min over allowed columns
      pivot_col = Array.from({ length: variableCount + 1 }, (_, i) => i)
        .filter((i) => (phase ? true : nonbasicVariables[i] !== -1))
        .reduce((best, i) => {
          if (best === -1) return i;
          const a = tableau[constraintCount + phase][i];
          const b = tableau[constraintCount + phase][best];
          if (a < b - EPS) return i;
          if (Math.abs(a - b) < EPS) {
            // tie-break by nonbasic variable id
            return nonbasicVariables[i] < nonbasicVariables[best] ? i : best;
          }
          return best;
        }, -1);

      if (pivot_col === -1) return 1;

      if (tableau[constraintCount + phase][pivot_col] > -EPS) {
        return 1;
      }

      // choose pivot_row by minimum ratio among rows where tableau[i][pivot_col] > EPS
      let pivot_row = -1;
      let bestKey = Infinity;
      for (let i = 0; i < constraintCount; i++) {
        if (tableau[i][pivot_col] > EPS) {
          const ratio = tableau[i][variableCount + 1] / tableau[i][pivot_col];
          const key = [ratio, basicVariables[i]];
          if (
            pivot_row === -1 ||
            ratio < bestKey - EPS ||
            (Math.abs(ratio - bestKey) < EPS &&
              basicVariables[i] < basicVariables[pivot_row])
          ) {
            pivot_row = i;
            bestKey = ratio;
          }
        }
      }

      if (pivot_row === -1) {
        return 0;
      }

      pivot(pivot_row, pivot_col);
    }
  }

  // initial pivot row selection for artificial variable if needed
  let pivot_row = 0;
  for (let r = 1; r < constraintCount; r++) {
    if (tableau[r][variableCount + 1] < tableau[pivot_row][variableCount + 1])
      pivot_row = r;
  }

  if (tableau[pivot_row][variableCount + 1] < -EPS) {
    pivot(pivot_row, variableCount);
    if (!find(1) || tableau[tableau.length - 1][variableCount + 1] < -EPS) {
      return [-INF, null];
    }
  }

  // ensure no basic variable equals -1
  for (let i = 0; i < constraintCount; i++) {
    if (basicVariables[i] === -1) {
      // choose pivot column by minimal tableau[i][x] (tie-break by nonbasicVariables)
      let bestCol = 0;
      for (let x = 1; x < variableCount; x++) {
        const a = tableau[i][x],
          b = tableau[i][bestCol];
        if (
          a < b - EPS ||
          (Math.abs(a - b) < EPS &&
            nonbasicVariables[x] < nonbasicVariables[bestCol])
        ) {
          bestCol = x;
        }
      }
      pivot(i, bestCol);
    }
  }

  if (!find(0)) {
    return [-INF, null];
  }

  const solutionVector = new Array(variableCount).fill(0);
  for (let i = 0; i < constraintCount; i++) {
    if (0 <= basicVariables[i] && basicVariables[i] < variableCount) {
      solutionVector[basicVariables[i]] = tableau[i][variableCount + 1];
    }
  }

  let objectiveValue = 0;
  for (let i = 0; i < variableCount; i++) {
    objectiveValue += objectiveCoeffs[i] * solutionVector[i];
  }

  return [objectiveValue, solutionVector];
}

// --- Branch and Bound for integer solution ---
function branchAndBound(constraints: Matrix): number | null {
  const variableCount = constraints[0].length - 1;
  let bestObjectiveValue = INF;
  let bestSolution: number[] | null = null;

  function branch(currConstraints: Matrix) {
    const [objectiveValue, solutionVector] = simplex(
      currConstraints,
      Array(variableCount).fill(1)
    );
    if (
      objectiveValue + EPS >= bestObjectiveValue ||
      objectiveValue === -INF ||
      solutionVector === null
    ) {
      return;
    }

    // find fractional variable
    let fractionalIdx = -1;
    let fractionalVal = 0;
    for (let i = 0; i < variableCount; i++) {
      const v = solutionVector[i];
      if (Math.abs(v - Math.round(v)) > EPS) {
        fractionalIdx = i;
        fractionalVal = Math.floor(v);
        break;
      }
    }

    if (fractionalIdx === -1) {
      if (objectiveValue + EPS < bestObjectiveValue) {
        bestObjectiveValue = objectiveValue;
        bestSolution = solutionVector.map((x) => Math.round(x));
      }
    } else {
      // add constraint x_fractional <= floor(value)
      const s1 = Array(variableCount + 1).fill(0);
      s1[fractionalIdx] = 1;
      s1[variableCount] = fractionalVal;
      branch(currConstraints.concat([s1]));

      // add constraint x_fractional >= ceil(value)  => -x_fractional <= -ceil(value)
      const s2 = Array(variableCount + 1).fill(0);
      s2[fractionalIdx] = -1;
      s2[variableCount] = -(fractionalVal + 1);
      branch(currConstraints.concat([s2]));
    }
  }

  branch(constraints);
  return bestObjectiveValue === INF ? null : Math.round(bestObjectiveValue);
}

// --- build constraints like in Python version ---
// buttonsMasks: number[] (bitmask per button) or produce them from button groups
function buildConstraintsFromMasks(
  buttonsMasks: number[],
  joltage: number[]
): Matrix {
  const variableCount = joltage.length;
  const buttonCount = buttonsMasks.length;

  // 2*variableCount + buttonCount rows, buttonCount+1 cols
  const constraints: Matrix = Array.from(
    { length: 2 * variableCount + buttonCount },
    () => Array(buttonCount + 1).fill(0)
  );

  for (let i = 0; i < buttonCount; i++) {
    // constraints[~i][i] = -1  -> ~i in Python is -i-1; mapping: row index = (rows - 1) - i
    const rowForNeg = 2 * variableCount + buttonCount - 1 - i;
    constraints[rowForNeg][i] = -1;
    for (let bitPos = 0; bitPos < variableCount; bitPos++) {
      if ((buttonsMasks[i] >> bitPos) & 1) {
        constraints[bitPos][i] = 1;
        constraints[bitPos + variableCount][i] = -1;
      }
    }
  }

  for (let i = 0; i < variableCount; i++) {
    constraints[i][buttonCount] = joltage[i];
    constraints[i + variableCount][buttonCount] = -joltage[i];
  }

  return constraints;
}

// Utility to convert buttonGroups (arrays of indices) to bitmasks
function buttonGroupsToMasks(
  buttonGroups: number[][],
  variableCount: number
): number[] {
  return buttonGroups.map((g) => {
    let mask = 0;
    for (const idx of g) {
      mask |= 1 << idx;
    }
    return mask;
  });
}

// Public function: solve one machine
export function solveMachineJoltageLP(
  buttonGroups: number[][],
  joltageValues: number[]
): number | null {
  const masks = buttonGroupsToMasks(buttonGroups, joltageValues.length);
  const constraints = buildConstraintsFromMasks(masks, joltageValues);
  return branchAndBound(constraints);
}

// helper: run over many instructions
export function part2Run(lines: string[]): number {
  const instructions = parseInstructions(lines);
  let sum = 0;
  for (const instr of instructions) {
    const presses = solveMachineJoltageLP(
      instr.buttonToggleGroups,
      instr.joltageValues
    );
    if (presses != null) sum += presses;
  }
  return sum;
}
