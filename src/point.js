
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

  equal (x, y) {
    if (x instanceof Point || typeof x === 'object') {
      return this.equal(x.x, x.y)
    }

    return this.pos[0] === x && this.pos[1] === y
  }

  equals (x, y) {
    return this.equal(x, y)
  }

  translate (x, y) {
    if (x instanceof Point || typeof x === 'object') {
      return this.translate(x.x, x.y)
    }

    this.pos[0] += x
    this.pos[1] += y
    return this
  }
}
