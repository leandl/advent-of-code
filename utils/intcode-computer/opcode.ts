export enum Opcode {
  HALT = 99,

  ADD = 1,
  MULTIPLY = 2,
  INPUT = 3,
  OUTPUT = 4,

  JUMP_IF_TRUE = 5,
  JUMP_IF_FALSE = 6,

  LESS_THAN = 7,
  EQUALS = 8,

  ADJUST_RELATIVE_BASE = 9,
}
