const reduceMax = (max: number, next: number): number => {
  return next > max ? next : max
}

/**
 * Returns minimum number in a set
 */
export function max(set: number[] | Set<number>): number {
  let m = Number.MIN_SAFE_INTEGER
  for (const i of set) {
    m = reduceMax(m, i)
  }
  return m
}
