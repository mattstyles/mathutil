import type {InputPoint} from './inputScalar.ts'
import {massageInputPoint} from './inputScalar.ts'

/**
 * Returns straight-line distance between two points
 */
export function euclidean(a: InputPoint, b: InputPoint): number {
  const x = massageInputPoint(a)
  const y = massageInputPoint(b)
  return Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2))
}
