import { IntcodeComputer } from "../../utils/m-intcode-computer";
import { NullIO } from "../../utils/m-intcode-computer/factories/io/null-io";
import { restoreGravityAssist } from "./utils";

export function part2Run(program: number[]) {
  const target = 19690720;

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const restoredProgram = restoreGravityAssist(program, noun, verb);
      const computer = new IntcodeComputer(restoredProgram, new NullIO());

      computer.run();

      const result = computer.read(0);

      if (result === target) {
        return 100 * noun + verb;
      }
    }
  }

  throw new Error("Nenhuma combinação encontrada");
}
