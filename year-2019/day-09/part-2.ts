import { BoostParams } from "./utils";

export function part2Run({ program, input }: BoostParams) {
  const memory = new Map<number, bigint>();

  program.forEach((value, index) => {
    memory.set(index, BigInt(value));
  });

  const getMemory = (address: number): bigint => {
    if (address < 0) throw new Error(`Invalid memory access at ${address}`);
    return memory.get(address) ?? 0n;
  };

  const setMemory = (address: number, value: bigint) => {
    if (address < 0) throw new Error(`Invalid memory write at ${address}`);
    memory.set(address, value);
  };

  let ip = 0;
  let relativeBase = 0;
  const inputs: bigint[] = [BigInt(input)];
  let lastOutput: bigint = 0n;

  const getParam = (mode: number, offset: number): bigint => {
    const param = getMemory(ip + offset);

    if (mode === 0) return getMemory(Number(param));
    if (mode === 1) return param;
    if (mode === 2) return getMemory(relativeBase + Number(param));

    throw new Error(`Unknown mode ${mode}`);
  };

  const getWriteAddress = (mode: number, offset: number): number => {
    const param = getMemory(ip + offset);

    if (mode === 0) return Number(param);
    if (mode === 2) return relativeBase + Number(param);

    throw new Error(`Invalid write mode ${mode}`);
  };

  while (true) {
    const instruction = Number(getMemory(ip));
    const opcode = instruction % 100;
    const mode1 = Math.floor(instruction / 100) % 10;
    const mode2 = Math.floor(instruction / 1000) % 10;
    const mode3 = Math.floor(instruction / 10000) % 10;

    switch (opcode) {
      case 1:
        setMemory(
          getWriteAddress(mode3, 3),
          getParam(mode1, 1) + getParam(mode2, 2),
        );
        ip += 4;
        break;

      case 2:
        setMemory(
          getWriteAddress(mode3, 3),
          getParam(mode1, 1) * getParam(mode2, 2),
        );
        ip += 4;
        break;

      case 3:
        setMemory(getWriteAddress(mode1, 1), inputs.shift()!);
        ip += 2;
        break;

      case 4:
        lastOutput = getParam(mode1, 1);
        ip += 2;
        break;

      case 5:
        ip = getParam(mode1, 1) !== 0n ? Number(getParam(mode2, 2)) : ip + 3;
        break;

      case 6:
        ip = getParam(mode1, 1) === 0n ? Number(getParam(mode2, 2)) : ip + 3;
        break;

      case 7:
        setMemory(
          getWriteAddress(mode3, 3),
          getParam(mode1, 1) < getParam(mode2, 2) ? 1n : 0n,
        );
        ip += 4;
        break;

      case 8:
        setMemory(
          getWriteAddress(mode3, 3),
          getParam(mode1, 1) === getParam(mode2, 2) ? 1n : 0n,
        );
        ip += 4;
        break;

      case 9:
        relativeBase += Number(getParam(mode1, 1));
        ip += 2;
        break;

      case 99:
        return lastOutput.toString();

      default:
        throw new Error(`Unknown opcode ${opcode} at ${ip}`);
    }
  }
}
