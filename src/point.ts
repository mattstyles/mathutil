import type {InputPoint, Position} from './inputScalar'

import {massageInputPoint} from './inputScalar'

export class Point {
  pos: Position

  constructor(x: number, y: number) {
    this.pos = [x, y]
  }

  static of(x: InputPoint | number, y?: number) {
    if (typeof x === 'number' && y != null) {
      return new Point(x, y)
    }

    const p = massageInputPoint(x)
    return new Point(p[0], p[1])
  }

  static translate(from: InputPoint, to: InputPoint) {
    const f = massageInputPoint(from)
    const t = massageInputPoint(to)
    return Point.of(f[0] + t[0], f[1] + t[1])
  }

  get x(): number {
    return this.pos[0]
  }

  get y(): number {
    return this.pos[1]
  }

  set x(value: number): void {
    this.pos[0] = value
  }

  set y(value: number): void {
    this.pos[1] = value
  }

  position(): Position {
    return this.pos
  }

  equal(x: InputPoint | number, y?: number): boolean {
    if (typeof x === 'number' && y != null) {
      return this.x === x && this.y === y
    }

    const p = massageInputPoint(x)
    return this.equal(p[0], p[1])
  }

  equals(x: InputPoint | number, y?: number): boolean {
    return this.equal(x, y)
  }

  translate(x: InputPoint | number, y?: number): this {
    if (typeof x === 'number' && y != null) {
      this.x += x
      this.y += y
      return this
    }

    const p = massageInputPoint(x)
    return this.translate(p.x, p.y)
  }
}
