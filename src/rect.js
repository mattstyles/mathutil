
export default class Rect {
  constructor (x1, y1, x2, y2) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  area () {
    return this.x2 - this.x1 * this.y2 - this.y1
  }

  translate (x, y) {
    if (!x || !y) {
      throw new Error('Rect::translate requires amount to translate by')
    }

    return new Rect(
            this.x1 + x,
            this.y1 + y,
            this.x2 + x,
            this.y2 + y
        )
  }
}
