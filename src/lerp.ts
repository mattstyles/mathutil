function _performLerp(value: number, min: number, max: number): number {
  return min + value * (max - min)
}

type CurriedReturn = (value: number) => number

function _curryLerp(min: number, max: number): CurriedReturn {
  return function lerp(value) {
    return _performLerp(value, min, max)
  }
}

/**
 * Interpolates between 2 values.
 * `value` is optional and can be curried.
 * `value` range 0...1 corresponds to min...max, if the value falls outside of
 * 0...1 then projection will occur.
 * @param min <Number> the minimum boundary
 * @param max <Number> the maximum boundary
 * @param value <?Float> the interpolation value
 */
export function lerp(min: number, max: number): CurriedReturn
export function lerp(min: number, max: number, value: number): number
export function lerp(
  min: number,
  max: number,
  value?: number
): CurriedReturn | number {
  if (typeof value === 'undefined') {
    return _curryLerp(min, max)
  }

  return _performLerp(value, min, max)
}
