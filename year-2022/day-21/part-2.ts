import { evaluate, Job } from "./utils";

function dependsOnHumn(name: string, jobs: Map<string, Job>): boolean {
  if (name === "humn") return true;

  const job = jobs.get(name)!;
  if (job.type === "number") return false;

  return dependsOnHumn(job.left, jobs) || dependsOnHumn(job.right, jobs);
}

function solveFor(
  name: string,
  target: number,
  jobs: Map<string, Job>,
): number {
  if (name === "humn") {
    return target;
  }

  const job = jobs.get(name)!;
  if (job.type === "number") {
    throw new Error("Unexpected number node");
  }

  const leftDepends = dependsOnHumn(job.left, jobs);

  if (leftDepends) {
    const rightVal = evaluate(job.right, jobs);

    switch (job.op) {
      case "+":
        return solveFor(job.left, target - rightVal, jobs);
      case "-":
        return solveFor(job.left, target + rightVal, jobs);
      case "*":
        return solveFor(job.left, target / rightVal, jobs);
      case "/":
        return solveFor(job.left, target * rightVal, jobs);
    }
  } else {
    const leftVal = evaluate(job.left, jobs);

    switch (job.op) {
      case "+":
        return solveFor(job.right, target - leftVal, jobs);
      case "-":
        return solveFor(job.right, leftVal - target, jobs);
      case "*":
        return solveFor(job.right, target / leftVal, jobs);
      case "/":
        return solveFor(job.right, leftVal / target, jobs);
    }
  }
}

export function part2Run(jobs: Map<string, Job>) {
  const root = jobs.get("root")!;
  if (root.type !== "op") throw new Error("root must be op");

  const leftDepends = dependsOnHumn(root.left, jobs);

  if (leftDepends) {
    const rightVal = evaluate(root.right, jobs);
    return solveFor(root.left, rightVal, jobs);
  } else {
    const leftVal = evaluate(root.left, jobs);
    return solveFor(root.right, leftVal, jobs);
  }
}
