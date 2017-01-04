
/**
 * Returns maximum number in a set of values
 */
export function max (set) {
  return set.reduce((max, next) => {
    return next > max ? next : max
  }, Number.MIN_SAFE_INTEGER)
}
