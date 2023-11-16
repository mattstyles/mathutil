import type {InputPoint} from './inputScalar.ts'
import {massageInputPoint} from './inputScalar.ts'

export function manhattan(a: InputPoint, b: InputPoint): number {
  const x = massageInputPoint(a)
  const y = massageInputPoint(b)
  return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1])
}
