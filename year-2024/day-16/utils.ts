export type Dir = 0 | 1 | 2 | 3; // 0=E, 1=S, 2=W, 3=N

export type State = {
  r: number;
  c: number;
  dir: Dir;
};

export const DR = [0, 1, 0, -1];
export const DC = [1, 0, -1, 0];
