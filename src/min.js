const reduceMin = (min, next) => {
  return next < min ? next : min
}

/**
 * Returns minimum number in a set
 */
export function min(set) {
  let m = Number.MAX_SAFE_INTEGER
  for (const i of set) {
    m = reduceMin(m, i)
  }
  return m
}
