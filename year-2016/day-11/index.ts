import { State, solve } from "./utils";

// const state1: State = {
//   elevator: 0,
//   pairs: [
//     { chip: 0, generator: 1 }, // Hydrogen
//     { chip: 0, generator: 2 }, // Lithium
//   ],
// };

const state1: State = {
  elevator: 0,
  pairs: [
    { chip: 1, generator: 0 }, // Polonium
    { chip: 0, generator: 0 }, // Thulium
    { chip: 1, generator: 0 }, // Promethium
    { chip: 0, generator: 0 }, // Ruthenium
    { chip: 0, generator: 0 }, // Cobalt
  ],
};

const resultPart1 = solve(state1);
console.log("Result Part 1: ", resultPart1);

const state2: State = {
  elevator: 0,
  pairs: [
    { chip: 1, generator: 0 }, // Polonium
    { chip: 0, generator: 0 }, // Thulium
    { chip: 1, generator: 0 }, // Promethium
    { chip: 0, generator: 0 }, // Ruthenium
    { chip: 0, generator: 0 }, // Cobalt
    { chip: 0, generator: 0 }, // Elerium
    { chip: 0, generator: 0 }, // Dilithium
  ],
};

const resultPart2 = solve(state2);
console.log("Result Part 2: ", resultPart2);
