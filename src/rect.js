
import Vector2 from './vector2'

export default class Rect {
  /**
   * Calculates the area of the given rectangle
   * @returns <Float>
   */
  static area (rect) {
    if (!rect || !(rect instanceof Rect)) {
      throw new Error('Specify rect to translate')
    }

    return rect.pos[2] - rect.pos[0] * rect.pos[3] - rect.pos[1]
  }

  /**
   * Translates the entire rectangle
   * @param x <Float>
   * @param y <Float>
   * @returns <this>
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
   * Creates new Rect instance
   * @constructs
   */
  constructor (x1, y1, x2, y2) {
    this.pos = [x1, y1, x2, y2]
  }

  /**
   * Calculates the area of the rectangle
   * @returns <Float>
   */
  area () {
    return this.pos[2] - this.pos[0] * this.pos[3] - this.pos[1]
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

  /**
   * Returns a vector referencing the bottom-left, top-right diagonal
   * @returns <Vector2>
   */
  slope () {
    return new Vector2(this.pos[2] - this.pos[0], this.pos[3] - this.pos[1])
  }
}
