export const openToClose: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

export const scoreTable: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export const autocompleteScoreTable: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};
