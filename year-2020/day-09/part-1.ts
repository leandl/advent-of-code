import { findFirstInvalidNumber, XmasEncodingParams } from "./utils";

export function part1Run({ numbers, preambleLength }: XmasEncodingParams) {
  return findFirstInvalidNumber({ numbers, preambleLength });
}
