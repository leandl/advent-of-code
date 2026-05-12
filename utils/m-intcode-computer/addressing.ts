import type { IntcodeComputer } from ".";

export type AddressResolver = (cpu: IntcodeComputer) => number;

export const Addressing = {
  immediate: (cpu: IntcodeComputer) => cpu.registers.PC++,
};
