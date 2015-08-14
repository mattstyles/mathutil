
import Point from './point'

export default class Vector2 {
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

            this.head = opts.head instanceof Point
                ? opts.head
                : new Point( opts.head.x, opts.head.y )
            this.origin = opts.origin instanceof Point
                ? opts.origin
                : new Point( opts.origin.x, opts.origin.y )

            // Helpers
            this.x = this.head.x
            this.y = this.head.y

            return this
        }

        // Otherwise check x and y exist and are numbers
        if ( typeof x !== 'number' || typeof y !== 'number' ) {
            throw new Error( 'Vector2::constructor invalid parameters' )
        }

        this.head = new Point( x, y )
        this.origin = new Point( 0, 0 )

        // Helpers
        this.x = this.head.x
        this.y = this.head.y

        return this
    }

    /*-----------------------------------------------------------*
     *
     *  Basic ops
     *
     *-----------------------------------------------------------*/



    /**
     * Adds a second vector and returns a new vector
     * @param vec <Vector2||Point>
     * @returns <Vector2>
     */
    add( vec ) {
        return new Vector2( this.x + vec.x, this.x + vec.y )
    }

    /**
     * Subtracts a second vector and returns a new vector
     * @param vec <Vector2||Point>
     * @returns <Vector2>
     */
    sub( vec ) {
        return new Vector2( this.x - vec.x, this.x - vec.y )
    }

    /**
     * Multiplies a second vector and returns a new vector
     * @param vec <Vector2||Point>
     * @returns <Vector2>
     */
    multiply( vec ) {
        return new Vector2( this.x * vec.x, this.x * vec.y )
    }

    /**
     * Divides a second vector and returns a new vector
     * @param vec <Vector2||Point>
     * @returns <Vector2>
     */
    divide( vec ) {
        return new Vector2( this.x / vec.x || 0, this.y / vec.y || 0 )
    }

    /**
     * Multiply this vector by a scalar and return a new vector
     * @param value <Float>
     * @returns <Vector2>
     */
    scalar( value ) {
        return new Vector2( this.x * value, this.y * value )
    }

    /**
     * Returns the dot product of this vector and the supplied vector
     * @param vec <Vector2||Point>
     * @returns <Float>
     */
    dot( vec ) {
        return new Vector2( this.x * vec.x + this.y * vec.y )
    }

    /**
     * Returns the cross product of this vector and the supplied vector
     * @param vec <Vector2||Point>
     * @returns <Float>
     */
    cross( vec ) {
        return new Vector2( this.x * vec.y - this.y * vec.x )
    }

    /**
     * Returns the length of the vector
     * @returns <Float>
     */
    length() {
        return Math.sqrt( Math.pow( this.head.x - this.origin.x, 2 ) + Math.pow( this.head.y - this.origin.y, 2 ) )
    }

    /**
     * Slightly cheaper determinant of length, really only useful for length comparisons
     * @returns <Float>
     */
    sqrLength() {
        return Math.pow( this.head.x - this.origin.x, 2 ) + Math.pow( this.head.y - this.origin.y, 2 )
    }

    /**
     * Maintains direction but clamps to 0...1
     * @returns <Vector2>
     */
    unit() {
        let len = this.length()
        return this.divide({
            x: len,
            y: len
        })
    }

    /*-----------------------------------------------------------*
     *
     *  Rotation
     *
     *-----------------------------------------------------------*/

    /**
     * Quick rotate 90 degrees to the left, where y is 'up' this is the normal vector
     * @returns <Vector2>
     */
    normal() {
        return new Vector2( -this.y, this.x )
    }

    /**
     * Quick rotate 90 deg right, where y is 'up' this grabs the normal of the backface
     * @returns <Vector2>
     */
    backfaceNormal() {
        return new Vector2( this.y, -this.x )
    }

    /**
     * Rotates the vector
     * @TODO rotates around <0,0>, not necessarily this.origin
     * @TODO specify angle as an integer and use pre-calc tables for sin & cos
     * @param angle <Float>
     * @returns <Vector2>
     */
    rotate( angle ) {
        return new Vector2(
            this.x * Math.cos( angle ) - this.y * Math.sin( angle ),
            this.x * Math.sin( angle ) + this.y * Math.cos( angle )
        )
    }

    /**
     * Returns the vector angle
     * @TODO based on 0 degrees pointing _right_
     * @TODO based on origin at <0,0>, not necessarily this.origin
     * @returns <Float>
     */
    angle() {
        return Math.atan2( this.y, this.x )
    }

}
