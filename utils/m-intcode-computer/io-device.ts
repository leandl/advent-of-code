export interface IODevice {
  input(): number;
  output(value: number): void;
}
