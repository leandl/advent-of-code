export enum CPURegister {
  PROGRAM_COUNTER = "PC",
  IS_HALT = "IS_HALT",
}

export class Registers {
  private _pc = 0;
  private _halt = false;

  get [CPURegister.PROGRAM_COUNTER]() {
    return this._pc;
  }

  set [CPURegister.PROGRAM_COUNTER](value: number) {
    this._pc = value & 0xffff;
  }

  get [CPURegister.IS_HALT]() {
    return this._halt;
  }

  halt() {
    this._halt = true;
  }
}
