
function _performClamp (value, min, max) {
  return value < min
    ? min
    : value > max
      ? max
      : value
}

function _curryClamp (min, max) {
  return function clamp (value) {
    return _performClamp(value, min, max)
  }
}

export function clamp (min, max, value) {
  if (typeof value === 'undefined') {
    return _curryClamp(min, max)
  }

  return _performClamp(value, min, max)
}
