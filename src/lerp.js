
function _performLerp (value, min, max) {
  return min + value * (max - min)
}

function _curryLerp (min, max) {
  return function lerp (value) {
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
export function lerp (min, max, value) {
  if (!value) {
    return _curryLerp(min, max)
  }

  return _performLerp(value, min, max)
}
