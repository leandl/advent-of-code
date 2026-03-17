import { getValue, Instruction, Registers, setRegister } from "./utils";

export function extractBC(
  registers: Registers,
  instructions: Instruction[],
): {
  b: number;
  c: number;
} {
  let ip = 0;

  while (ip >= 0 && ip < instructions.length) {
    const instr = instructions[ip];

    if (instr.op === "jnz" && getValue(registers, instr.y) < 0) {
      break;
    }

    switch (instr.op) {
      case "set":
        setRegister(registers, instr.x, getValue(registers, instr.y));
        break;

      case "sub":
        setRegister(
          registers,
          instr.x,
          getValue(registers, instr.x) - getValue(registers, instr.y),
        );
        break;

      case "mul":
        setRegister(
          registers,
          instr.x,
          getValue(registers, instr.x) * getValue(registers, instr.y),
        );
        break;

      case "jnz":
        if (getValue(registers, instr.x) !== 0) {
          ip += getValue(registers, instr.y);
          continue;
        }
        break;
    }

    ip++;
  }

  return {
    b: registers["b"],
    c: registers["c"],
  };
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

export function part2Run(instructions: Instruction[]) {
  let h = 0;
  const { b, c } = extractBC({ a: 1 }, instructions);

  for (let x = b; x <= c; x += 17) {
    if (!isPrime(x)) {
      h++;
    }
  }

  return h;
}
