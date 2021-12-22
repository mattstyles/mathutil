function _performWrap(value, min, max) {
  const range = max - min
  if (range <= 0) {
    return 0
  }
  let res = (value - min) % range
  if (res < 0) {
    res += range
  }
  return res + min
}

function _curryWrap(min, max) {
  return function wrap(value) {
    return _performWrap(value, min, max)
  }
}

/**
 * -Stolen-, borrowed from Phaser
 */
export function wrap(min, max, value) {
  if (typeof value === 'undefined') {
    return _curryWrap(min, max)
  }

  return _performWrap(value, min, max)
}
