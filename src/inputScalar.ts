import {Point} from './point'

export type Position = [number, number]
export type InputPoint = Point | {x: number; y: number} | Position

export function massageInputPoint(x: InputPoint) {
  if (x instanceof Point) {
    return x.pos
  }

  if ('x' in x && 'y' in x) {
    return [x.x, x.y]
  }

  return x
}
