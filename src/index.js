
/**
 * Binds utilities to exports
 */

export default {
  Point: require('./point'),
  Rect: require('./rect'),
  Vector2: require('./vector2'),

  lerp: require('./lerp'),
  toDegrees: require('./toDegrees'),
  toRadians: require('./toRadians'),
  min: require('./min'),
  max: require('./max'),

  clamp: require('./clamp'),
  wrap: require('./wrap'),

  euclidean: require('./euclidean'),
  manhattan: require('./manhattan')
}
