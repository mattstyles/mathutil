import type {InputVector, Position} from './inputScalar'
import {Vector2} from './vector2'

/**
 * Checks if vectors are equal (using close enough checking for rounding inconsistencies)
 */
function checkClose(x: Vector2, y: Vector2) {
  expect(x.x).toBeCloseTo(y.x)
  expect(x.y).toBeCloseTo(y.y)
}

test('Vector2::Constructor should create a new instance', () => {
  const v = new Vector2(10, 13)
  const w = Vector2.of(12, 12)
  const x = Vector2.of(v)

  expect(v instanceof Vector2).toEqual(true)
  expect(w instanceof Vector2).toEqual(true)
  expect(x.pos).toEqual([10, 13])
})

test('Vector2 should be able to output its internal structure as either an array or an object', () => {
  const v = new Vector2(2, 1)

  expect(v.pos).toEqual([2, 1])
  expect(v.x).toEqual(2)
  expect(v.y).toEqual(1)
})

test('Vector2::add', () => {
  const tests: {source: Vector2; add: InputVector; expected: Position}[] = [
    // Vector2 form
    {
      source: new Vector2(2, 1),
      add: new Vector2(2, 2),
      expected: [4, 3],
    },
    // Array form
    {
      source: new Vector2(2, 1),
      add: [2, 2],
      expected: [4, 3],
    },
    // Scalar form
    {
      source: new Vector2(2, 1),
      add: 2,
      expected: [4, 3],
    },
  ]

  for (let {source, add, expected} of tests) {
    // Static method
    expect(Vector2.add(source, add).pos).toEqual(expected)

    // Static with point arrays
    expect(Vector2.add([source.x, source.y], add).pos).toEqual(expected)

    // Instance method - doing this after the static method ensures that
    // static methods are non-mutative
    expect(source.add(add).pos).toEqual(expected)
  }

  // Static with numbers
  expect(Vector2.add(2, 2).pos).toEqual([4, 4])
})

test('Vector2::sub', () => {
  const tests: {source: Vector2; sub: InputVector; expected: Position}[] = [
    // Vector2 form
    {
      source: new Vector2(3, 2),
      sub: new Vector2(2, 2),
      expected: [1, 0],
    },
    // Array form
    {
      source: new Vector2(3, 2),
      sub: [2, 1],
      expected: [1, 1],
    },
    // Scalar form
    {
      source: new Vector2(3, 2),
      sub: 2,
      expected: [1, 0],
    },
  ]

  for (let {source, sub, expected} of tests) {
    // Static method
    expect(Vector2.sub(source, sub).pos).toEqual(expected)

    // Static with point arrays
    expect(Vector2.sub([source.x, source.y], sub).pos).toEqual(expected)

    // Instance method - doing this after the static method ensures that
    // static methods are non-mutative
    expect(source.sub(sub).pos).toEqual(expected)
  }
})

test('Vector2::multiply', () => {
  const tests: {source: Vector2; apply: InputVector; expected: Position}[] = [
    // Vector2 form
    {
      source: new Vector2(3, 2),
      apply: new Vector2(2, 1),
      expected: [6, 2],
    },
    // Array form
    {
      source: new Vector2(2, 2),
      apply: [2, 3],
      expected: [4, 6],
    },
    // Scalar form
    {
      source: new Vector2(3, 2),
      apply: 2,
      expected: [6, 4],
    },
  ]

  for (let {source, apply, expected} of tests) {
    // Static method
    expect(Vector2.multiply(source, apply).pos).toEqual(expected)

    // Static with point arrays
    expect(Vector2.multiply([source.x, source.y], apply).pos).toEqual(expected)

    // Instance method - doing this after the static method ensures that
    // static methods are non-mutative
    expect(source.multiply(apply).pos).toEqual(expected)
  }
})

test('Vector2::divide', () => {
  const tests: {source: Vector2; divide: InputVector; expected: Position}[] = [
    // Vector2 form
    {
      source: new Vector2(4, 2),
      divide: new Vector2(2, 1),
      expected: [2, 2],
    },
    // Array form
    {
      source: new Vector2(6, 6),
      divide: [2, 3],
      expected: [3, 2],
    },
    // Scalar form
    {
      source: new Vector2(4, 6),
      divide: 2,
      expected: [2, 3],
    },
    // 0 check - returns 0 instead of infinity or error
    {
      source: new Vector2(3, 2),
      divide: 0,
      expected: [0, 0],
    },
  ]

  for (let {source, divide, expected} of tests) {
    // Static method
    expect(Vector2.divide(source, divide).pos).toEqual(expected)

    // Static with point arrays
    expect(Vector2.divide([source.x, source.y], divide).pos).toEqual(expected)

    // Instance method - doing this after the static method ensures that
    // static methods are non-mutative
    expect(source.divide(divide).pos).toEqual(expected)
  }
})

test('Vector2::magnitude', () => {
  const x = new Vector2(0, 2)
  const mag = 4
  expect(x.magnitude(mag).pos).toEqual([0, 4])
})

test('Vector2::len', () => {
  const tests = [
    {v: Vector2.unit([1, 1]), e: 1},
    {v: Vector2.of(0, 4), e: 4},
    {v: Vector2.of(3, 4), e: 5},
  ]

  for (let {v, e} of tests) {
    expect(v.len()).toBeCloseTo(e)
    expect(v.length).toBeCloseTo(e)
    expect(Vector2.len(v)).toBeCloseTo(e)
  }
})

test('Vector2::dot', () => {
  const tests = [
    {
      source: new Vector2(0, 1),
      target: new Vector2(0, 1),
      expected: 1, // Same direction
    },
    {
      source: new Vector2(0, 1),
      target: new Vector2(1, 0),
      expected: 0, // Perpendicular
    },
    {
      source: new Vector2(0, 1),
      target: new Vector2(-1, 0),
      expected: 0, // Perpendicular
    },
    {
      source: new Vector2(0, 1),
      target: new Vector2(0, -1),
      expected: -1, // Opposite directions
    },
  ]

  for (let {source, target, expected} of tests) {
    // Static method
    expect(Vector2.dot(source, target)).toEqual(expected)

    // Static with point arrays
    expect(Vector2.dot([source.x, source.y], [target.x, target.y])).toEqual(
      expected
    )

    // Instance method - doing this after the static method ensures that
    // static methods are non-mutative
    expect(source.dot(target)).toEqual(expected)
  }

  // Sanity check diagonal
  const x = Vector2.of(0, 1)
  const y = Vector2.unit([1, 1])
  const dotProduct = x.dot(y)
  expect(dotProduct > 0.5 && dotProduct < 1).toEqual(true)
})

test('Vector2::cross', () => {
  const tests = [
    {
      source: new Vector2(0, 1),
      target: new Vector2(0, 1),
      expected: -1, // Same direction
    },
    {
      source: new Vector2(0, 1),
      target: new Vector2(1, 0),
      expected: 0, // Perpendicular
    },
    {
      source: new Vector2(0, 1),
      target: new Vector2(-1, 0),
      expected: -0, // Perpendicular
    },
    {
      source: new Vector2(0, 1),
      target: new Vector2(0, -1),
      expected: 1, // Opposite directions
    },
  ]

  for (let {source, target, expected} of tests) {
    // Static method
    expect(Vector2.cross(source, target)).toEqual(expected)

    // Static with point arrays
    expect(Vector2.cross([source.x, source.y], [target.x, target.y])).toEqual(
      expected
    )

    // Instance method - doing this after the static method ensures that
    // static methods are non-mutative
    expect(source.cross(target)).toEqual(expected)
  }

  // Sanity check diagonal
  const x = Vector2.of(0, 1)
  const y = Vector2.unit([1, 1])
  const crossProduct = x.cross(y)
  expect(crossProduct > -1 && crossProduct < -0.5).toEqual(true)
})

test('Vector2::unit', () => {
  const tests = [
    {
      source: new Vector2(0, 2),
      expected: new Vector2(0, 1),
    },
    {
      source: new Vector2(-3, 0),
      expected: new Vector2(-1, 0),
    },
    {
      source: new Vector2(2, 2),
      expected: new Vector2(0.707, 0.707),
    },
  ]

  for (let {source, expected} of tests) {
    // Static method
    const x = Vector2.unit(source)
    expect(x.x).toBeCloseTo(expected.x)
    expect(x.y).toBeCloseTo(expected.y)

    // Instance method
    const y = source.unit()
    expect(y.x).toBeCloseTo(expected.x)
    expect(y.y).toBeCloseTo(expected.y)
  }
})

test('Vector2::normal', () => {
  const tests = [
    {source: new Vector2(0, 1), expected: new Vector2(-1, 0)},
    {source: new Vector2(1, 0), expected: new Vector2(0, 1)},
  ]

  for (let {source, expected} of tests) {
    // Static
    const x = Vector2.normal(source)
    expect(x.x).toBeCloseTo(expected.x)
    expect(x.y).toBeCloseTo(expected.y)

    // Instance
    const y = source.normal()
    expect(y.x).toBeCloseTo(expected.x)
    expect(y.y).toBeCloseTo(expected.y)
  }
})

test('Vector2::backfaceNormal', () => {
  const tests = [
    {source: new Vector2(0, 1), expected: new Vector2(1, 0)},
    {source: new Vector2(1, 0), expected: new Vector2(0, -1)},
  ]

  for (let {source, expected} of tests) {
    // Static
    const x = Vector2.backfaceNormal(source)
    expect(x.x).toBeCloseTo(expected.x)
    expect(x.y).toBeCloseTo(expected.y)

    // Instance
    const y = source.backfaceNormal()
    expect(y.x).toBeCloseTo(expected.x)
    expect(y.y).toBeCloseTo(expected.y)
  }
})

test('Vector2::rotate', () => {
  const v = new Vector2(1, 0)
  const rotation = Math.PI * 0.5

  v.rotate(rotation)
  checkClose(v, new Vector2(0, 1))

  v.rotate(rotation)
  checkClose(v, new Vector2(-1, 0))

  v.rotate(-rotation * 0.5)
  checkClose(v, new Vector2(-0.707, 0.707))

  // Static method
  const v1 = new Vector2(1, 0)
  const v2 = Vector2.rotate(v1, Math.PI * 0.5)
  checkClose(v2, new Vector2(0, 1))
})

test('Vector2::turn', () => {
  const x = new Vector2(1, 0)

  x.turn(Math.PI)
  checkClose(x, Vector2.of(-1, 0))

  x.turn(Math.PI * 0.25)
  checkClose(x, Vector2.of(0.707, 0.707))
})

test('Vector2::angle', () => {
  const x = new Vector2(1, 0)
  const y = new Vector2(0, 1)

  expect(x.angle()).toEqual(0)
  expect(y.angle()).toEqual(Math.PI * 0.5)
})

test('Vector2::fromAngle', () => {
  const x = Vector2.fromAngle(Math.PI * 0.5)

  expect(x instanceof Vector2).toEqual(true)
  checkClose(x, Vector2.of(0, 1))
})

test('Vector2::lerp', () => {
  const x = new Vector2(0, 1)
  const y = x.lerp(0.5)

  expect(y instanceof Vector2).toEqual(true)
  expect(y.pos).toEqual([0, 0.5])
  expect(x.pos).toEqual([0, 1])
})

test('Vector2::distance', () => {
  const x = new Vector2(1, 1)
  const y = new Vector2(4, 5)

  // By testing both directions we also ensure distance is not mutative
  expect(x.distance(y)).toEqual(5)
  expect(y.distance(x)).toEqual(5)
})

test('Vector2::isHeading', () => {
  const x = new Vector2(0, 4)
  const y = new Vector2(0, 2)
  expect(x.isHeading(y)).toEqual(true)
  expect(y.isHeading(x)).toEqual(true)

  const z = new Vector2(1, 4)
  expect(x.isHeading(z)).toEqual(false)
})

test('Vector2::isNearHeading', () => {
  const x = new Vector2(0, 4)
  const y = new Vector2(0.02, 4)
  const angle = Math.PI * 0.25
  expect(x.isNearHeading(y, angle)).toEqual(true)

  const z = new Vector2(1, -5)
  expect(x.isNearHeading(z, angle)).toEqual(false)
})
