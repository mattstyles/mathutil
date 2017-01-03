
function massageScalar (param) {
  if (typeof param === 'number') {
    return [param, param]
  }

  if (param instanceof Vector2) {
    return param.pos
  }

  return param
}

export default class Vector2 {
  /**
   * Adds two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static add (v1, v2) {
    let x = massageScalar(v1)
    let y = massageScalar(v2)
    return new Vector2(x[0] + y[0], x[1] + y[1])
  }

  /**
   * Subtracts two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static sub (v1, v2) {
    let x = massageScalar(v1)
    let y = massageScalar(v2)
    return new Vector2(x[0] - y[0], x[1] - y[1])
  }

  /**
   * Multiplies two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static multiply (v1, v2) {
    let x = massageScalar(v1)
    let y = massageScalar(v2)
    return new Vector2(x[0] * y[0], x[1] * y[1])
  }

  /**
   * Divides two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static divide (v1, v2) {
    let x = massageScalar(v1)
    let y = massageScalar(v2)
    return new Vector2(
      y[0] === 0 ? 0 : x[0] / y[0],
      y[1] === 0 ? 0 : x[1] / y[1]
    )
  }

  /**
   * `x` and `y` refer to both direction and magnitude, they are stored in a
   * point array for performance
   * @constructs
   * @param x <Number>
   * @param y <Number>
   */
  constructor (x, y) {
    this.pos = [x, y]
    return this
  }

  /* -----------------------------------------------------------*
   *
   *  Basic ops
   *
   *----------------------------------------------------------- */

  /**
   * Outputs an array describing the position [ x, y ]
   * Useful for spreading to parameters
   * @returns <Array>
   */
  position () {
    return this.pos
  }

  /**
   * Outputs an object with x and y properties
   * @returns <Object>
   */
  toCartesian () {
    return {
      x: this.pos[0],
      y: this.pos[1]
    }
  }

  /**
   * Adds a second vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  add (vec) {
    let p = massageScalar(vec)

    this.pos = [
      this.pos[0] + p[0],
      this.pos[1] + p[1]
    ]

    return this
  }

  /**
   * Subtracts a second vector and returns a new vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  sub (vec) {
    let p = massageScalar(vec)

    this.pos = [
      this.pos[0] - p[0],
      this.pos[1] - p[1]
    ]

    return this
  }

  /**
   * Multiplies a second vector and returns a new vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  multiply (vec) {
    let p = massageScalar(vec)

    this.pos = [
      this.pos[0] * p[0],
      this.pos[1] * p[1]
    ]

    return this
  }

  /**
   * Divides a second vector and returns a new vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  divide (vec) {
    let p = massageScalar(vec)

    this.pos = [
      p[0] === 0 ? 0 : this.pos[0] / p[0],
      p[1] === 0 ? 0 : this.pos[1] / p[1]
    ]

    return this
  }

  /**
   * Returns the dot product of this vector and the supplied vector
   * @param vec <Vector2||Array||Number>
   * @returns <Float>
   */
  dot (vec) {
    let p = massageScalar(vec)
    return this.pos[0] * p[0] + this.pos[1] * p[1]
  }

  /**
   * Returns the cross product of this vector and the supplied vector
   * @param vec <Vector2||Array||Number>
   * @returns <Float>
   */
  cross (vec) {
    let p = massageScalar(vec)
    return this.pos[0] * p[0] - this.pos[1] * p[1]
  }

  /**
   * Returns the length of the vector
   * @returns <Float>
   */
  length () {
    return Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2))
  }

  /**
   * Slightly cheaper determinant of length, really only useful for length comparisons
   * @returns <Float>
   */
  sqrLength () {
    return Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2)
  }

  /**
   * Maintains direction but clamps to 0...1
   * @returns <Vector2>
   */
  unit () {
    let len = this.length()
    return Vector2.divide(this.pos, [len, len])
  }

    /* -----------------------------------------------------------*
     *
     *  Rotation
     *
     *----------------------------------------------------------- */

  /**
   * Quick rotate 90 degrees to the left, where y is 'up' this is the normal vector
   * @returns <Vector2>
   */
  normal () {
    return new Vector2(-this.y, this.x)
  }

  /**
   * Quick rotate 90 deg right, where y is 'up' this grabs the normal of the backface
   * @returns <Vector2>
   */
  backfaceNormal () {
    return new Vector2(this.y, -this.x)
  }

  /**
   * Rotates the vector
   * @TODO rotates around <0,0>, not necessarily this.origin
   * @TODO specify angle as an integer and use pre-calc tables for sin & cos
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  rotate (angle) {
    return new Vector2(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        )
  }

  /**
   * Produces a new vector that is `angle` amount of rotation away from its
   * current angle
   * @TODO assumes origin is <0,0>
   * @TODO should probably produce a vector whose origin is at this vectors head, use unit vectors
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  turn (angle) {
    return this.rotate(this.angle() + angle).unit()
  }

  /**
   * Returns the vector angle
   * @TODO based on 0 degrees pointing _right_
   * @TODO based on origin at <0,0>, not necessarily this.origin
   * @returns <Float> in radians
   */
  angle () {
    return Math.atan2(this.y, this.x)
  }

  /* -----------------------------------------------------------*
   *
   *  Useful stuff
   *
   *----------------------------------------------------------- */

  /**
   * Linearly interpolates along the length of the vector
   * @param value <Float>
   * @returns <Vector2>
   */
  lerp (value) {
    return this.scalar(value).add(this.origin)
  }

  /**
   * Calcs the distance between this vector and another one
   * @param vec <Vector2||Point>
   * @returns <Float>
   */
  distance (vec) {
    return this.sub(vec).length()
  }

  /**
   * Checks if the supplied vector is parallel to this vector
   * @param vec <Vector2>
   * @returns <Boolean>
   */
  isHeading (vec) {
      // JS is so wonderfully quirky it’ll do plenty of almost correct calculations,
      // the ugly decimal marking and casting makes sure we’re probably close enough
    return ~~this.unit().dot(vec.unit()).toFixed(6)
      ? true
      : false
  }

  /**
   * Checks if the supplied vector is generally heading in the same direction
   * within `angle` degrees of accuracy
   * @param vec <Vector2>
   * @returns <Boolean>
   */
  isNearHeading (vec, angle) {
    return this.unit().dot(vec.unit()) > Math.cos(angle)
  }
}
