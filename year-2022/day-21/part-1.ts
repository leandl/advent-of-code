import { evaluate, Job } from "./utils";

export function part1Run(jobs: Map<string, Job>) {
  return evaluate("root", jobs);
}
