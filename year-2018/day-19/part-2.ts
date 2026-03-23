import { BoundProgram, ops, Registers } from "./utils";

function sumOfDivisors(n: number): number {
  let sum = 0;

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;

      if (i !== n / i) {
        sum += n / i;
      }
    }
  }

  return sum;
}

export function part2Run({ instructions, ipRegister }: BoundProgram) {
  const registers: Registers = [1, 0, 0, 0, 0, 0];

  let ip = 0;

  for (let step = 0; step < 1000; step++) {
    registers[ipRegister] = ip;

    const { op, a, b, c } = instructions[ip];
    ops[op](registers, a, b, c);

    ip = registers[ipRegister];
    ip++;
  }

  const target = Math.max(...registers);

  return sumOfDivisors(target);
}
