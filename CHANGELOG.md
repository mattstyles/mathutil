## 5.1.0

- _update_ random number generator seed wrapping
- _fix_ random number generator range

## 5.0.0

- _add_ :rocket: random number generator
- _add_ :house: update tooling
- _update_ :house: refine output paths

## 4.2.0

- _fix_ esm publish types

## 4.1.3

- _fix_ build and publish types

## 4.1.1

- _fix_ Vector2::cross product calculation.

## 4.1.0

- _add_ Rect getters for edge coordinates
- _add_ Point::scale

## 4.0.0

- _break_ remove Point::toCartesian. x and y already exist on a Point.
- _break_ remove Vector2::toCartesian. x and y already exist on a Vector2.
- _break_ remove Vector2::position. Just use .pos.
- _break_ Vector2::unit returns itself and is mutative. Previously it was non-mutative and returned a new instance.
- _break_ ray casting and projecting always returns Vector2. Previously it returned the Position value of a Vector2.

- _add_ Vector2.length getter (same as len(), returns vector magnitude)
- _update_ modern build chain using swc

## 3.0.1

- _update_ change file extension for better interop with bundlers

## 3.0.0

- _break_ Ray::project returns position only
- _break_ lerp operands have changed to enable currying of the function
- _break_ clamp operands have changed to enable currying of the function
- _break_ wrap operands have changed to enable currying of the function

- _add_ additional examples
- _add_ Vector2::of constructor method
- _update_ documentation
- _update_ min and max now accepts Sets

## 2.5.0

- _update_ examples
- _add_ Ray::of
- _add_ compat build outputs
- _add_ dead code removal hints for shakey shakey

## 2.4.0

- _update_ es6 and cjs builds
- _add_ umd distributable
- _update_ reduce point and rect weight
- _add_ rect::contains

## 2.3.0

- _add_ lots more juicy Point helpers
- _add_ lots more juicy Rect helpers

## 2.2.0

- _add_ vector positional component getters
- _add_ vector static rotate method
- _update_ examples

## 2.1.0

- _update_ vector length method
- _update_ use rollup and buble

## 2.0.0

- _update_ use arrays for structures rather than objects

- _update_ vectors
- _add_ additional vector functionality
- _add_ additional rect functionality
- _add_ tests
- _update_ dependencies

## 0.2.0

- _update_ extra helper methods
- _update_ examples

## 0.1.0

- _add_ vectors
- _add_ primitives (point, rect)
- _add_ helpers (clamp, wrap, min, max)
- _add_ transforms (radians/degrees)
- _add_ distance helpers (manhattan, euclidean)
