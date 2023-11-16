function _performWrap(value: number, min: number, max: number): number {
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

type CurriedReturn = (value: number) => number

function _curryWrap(min: number, max: number): CurriedReturn {
  return function wrap(value) {
    return _performWrap(value, min, max)
  }
}

/**
 * ~Stolen~, borrowed from Phaser
 */
export function wrap(min: number, max: number): CurriedReturn
export function wrap(min: number, max: number, value: number): number
export function wrap(
  min: number,
  max: number,
  value?: number,
): CurriedReturn | number {
  if (typeof value === 'undefined') {
    return _curryWrap(min, max)
  }

  return _performWrap(value, min, max)
}
