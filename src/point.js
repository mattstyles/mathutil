
export class Point {
  constructor (x, y) {
    this.pos = [x, y]
  }

  static of (x, y) {
    if (x instanceof Point) {
      return new Point(x.x, x.y)
    }

    return new Point(x, y)
  }

  static translate (from, to) {
    return Point.of(
      from.x + to.x,
      from.y + to.y
    )
  }

  get x () {
    return this.pos[0]
  }

  get y () {
    return this.pos[1]
  }

  position () {
    return this.pos
  }

  toCartesian () {
    return {
      x: this.pos[0],
      y: this.pos[1]
    }
  }

  _equalByPoint (point) {
    return this.pos[0] === point.x && this.pos[1] === point.y
  }

  equal (x, y) {
    if (x instanceof Point || typeof x === 'object') {
      return this._equalByPoint(x)
    }

    return this.pos[0] === x && this.pos[1] === y
  }

  equals (x, y) {
    return this.equal(x, y)
  }

  _translateByPoint (point) {
    this.pos[0] += point.x
    this.pos[1] += point.y
    return this
  }

  translate (x, y) {
    if (x instanceof Point) {
      return this._translateByPoint(x)
    }

    this.pos[0] += x
    this.pos[1] += y
    return this
  }
}
