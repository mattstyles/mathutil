
function massageScalar (param) {
  if (typeof param === 'number') {
    return [param, param]
  }

  if (param instanceof Vector2) {
    return param.pos
  }

  return param
}

export class Vector2 {
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
   * Returns the dot product of two vectors
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Float>
   */
  static dot (v1, v2) {
    let x = massageScalar(v1)
    let y = massageScalar(v2)
    return x[0] * y[0] + x[1] * y[1]
  }

  /**
   * Returns the cross product of two vectors
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Float>
   */
  static cross (v1, v2) {
    let x = massageScalar(v1)
    let y = massageScalar(v2)
    return x[0] * y[0] - x[1] * y[1]
  }

  /**
   * Returns the length of a vector
   * @param vec <Vector2||Array||Number>
   * @returns <Float>
   */
  static len (vec) {
    let x = massageScalar(vec)
    return Math.sqrt(Math.pow(x[0], 2) + Math.pow(x[1], 2))
  }

  /**
   * Returns the unit vector of a given vector
   * @param vec <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static unit (vec) {
    let x = massageScalar(vec)
    let len = Vector2.len(x)
    return Vector2.divide(x, [len, len])
  }

  /**
   * Returns the normal vector of a given vector
   * @param vec <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static normal (vec) {
    let x = massageScalar(vec)
    return new Vector2(-x[1], x[0])
  }

  /**
   * Returns the backface normal vector of a given vector
   * @param vec <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static backfaceNormal (vec) {
    let x = massageScalar(vec)
    return new Vector2(x[1], -x[0])
  }

  /**
   * Generates a unit vector from an angle
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  static fromAngle (angle) {
    return new Vector2(1, 0).rotate(angle)
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
   * Getter for the x component of position
   * @returns <Float>
   */
  get x () {
    return this.pos[0]
  }

  /**
   * Getter for the y component of position
   * @returns <Float>
   */
  get y () {
    return this.pos[1]
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
   * Sets the vector to the specified length
   */
  magnitude (len) {
    let vec = Vector2.multiply(this.unit(), len)
    this.pos = vec.pos
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
  len () {
    return Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2))
  }

  /**
   * Slightly cheaper determinant of length, really only useful for length comparisons
   * @returns <Float>
   */
  sqrLen () {
    return Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2)
  }

  /**
   * Returns unit vector of this vector
   * @returns <Vector2>
   */
  unit () {
    let len = this.len()
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
    return new Vector2(-this.pos[1], this.pos[0])
  }

  /**
   * Quick rotate 90 deg right, where y is 'up' this grabs the normal of the backface
   * @returns <Vector2>
   */
  backfaceNormal () {
    return new Vector2(this.pos[1], -this.pos[0])
  }

  /**
   * Rotates the vector
   * @TODO specify angle as an integer and use pre-calc tables for sin & cos
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  rotate (angle) {
    let [x, y] = this.pos
    let sin = Math.sin(angle)
    let cos = Math.cos(angle)
    this.pos = [
      x * cos - y * sin,
      x * sin + y * cos
    ]
    return this
  }

  /**
   * Points the vector in a certain direction
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  turn (angle) {
    let len = this.len()
    let dir = new Vector2(1, 0).rotate(angle)
    this.pos = [
      dir.pos[0] * len,
      dir.pos[1] * len
    ]
    return this
  }

  /**
   * Returns the vector angle
   * @returns <Float> in radians
   */
  angle () {
    return Math.atan2(this.pos[1], this.pos[0])
  }

  /* -----------------------------------------------------------*
   *
   *  Useful stuff
   *
   *----------------------------------------------------------- */

  /**
   * Returns a new vector linearly interpolated along the length of
   * this vector
   * @param value <Float>
   * @returns <Vector2>
   */
  lerp (value) {
    return Vector2.multiply(this, value)
  }

  /**
   * Calcs the distance between this vector and another one
   * @param vec <Vector2||Point>
   * @returns <Float>
   */
  distance (vec) {
    return Vector2.sub(this, vec).len()
  }

  /**
   * Checks if the supplied vector is parallel to this vector
   * @param vec <Vector2>
   * @returns <Boolean>
   */
  isHeading (vec) {
    return Vector2.dot(this.unit(), vec.unit()) === 1
  }

  /**
   * Checks if the supplied vector is generally heading in the same direction
   * within `angle` degrees of accuracy
   * @param vec <Vector2>
   * @param angle <Float> in radians
   * @returns <Boolean>
   */
  isNearHeading (vec, angle) {
    return Vector2.dot(this.unit(), vec.unit()) > Math.cos(angle)
  }
}
