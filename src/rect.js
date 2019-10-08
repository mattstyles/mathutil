
import { Vector2 } from './vector2'
import { Point } from './point'

export class Rect {
  static of (x1, y1, x2, y2) {
    if (x1 instanceof Rect) {
      return new Rect(x1.pos[0], x1.pos[1], x1.pos[2], x1.pos[3])
    }

    return new Rect(x1, y1, x2, y2)
  }

  /**
   * Calculates the area of the given rectangle
   * @returns <Float>
   */
  static area (rect) {
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
  static translate (rect, x = 0, y = 0) {
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
  static scale (rect, s) {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    return new Rect(
      rect.pos[0],
      rect.pos[1],
      rect.pos[0] + (rect.width * s),
      rect.pos[1] + (rect.height * s)
    )
  }

  static constrict (rect, x, y) {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    return new Rect(
      rect.pos[0] + x,
      rect.pos[1] + y,
      rect.pos[2] - x,
      rect.pos[3] - y
    )
  }

  /**
   * Creates new Rect instance
   * @constructs
   */
  constructor (x1, y1, x2, y2) {
    this.pos = [x1, y1, x2, y2]
  }

  get width () {
    return this.pos[2] - this.pos[0]
  }

  get height () {
    return this.pos[3] - this.pos[1]
  }

  setWidth (w) {
    this.pos[2] = this.pos[0] + w
    return this
  }

  setHeight (h) {
    this.pos[3] = this.pos[1] + h
    return this
  }

  floor () {
    this.pos = this.pos.map(Math.floor)
    return this
  }

  ceil () {
    this.pos = this.pos.map(Math.ceil)
    return this
  }

  round () {
    this.pos[0] = Math.floor(this.pos[0])
    this.pos[1] = Math.floor(this.pos[1])
    this.pos[2] = Math.ceil(this.pos[2])
    this.pos[3] = Math.ceil(this.pos[3])
    return this
  }

  equal (x1, y1, x2, y2) {
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

  equals (x1, y1, x2, y2) {
    return this.equal(x1, y1, x2, y2)
  }

  /**
   * Calculates the area of the rectangle
   * @returns <Float>
   */
  area () {
    return (this.pos[2] - this.pos[0]) * (this.pos[3] - this.pos[1])
  }

  /**
   * Translates the entire rectangle
   * @param x <Float>
   * @param y <Float>
   * @returns <this>
   */
  translate (x = 0, y = 0) {
    this.pos = [
      this.pos[0] + x,
      this.pos[1] + y,
      this.pos[2] + x,
      this.pos[3] + y
    ]
    return this
  }

  scale (s) {
    this.pos = [
      this.pos[0],
      this.pos[1],
      this.pos[0] + (this.width * s),
      this.pos[1] + (this.height * s)
    ]

    return this
  }

  constrict (x, y) {
    this.pos = [
      this.pos[0] + x,
      this.pos[1] + y,
      this.pos[2] - x,
      this.pos[3] - y
    ]
    return this
  }

  _containsRect (rect) {
    const { pos } = this
    return (
      rect.pos[0] >= pos[0] &&
      rect.pos[1] >= pos[1] &&
      rect.pos[2] <= pos[2] &&
      rect.pos[3] <= pos[3]
    )
  }

  contains (x, y) {
    if (x instanceof Rect) {
      return this._containsRect(x)
    }

    if (x instanceof Point || typeof x === 'object') {
      return this.contains(x.x, x.y)
    }

    const { pos } = this

    return (
      x >= pos[0] &&
      y >= pos[1] &&
      x <= pos[2] &&
      y <= pos[3]
    )
  }

  /**
   * Returns a vector referencing the bottom-left, top-right diagonal
   * @returns <Vector2>
   */
  slope () {
    return new Vector2(this.pos[2] - this.pos[0], this.pos[3] - this.pos[1])
  }
}
