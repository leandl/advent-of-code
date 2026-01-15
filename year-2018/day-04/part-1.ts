type SleepData = {
  total: number;
  minutes: number[]; // índice = minuto (0–59), valor = vezes dormindo
};

export function part1Run(lines: string[]) {
  // 1. Ordenar cronologicamente
  const records = [...lines].sort();

  const guards = new Map<number, SleepData>();

  let currentGuard = 0;
  let sleepStart = 0;

  for (const record of records) {
    const minute = Number(record.slice(15, 17));

    if (record.includes("Guard")) {
      const id = Number(record.match(/#(\d+)/)![1]);
      currentGuard = id;

      if (!guards.has(id)) {
        guards.set(id, {
          total: 0,
          minutes: Array(60).fill(0),
        });
      }
    } else if (record.includes("falls asleep")) {
      sleepStart = minute;
    } else if (record.includes("wakes up")) {
      const data = guards.get(currentGuard)!;

      for (let m = sleepStart; m < minute; m++) {
        data.minutes[m]++;
        data.total++;
      }
    }
  }

  // 2. Encontrar o guarda que mais dormiu
  let sleepiestGuard = 0;
  let maxSleep = 0;

  for (const [id, data] of guards.entries()) {
    if (data.total > maxSleep) {
      maxSleep = data.total;
      sleepiestGuard = id;
    }
  }

  // 3. Encontrar o minuto mais dormido desse guarda
  const minutes = guards.get(sleepiestGuard)!.minutes;
  let bestMinute = 0;
  let bestCount = 0;

  for (let m = 0; m < 60; m++) {
    if (minutes[m] > bestCount) {
      bestCount = minutes[m];
      bestMinute = m;
    }
  }

  return sleepiestGuard * bestMinute;
}
