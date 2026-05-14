import { IntcodeComputer } from "../../utils/intcode-computer";
import { restoreGravityAssist } from "./utils";

export function part2Run(program: number[]) {
  const target = 19690720;

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const restoredProgram = restoreGravityAssist(program, noun, verb);
      const computer = new IntcodeComputer(restoredProgram);

      while (true) {
        const response = computer.run();
        if (response.type === "halt") break;
      }

      const result = computer.read(0);

      if (result === target) {
        return 100 * noun + verb;
      }
    }
  }

  throw new Error("Nenhuma combinação encontrada");
}
