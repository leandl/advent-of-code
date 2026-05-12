import { IntcodeComputer } from ".";
import { Opcode } from "./opcode";
import { CPURegister } from "./registers";

export enum ParameterMode {
  POSITION = 0,
  IMMEDIATE = 1,
  RELATIVE = 2,
}

export const Addressing = {
  read(cpu: IntcodeComputer, offset: number, mode: number): number {
    const param = cpu.read(cpu.registers.PC + offset);

    switch (mode) {
      case ParameterMode.POSITION:
        return cpu.read(param);

      case ParameterMode.IMMEDIATE:
        return param;

      case ParameterMode.RELATIVE:
        return cpu.read(cpu.registers[CPURegister.RELATIVE_BASE] + param);

      default:
        throw new Error("Invalid mode");
    }
  },

  write(cpu: IntcodeComputer, offset: number, mode: number): number {
    const param = cpu.read(cpu.registers.PC + offset);

    if (mode === ParameterMode.RELATIVE) {
      return cpu.registers[CPURegister.RELATIVE_BASE] + param;
    }

    return param;
  },
};

export type ParameterModes = [ParameterMode, ParameterMode, ParameterMode];

export type DecodedInstruction = {
  opcode: Opcode;
  modes: ParameterModes;
};

export function decode(value: number): DecodedInstruction {
  return {
    opcode: value % 100,
    modes: [
      (Math.floor(value / 100) % 10) as ParameterMode,
      (Math.floor(value / 1000) % 10) as ParameterMode,
      (Math.floor(value / 10000) % 10) as ParameterMode,
    ],
  };
}
