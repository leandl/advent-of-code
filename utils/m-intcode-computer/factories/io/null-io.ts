import { IODevice } from "../../io-device";

export class NullIO implements IODevice {
  input(): number {
    throw new Error("Input not supported for this program");
  }

  output(_value: number): void {
    // não faz nada
  }
}
