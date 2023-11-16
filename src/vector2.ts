import type {InputVector, Position} from './inputScalar.ts'

import {massageVectorInput} from './inputScalar.ts'

export class Vector2 {
  pos: Position

  /**
   * `x` and `y` refer to both direction and magnitude, they are stored in a
   * point array for performance
   * @constructs
   * @param x <Number>
   * @param y <Number>
   */
  constructor(x: number, y: number) {
    this.pos = [x, y]
    return this
  }

  static of(x: Vector2): Vector2
  static of(x: number, y: number): Vector2
  static of(x: Vector2 | number, y?: number) {
    if (x instanceof Vector2) {
      return new Vector2(x.pos[0], x.pos[1])
    }

    return new Vector2(x, y)
  }

  /**
   * Adds two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static add(v1: InputVector, v2: InputVector) {
    const x = massageVectorInput(v1)
    const y = massageVectorInput(v2)
    return new Vector2(x[0] + y[0], x[1] + y[1])
  }

  /**
   * Subtracts two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static sub(v1: InputVector, v2: InputVector) {
    const x = massageVectorInput(v1)
    const y = massageVectorInput(v2)
    return new Vector2(x[0] - y[0], x[1] - y[1])
  }

  /**
   * Multiplies two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static multiply(v1: InputVector, v2: InputVector) {
    const x = massageVectorInput(v1)
    const y = massageVectorInput(v2)
    return new Vector2(x[0] * y[0], x[1] * y[1])
  }

  /**
   * Divides two vectors and returns a new instance
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static divide(v1: InputVector, v2: InputVector) {
    const x = massageVectorInput(v1)
    const y = massageVectorInput(v2)
    return new Vector2(
      y[0] === 0 ? 0 : x[0] / y[0],
      y[1] === 0 ? 0 : x[1] / y[1],
    )
  }

  /**
   * Returns the dot product of two vectors
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Float>
   */
  static dot(v1: InputVector, v2: InputVector) {
    const x = massageVectorInput(v1)
    const y = massageVectorInput(v2)
    return x[0] * y[0] + x[1] * y[1]
  }

  /**
   * Returns the cross product of two vectors
   * @param v1 <Vector2||Array||Number>
   * @param v2 <Vector2||Array||Number>
   * @returns <Float>
   */
  static cross(v1: InputVector, v2: InputVector) {
    const x = massageVectorInput(v1)
    const y = massageVectorInput(v2)
    return x[0] * y[1] - x[1] * y[0]
  }

  /**
   * Returns the length of a vector
   * @param vec <Vector2||Array||Number>
   * @returns <Float>
   */
  static len(vec: InputVector) {
    const x = massageVectorInput(vec)
    return Math.sqrt(Math.pow(x[0], 2) + Math.pow(x[1], 2))
  }

  /**
   * Returns the unit vector of a given vector
   * @param vec <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static unit(vec: InputVector) {
    const x = massageVectorInput(vec)
    const len = Vector2.len(x)
    return Vector2.divide(x, [len, len])
  }

  /**
   * Returns the normal vector of a given vector
   * @param vec <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static normal(vec: InputVector) {
    const x = massageVectorInput(vec)
    return new Vector2(-x[1], x[0])
  }

  /**
   * Returns the backface normal vector of a given vector
   * @param vec <Vector2||Array||Number>
   * @returns <Vector2>
   */
  static backfaceNormal(vec: InputVector) {
    const x = massageVectorInput(vec)
    return new Vector2(x[1], -x[0])
  }

  /**
   * Generates a unit vector from an angle
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  static fromAngle(angle: number) {
    return new Vector2(1, 0).rotate(angle)
  }

  /**
   * Generates a new vector from the given vector and angle
   * @param vec <Vector2>
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  static rotate(vec: InputVector, angle: number) {
    const x = massageVectorInput(vec)
    const v = new Vector2(...x)
    v.rotate(angle)
    return v
  }

  /* -----------------------------------------------------------*
   *
   *  Basic ops
   *
   *----------------------------------------------------------- */

  /**
   * Getter for the x component of position
   * @returns <Float>
   */
  get x() {
    return this.pos[0]
  }

  /**
   * Getter for the y component of position
   * @returns <Float>
   */
  get y() {
    return this.pos[1]
  }

  /**
   * Getter for the length component of position i.e. the magnitude
   * @returns <Float>
   */
  get length() {
    return this.len()
  }

  /**
   * Adds a second vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  add(vec: InputVector) {
    const p = massageVectorInput(vec)

    this.pos = [this.pos[0] + p[0], this.pos[1] + p[1]]

    return this
  }

  /**
   * Subtracts a second vector and returns a new vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  sub(vec: InputVector) {
    const p = massageVectorInput(vec)

    this.pos = [this.pos[0] - p[0], this.pos[1] - p[1]]

    return this
  }

  /**
   * Multiplies a second vector and returns a new vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  multiply(vec: InputVector) {
    const p = massageVectorInput(vec)

    this.pos = [this.pos[0] * p[0], this.pos[1] * p[1]]

    return this
  }

  /**
   * Divides a second vector and returns a new vector
   * @param vec <Vector2||Array||Number>
   * @returns <this>
   */
  divide(vec: InputVector) {
    const p = massageVectorInput(vec)

    this.pos = [
      p[0] === 0 ? 0 : this.pos[0] / p[0],
      p[1] === 0 ? 0 : this.pos[1] / p[1],
    ]

    return this
  }

  /**
   * Sets the vector to the specified length
   */
  magnitude(len: InputVector) {
    const vec = Vector2.multiply(this.unit(), len)
    this.pos = vec.pos
    return this
  }

  /**
   * Returns the dot product of this vector and the supplied vector
   * @param vec <Vector2||Array||Number>
   * @returns <Float>
   */
  dot(vec: InputVector) {
    const p = massageVectorInput(vec)
    return this.pos[0] * p[0] + this.pos[1] * p[1]
  }

  /**
   * Returns the cross product of this vector and the supplied vector
   * @param vec <Vector2||Array||Number>
   * @returns <Float>
   */
  cross(vec: InputVector) {
    const p = massageVectorInput(vec)
    return this.pos[0] * p[1] - this.pos[1] * p[0]
  }

  /**
   * Returns the length of the vector
   * @returns <Float>
   */
  len() {
    return Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2))
  }

  /**
   * Slightly cheaper determinant of length, really only useful for length comparisons
   * @returns <Float>
   */
  sqrLen() {
    return Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2)
  }

  /**
   * Returns unit vector of this vector
   * @returns <Vector2>
   */
  unit() {
    const len = this.len()
    return Vector2.divide(this, len)
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
  normal() {
    return new Vector2(-this.pos[1], this.pos[0])
  }

  /**
   * Quick rotate 90 deg right, where y is 'up' this grabs the normal of the backface
   * @returns <Vector2>
   */
  backfaceNormal() {
    return new Vector2(this.pos[1], -this.pos[0])
  }

  /**
   * Rotates the vector
   * @TODO specify angle as an integer and use pre-calc tables for sin & cos
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  rotate(angle: number) {
    const [x, y] = this.pos
    const sin = Math.sin(angle)
    const cos = Math.cos(angle)
    this.pos = [x * cos - y * sin, x * sin + y * cos]
    return this
  }

  /**
   * Points the vector in a certain direction
   * @param angle <Float> in radians
   * @returns <Vector2>
   */
  turn(angle: number) {
    const len = this.len()
    const dir = new Vector2(1, 0).rotate(angle)
    this.pos = [dir.pos[0] * len, dir.pos[1] * len]
    return this
  }

  /**
   * Returns the vector angle
   * @returns <Float> in radians
   */
  angle() {
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
  lerp(value: number) {
    return Vector2.multiply(this, value)
  }

  /**
   * Calcs the distance between this vector and another one
   * @param vec <Vector2||Point>
   * @returns <Float>
   */
  distance(vec: InputVector) {
    return Vector2.sub(this, vec).len()
  }

  /**
   * Checks if the supplied vector is parallel to this vector
   * @param vec <Vector2>
   * @returns <Boolean>
   */
  isHeading(vec: Vector2) {
    return Vector2.dot(this.unit(), vec.unit()) === 1
  }

  /**
   * Checks if the supplied vector is generally heading in the same direction
   * within `angle` degrees of accuracy
   * @param vec <Vector2>
   * @param angle <Float> in radians
   * @returns <Boolean>
   */
  isNearHeading(vec: Vector2, angle: number) {
    return Vector2.dot(this.unit(), vec.unit()) > Math.cos(angle)
  }
}
