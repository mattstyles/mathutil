
/**
 * Returns minimum number in a set
 */
export function min (set) {
  return set.reduce((min, next) => {
    return next < min ? next : min
  }, Number.MAX_SAFE_INTEGER)
}
