
export default class Point {
  constructor (x, y) {
    this.pos = [x, y]
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
}
