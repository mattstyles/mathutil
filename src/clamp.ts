function _performClamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value
}

function _curryClamp(min: number, max: number): CurriedReturn {
  return function clamp(value) {
    return _performClamp(value, min, max)
  }
}

type CurriedReturn = (value: number) => number

export function clamp(min: number, max: number): CurriedReturn
export function clamp(min: number, max: number, value: number): number
export function clamp(
  min: number,
  max: number,
  value?: number
): CurriedReturn | number {
  if (typeof value === 'undefined') {
    return _curryClamp(min, max)
  }

  return _performClamp(value, min, max)
}
