
/**
 * -Stolen-, borrowed from Phaser
 */
export function wrap (value, min, max) {
  let range = max - min
  if (range <= 0) {
    return 0
  }
  let res = (value - min) % range
  if (res < 0) {
    res += range
  }
  return res + min
}
