
# mathutil

> Collection of utilities vaguely mathematical

[![npm](https://img.shields.io/npm/v/mathutil.svg?style=flat)](https://www.npmjs.com/package/mathutil)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/mattstyles/mathutil.svg?branch=master)](https://travis-ci.org/mattstyles/mathutil)
[![Coverage Status](https://coveralls.io/repos/mattstyles/mathutil/badge.svg?branch=master&service=github)](https://coveralls.io/github/mattstyles/mathutil?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


## Getting started

Install with [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)

```sh
npm i -S raid raid-addons
```

```sh
yarn add raid raid-addons
```

Collection of useful maths-related utilities. All are dead-code removal friendly so import what you like and be happy that your tree-shaking module can remove everything else. All utilities are <2kb.

## Example

```js
import { lerp } from 'mathutil'

console.log(lerp(10, 15, 0.5))
// 12.5
```

## Utilities

### lerp

```
(<Number> min, <Number> max, <Float> value) => <Number>
```

Interpolates `value` between the range specified by `min` and `max` numbers. Value is expected to be in the range `0...1`.

```js
import { lerp } from 'mathutil'

console.log(lerp(0, 20, 0.5))
// 10
```

### toDegrees

```
(<Number> value) => <Number>
```

Converts radians into degrees.

```js
import { toDegrees } from 'mathutil'

console.log(toDegrees(Math.PI * 0.5))
// 90
```

### toRadians

```
(<Number> value) => <Number>
```

Converts degrees into radians.

```js
import { toDegrees } from 'mathutil'

console.log(toRadians(270))
// 4.71238898038469
```

### min

```
(<Array<Number>>|<Set<Number>> set) => <Number>
```

Returns the lowest value number in a set

```js
import { min } from 'mathutil'

console.log(min([1, 2, 3]))
// 1

console.log(min(new Set([1, 2, 3])))
// 1
```

### max

```
(<Array<Number>>|<Set<Number>> set) => <Number>
```

Returns the highest value number in a set

```js
import { max } from 'mathutil'

console.log(max([1, 2, 3]))
// 3

console.log(max(new Set([1, 2, 3])))
// 3
```

### clamp

```
(<Number> min, <Number> max, <Number> value) => <Number>
```

Returns the value and ensures it is within the range specified by `min` and `max`.

```js
import { clamp } from 'mathutil'

console.log(clamp(1, 12, 3))
// 3

console.log(clamp(10, 12.4, 5.4))
// 10

console.log(clamp(1, 4, 100))
// 4
```

### wrap

```
(<Number> min, <Number> max, <Number> value) => <Number>
```

Returns the value but translated as if it rotates through the range specified by `min` and `max`

```js
import { wrap } from 'mathutil'

console.log(wrap(0, 4, 6))
// 2
```

### euclidean

```
(<Array<Number, Number>>, <Array<Number, Number>>) => <Float>
```

Returns the distance between points `a` and `b` using the pythagorean theorem.
It involves squaring and rooting so is accurate but isn’t super cheap, if you don’t need the distance but an comparison between distances, consider if using the manhattan distance algorithm would suit (as it is a cheaper equation).

```js
import { euclidean } from 'mathutil'

console.log(euclidean([0, 2], [1, 4]))
// 2.23606797749979
```

### manhattan

```
(<Array<Number, Number>>, <Array<Number, Number>>) => <Number>
```

Returns the distance between points `a` and `b` using the manhattan distance algorithm. This distance calculation is cheaper than using euclidean distance and is appropriate for comparison but may not be appropriate if you specifically need to know the actual distance between two points.

```js
import { manhattan } from 'mathutil'

console.log(manhattan([0, 2], [1, 4]))
// 3
```
