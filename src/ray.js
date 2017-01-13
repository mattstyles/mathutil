
import {Vector2} from './vector2'

const castOpts = {
  initial: false,
  origin: [0, 0],
  magnitude: 0,
  step: 1
}

export class Ray {
  constructor (v) {
    if (!(v instanceof Vector2)) {
      throw new Error('Ray should be instantiated with a direction vector')
    }

    this.dir = v.unit()
  }

  /**
   * Returns a generator function that yields the process of casting the ray
   * @param opts <Object>
   *   @param initial <Boolean> should output initial position
   *   @param origin <Array> length-2 array describing origin position for cast
   *   @param magnitude <Number> magnitude of the ray section being cast
   *   @param step <Number> amount to step per operation
   */
  cast (opts) {
    opts = Object.assign({}, castOpts, opts)

    let u = new Vector2(...this.dir.pos)
    let len = 0

    /**
     * Generator that performs the cast.
     * A cast happens along a section of the ray specified by the origin and
     * the magnitude, which defines the final position returned. The step
     * dictates the distance between returned values.
     * The origin, or initial value, is often undesired and so its output is
     * hidden behind the initial flag.
     */
    return function* () {
      if (opts.initial) {
        yield opts.origin
      }

      while (len < opts.magnitude) {
        len = len + opts.step
        u.magnitude(len)

        // @TODO add is mutative, although magnitude resets it it might
        // still be safer to return a new vector, although likely slower
        // yield u.add(opts.origin).pos
        yield Vector2.add(opts.origin, u).pos
      }
    }
  }

  project (opts) {
    opts = Object.assign({}, castOpts, opts)

    let u = new Vector2(...this.dir.pos)
    let len = 0

    return (cb) => {
      while (len < opts.magnitude) {
        len = len + opts.step
        u.magnitude(len)
        cb(Vector2.add(opts.origin, u))
      }
    }
  }
}
