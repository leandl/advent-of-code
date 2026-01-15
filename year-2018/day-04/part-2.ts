type SleepData = {
  minutes: number[]; // frequência por minuto
};

export function part2Run(lines: string[]) {
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
        guards.set(id, { minutes: Array(60).fill(0) });
      }
    } else if (record.includes("falls asleep")) {
      sleepStart = minute;
    } else if (record.includes("wakes up")) {
      const data = guards.get(currentGuard)!;

      for (let m = sleepStart; m < minute; m++) {
        data.minutes[m]++;
      }
    }
  }

  // Encontrar o (guarda, minuto) com maior frequência
  let bestGuard = 0;
  let bestMinute = 0;
  let maxCount = 0;

  for (const [guardId, data] of guards.entries()) {
    for (let m = 0; m < 60; m++) {
      if (data.minutes[m] > maxCount) {
        maxCount = data.minutes[m];
        bestGuard = guardId;
        bestMinute = m;
      }
    }
  }

  return bestGuard * bestMinute;
}
