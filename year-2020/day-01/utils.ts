export function sum(...numbers: number[]) {
  return numbers.reduce((total, n) => total + n, 0);
}

export function multiply(...numbers: number[]) {
  return numbers.reduce((total, n) => total * n, 1);
}
