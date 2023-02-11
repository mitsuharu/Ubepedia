/*
TypeScriptでswitch式を実装する。 - Qiita
https://qiita.com/hatakoya/items/018afbfb1bd45136618a
*/

type ChainedWhen<T, R> = {
  on: <A>(pred: (v: T) => boolean, fn: () => A) => ChainedWhen<T, R | A>
  otherwise: <A>(fn: () => A) => R | A
}

const match = <T, R>(val: any): ChainedWhen<T, R> => ({
  on: <A>(pred: (v: T) => boolean, fn: () => A) => match<T, R | A>(val),
  otherwise: <A>(fn: () => A): A | R => val,
})

const chain = <T, R>(val: T): ChainedWhen<T, R> => ({
  on: <A>(pred: (v: T) => boolean, fn: () => A) =>
    pred(val) ? match(fn()) : chain<T, A | R>(val),
  otherwise: <A>(fn: () => A) => fn(),
})

export const when = <T>(val: T) => ({
  on: <A>(pred: (v: T) => boolean, fn: () => A) =>
    pred(val) ? match<T, A>(fn()) : chain<T, A>(val),
})

export const then =
  <T>(value: T) =>
  (): T =>
    value

export const eq =
  <T>(value1: T) =>
  (value2: T): boolean =>
    value1 === value2

export const ne =
  <T>(value1: T) =>
  (value2: T): boolean =>
    value1 !== value2

export const gt =
  <T>(value1: T) =>
  (value2: T): boolean =>
    value1 < value2

export const lt =
  <T>(value1: T) =>
  (value2: T): boolean =>
    value1 > value2

export const ge =
  <T>(value1: T) =>
  (value2: T): boolean =>
    value1 <= value2

export const le =
  <T>(value1: T) =>
  (value2: T): boolean =>
    value1 >= value2
