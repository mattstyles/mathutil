
import Point from './point'

class Vector2 {
    /**
     * `x` and `y` here refer to the head, the origin is always assumed to be 0,0
     * @constructs
     * @param x <Integer>
     * @param y <Integer>
     * or
     * By instantiating using an object of parameters the origin can be specified
     * @param params <Object>
     *   @param head <Point>
     *   @param origin <Point>
     * @returns this
     */
    constructor( x, y ) {
        // x could be an object describing constructor params
        if ( typeof x === 'object' ) {
            let opts = x

            if ( !opts.head ) {
                throw new Error( 'Vector2::constructor requires head position' )
            }

            if ( !opts.origin ) {
                opts.origin = new Point( 0, 0 )
            }

            this.pos = opts.head instanceof Point
                ? opts.head
                : new Point( opts.head.x, opts.head.y )
            this.origin = opts.origin instanceof Point
                ? opts.origin
                : new Point( opts.origin.x, opts.origin.y )

            return this
        }

        // Otherwise check x and y exist and are numbers
        if ( typeof x !== 'number' || typeof y !== 'number' ) {
            throw new Error( 'Vector2::constructor invalid parameters' )
        }

        this.pos = new Point( x, y )
        this.origin = new Point( 0, 0 )

        return this
    }


}
