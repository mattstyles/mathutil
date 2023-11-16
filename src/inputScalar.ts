import {Point} from './point.ts'
import {Vector2} from './vector2.ts'

export type Position = [number, number]
export type InputPoint = Point | {x: number; y: number} | Position | number

export function massageInputPoint(x: InputPoint): Position {
  if (x instanceof Point) {
    return x.pos
  }

  if (typeof x === 'number') {
    return [x, x]
  }

  if ('x' in x && 'y' in x) {
    return [x.x, x.y]
  }

  return x
}

export type InputVector = Vector2 | Position | {x: number; y: number} | number
export function massageVectorInput(x: InputVector): Position {
  if (x instanceof Vector2) {
    return x.pos
  }

  if (typeof x === 'number') {
    return [x, x]
  }

  if ('x' in x && 'y' in x) {
    return [x.x, x.y]
  }

  return x
}
