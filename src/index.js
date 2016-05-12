/**
 * Binds utilities to exports
 */

import Point from './point'
import Rect from './rect'
import Vector2 from './vector2'
import lerp from './lerp'
import toDegrees from './toDegrees'
import toRadians from './toRadians'
import min from './min'
import max from './max'
import clamp from './clamp'
import wrap from './wrap'
import euclidean from './euclidean'
import manhattan from './manhattan'


const Util = {
    Point,
    Rect,
    Vector2,

    lerp,
    toDegrees,
    toRadians,
    min,
    max,

    clamp,
    wrap,

    euclidean,
    manhattan
}

export default Util
module.exports = Util
