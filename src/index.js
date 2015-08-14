/**
 * Binds utilities to exports
 *
 * @TODO should probably be automated
 */

export default {
    Point: require( './point' ),
    Vector2: require( './vector2' ),

    lerp: require( './lerp' ),
    toDegrees: require( './toDegrees' ),
    toRadians: require( './toRadians' ),
    min: require( './min' ),
    max: require( './max' ),

    clamp: require( './clamp' ),
    wrap: require( './wrap' ),

    euclidean: require( './euclidean' ),
    manhattan: require( './manhattan' )
}
