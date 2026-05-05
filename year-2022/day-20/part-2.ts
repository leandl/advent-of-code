import { Item } from "./utils";

const KEY = 811589153;

export function part2Run(numbers: number[]) {
  const list: Item[] = numbers.map((n, i) => ({
    value: n * KEY,
    id: i,
  }));

  const order = [...list];
  const n = list.length;

  for (let round = 0; round < 10; round++) {
    for (const item of order) {
      const currentIndex = list.findIndex((x) => x.id === item.id);

      list.splice(currentIndex, 1);

      let newIndex = (currentIndex + item.value) % (n - 1);

      if (newIndex < 0) newIndex += n - 1;

      list.splice(newIndex, 0, item);
    }
  }

  const zeroIndex = list.findIndex((x) => x.value === 0);

  const get = (offset: number) => list[(zeroIndex + offset) % n].value;

  return get(1000) + get(2000) + get(3000);
}
