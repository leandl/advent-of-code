type Op = "+" | "-" | "*" | "/";

export type Job =
  | { type: "number"; value: number }
  | { type: "op"; left: string; right: string; op: Op };

export function parseMonkeyJobs(lines: string[]): Map<string, Job> {
  const map = new Map<string, Job>();

  for (const line of lines) {
    const [name, job] = line.split(": ");

    if (/^\d+$/.test(job)) {
      map.set(name, { type: "number", value: Number(job) });
    } else {
      const [left, op, right] = job.split(" ") as [string, Op, string];
      map.set(name, { type: "op", left, right, op });
    }
  }

  return map;
}

export function evaluate(
  name: string,
  jobs: Map<string, Job>,
  memo = new Map<string, number>(),
): number {
  if (memo.has(name)) return memo.get(name)!;

  const job = jobs.get(name);
  if (!job) throw new Error(`Monkey ${name} not found`);

  if (job.type === "number") {
    memo.set(name, job.value);
    return job.value;
  }

  const left = evaluate(job.left, jobs, memo);
  const right = evaluate(job.right, jobs, memo);

  let result: number;

  switch (job.op) {
    case "+":
      result = left + right;
      break;
    case "-":
      result = left - right;
      break;
    case "*":
      result = left * right;
      break;
    case "/":
      result = left / right;
      break;
  }

  memo.set(name, result);
  return result;
}
