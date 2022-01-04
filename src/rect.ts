import type {Position, InputPoint} from './inputScalar'

import {Vector2} from './vector2'
import {massageInputPoint} from './inputScalar'

export class Rect {
  pos: [...Position, ...Position]

  /**
   * Creates new Rect instance
   * @constructs
   */
  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.pos = [x1, y1, x2, y2]
  }

  static of(x1: Rect): Rect
  static of(x1: number, y1: number, x2: number, y2: number): Rect
  static of(x1: number | Rect, y1?: number, x2?: number, y2?: number): Rect {
    if (x1 instanceof Rect) {
      return new Rect(x1.pos[0], x1.pos[1], x1.pos[2], x1.pos[3])
    }

    return new Rect(x1, y1, x2, y2)
  }

  /**
   * Calculates the area of the given rectangle
   * @returns <Float>
   */
  static area(rect: Rect): number {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    return (rect.pos[2] - rect.pos[0]) * (rect.pos[3] - rect.pos[1])
  }

  /**
   * Translates the entire rectangle
   * @param x <Float>
   * @param y <Float>
   * @returns <Rect>
   */
  static translate(rect: Rect, x = 0, y = 0): Rect {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    return new Rect(
      rect.pos[0] + x,
      rect.pos[1] + y,
      rect.pos[2] + x,
      rect.pos[3] + y
    )
  }

  /**
   * Scales the rect
   * @param s <Float> scalar
   * @returns <Rect>
   */
  static scale(rect: Rect, s: number): Rect {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    return new Rect(
      rect.pos[0],
      rect.pos[1],
      rect.pos[0] + rect.width * s,
      rect.pos[1] + rect.height * s
    )
  }

  static constrict(rect: Rect, x: number, y?: number) {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    if (y == null) {
      y = x
    }

    return new Rect(
      rect.pos[0] + x,
      rect.pos[1] + y,
      rect.pos[2] - x,
      rect.pos[3] - y
    )
  }

  get width(): number {
    return this.pos[2] - this.pos[0]
  }

  get height(): number {
    return this.pos[3] - this.pos[1]
  }

  get area(): number {
    return this.width * this.height
  }

  get origin(): Position {
    return [this.pos[0], this.pos[1]]
  }

  get x(): number {
    return this.pos[0]
  }

  get y(): number {
    return this.pos[1]
  }

  get x1(): number {
    return this.pos[0]
  }

  get y1(): number {
    return this.pos[1]
  }

  get x2(): number {
    return this.pos[2]
  }

  get y2(): number {
    return this.pos[3]
  }

  setWidth(w: number): this {
    this.pos[2] = this.pos[0] + w
    return this
  }

  setHeight(h: number): this {
    this.pos[3] = this.pos[1] + h
    return this
  }

  floor() {
    this.pos = this.pos.map(Math.floor) as [...Position, ...Position]
    return this
  }

  ceil() {
    this.pos = this.pos.map(Math.ceil) as [...Position, ...Position]
    return this
  }

  round() {
    this.pos[0] = Math.floor(this.pos[0])
    this.pos[1] = Math.floor(this.pos[1])
    this.pos[2] = Math.ceil(this.pos[2])
    this.pos[3] = Math.ceil(this.pos[3])
    return this
  }

  equal(x1: Rect): boolean
  equal(x1: number, y1: number, x2: number, y2: number): boolean
  equal(x1: Rect | number, y1?: number, x2?: number, y2?: number): boolean {
    if (x1 instanceof Rect) {
      return this.equal(...x1.pos)
    }

    return (
      this.pos[0] === x1 &&
      this.pos[1] === y1 &&
      this.pos[2] === x2 &&
      this.pos[3] === y2
    )
  }

  equals(x1: Rect): boolean
  equals(x1: number, y1: number, x2: number, y2: number): boolean
  equals(x1: Rect | number, y1?: number, x2?: number, y2?: number): boolean {
    if (x1 instanceof Rect) {
      return this.equal(...x1.pos)
    }

    return this.equal(x1, y1, x2, y2)
  }

  /**
   * Translates the entire rectangle
   * @param x <Float>
   * @param y <Float>
   * @returns <this>
   */
  translate(x = 0, y = 0) {
    this.pos = [
      this.pos[0] + x,
      this.pos[1] + y,
      this.pos[2] + x,
      this.pos[3] + y,
    ]
    return this
  }

  scale(s: number) {
    this.pos = [
      this.pos[0],
      this.pos[1],
      this.pos[0] + this.width * s,
      this.pos[1] + this.height * s,
    ]

    return this
  }

  constrict(x: number, y?: number) {
    if (y == null) {
      y = x
    }
    this.pos = [
      this.pos[0] + x,
      this.pos[1] + y,
      this.pos[2] - x,
      this.pos[3] - y,
    ]
    return this
  }

  private _containsRect(rect: Rect): boolean {
    const {pos} = this
    return (
      rect.pos[0] >= pos[0] &&
      rect.pos[1] >= pos[1] &&
      rect.pos[2] <= pos[2] &&
      rect.pos[3] <= pos[3]
    )
  }

  contains(x: Rect): boolean
  contains(x: InputPoint): boolean
  contains(x: number, y: number): boolean
  contains(x: Rect | InputPoint, y?: number): boolean {
    if (x instanceof Rect) {
      return this._containsRect(x)
    }

    if (y == null) {
      const [a, b] = massageInputPoint(x)
      return this.contains(a, b)
    }

    const {pos} = this

    return x >= pos[0] && y >= pos[1] && x <= pos[2] && y <= pos[3]
  }

  /**
   * Returns a vector referencing the bottom-left, top-right diagonal
   * @returns <Vector2>
   */
  slope(): Vector2 {
    return new Vector2(this.pos[2] - this.pos[0], this.pos[3] - this.pos[1])
  }
}
