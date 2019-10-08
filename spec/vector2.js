
import test from 'tape'

import { Vector2 } from '../src/vector2'

const CLOSE_PRECISION = 0.01

/**
 * Checks if a number is close enough to a target
 */
function close (num, target) {
  return Math.abs(target - num) < CLOSE_PRECISION
}

/**
 * Compares two length-2 arrays to see if the floats they contain
 * are close enough to be considered equal.
 */
function closeEqual (a, b) {
  return close(b[0], a[0]) && close(b[1], a[1])
}

test('Constructor should create a new instance', assert => {
  assert.plan(1)

  const v = new Vector2(10, 10)

  assert.ok(v instanceof Vector2, 'Returns correct instance')
})

test('Vector2 should be able to output its internal structure as either an array or an object', assert => {
  assert.plan(3)

  const v = new Vector2(2, 1)

  assert.deepEqual(v.pos, [2, 1], 'Position as an array is good')
  assert.deepEqual(v.position(), [2, 1], 'Position() as an array is good')
  assert.deepEqual(v.toCartesian(), {
    x: 2,
    y: 1
  }, 'Position as an object is good')
})

test('Vector2::Adding -- instance method', assert => {
  assert.plan(3)

  function add (x, y, exp, str) {
    assert.deepEqual(x.add(y).pos, exp, str)
  }

  add(new Vector2(2, 1), [2, 2], [4, 3], 'Adding a point array is good')
  add(new Vector2(2, 1), 2, [4, 3], 'Adding a scalar is good')
  add(new Vector2(2, 1), new Vector2(2, 2), [4, 3], 'Adding a vector is good')
})

test('Vector2::Adding -- static method', assert => {
  assert.plan(9)

  function add (x, y, exp, str) {
    const res = Vector2.add(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  const x = new Vector2(1, 1)
  const y = new Vector2(2, 2)
  const res = Vector2.add(x, y)
  assert.ok(res instanceof Vector2, 'static add returns a new instance')
  assert.deepEqual(x.pos, [1, 1], 'Adding vectors is non-destructive')
  assert.deepEqual(y.pos, [2, 2], 'Adding vectors is non-destructive')

  add(new Vector2(1, 1), new Vector2(2, 1), [3, 2], 'Adding vectors is good')
  add([1, 1], [2, 1], [3, 2], 'Adding point arrays is good')
  add(new Vector2(1, 1), [2, 1], [3, 2], 'Adding a vector and a point array is good')
  add(1, 2, [3, 3], 'Adding scalars is good')
  add(new Vector2(2, 1), 2, [4, 3], 'Adding a vector and a scalar is good')
  add([2, 1], 2, [4, 3], 'Adding a point array and a scalar is good')
})

test('Vector2::Subtract -- instance method', assert => {
  assert.plan(3)

  function sub (x, y, exp, str) {
    assert.deepEqual(x.sub(y).pos, exp, str)
  }

  sub(new Vector2(3, 2), [1, 1], [2, 1], 'Subtracting a point array is good')
  sub(new Vector2(3, 2), 2, [1, 0], 'Subtracting a scalar is good')
  sub(new Vector2(3, 2), new Vector2(2, 1), [1, 1], 'Subtracting a vector is good')
})

test('Vector2::Subtract -- static method', assert => {
  assert.plan(9)

  function sub (x, y, exp, str) {
    const res = Vector2.sub(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  const x = new Vector2(3, 2)
  const y = new Vector2(1, 1)
  const res = Vector2.sub(x, y)
  assert.ok(res instanceof Vector2, 'static sub returns a new instance')
  assert.deepEqual(x.pos, [3, 2], 'Subtracting vectors is non-destructive')
  assert.deepEqual(y.pos, [1, 1], 'Subtracting vectors is non-destructive')

  sub(new Vector2(2, 1), new Vector2(1, 1), [1, 0], 'Subtracting vectors is good')
  sub([3, 2], [2, 1], [1, 1], 'Subtracting point arrays is good')
  sub(new Vector2(3, 2), [2, 1], [1, 1], 'Subtracting a vector and a point array is good')
  sub(3, 2, [1, 1], 'Subtracting scalars is good')
  sub(new Vector2(3, 2), 2, [1, 0], 'Subtracting a vector and a scalar is good')
  sub([3, 2], 2, [1, 0], 'Subtracting a point array and a scalar is good')
})

test('Vector2::Multiply -- instance method', assert => {
  assert.plan(3)

  function multiply (x, y, exp, str) {
    assert.deepEqual(x.multiply(y).pos, exp, str)
  }

  multiply(new Vector2(3, 2), [2, 1], [6, 2], 'Multiplying a point array is good')
  multiply(new Vector2(3, 2), 2, [6, 4], 'Multiplying a scalar is good')
  multiply(new Vector2(3, 2), new Vector2(2, 3), [6, 6], 'Multiplying a vector is good')
})

test('Vector2::Multiply -- static method', assert => {
  assert.plan(9)

  function multiply (x, y, exp, str) {
    const res = Vector2.multiply(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  const x = new Vector2(3, 2)
  const y = new Vector2(1, 1)
  const res = Vector2.multiply(x, y)
  assert.ok(res instanceof Vector2, 'static sub returns a new instance')
  assert.deepEqual(x.pos, [3, 2], 'Multiplying vectors is non-destructive')
  assert.deepEqual(y.pos, [1, 1], 'Multiplying vectors is non-destructive')

  multiply(new Vector2(2, 1), new Vector2(1, 1), [2, 1], 'Multiplying vectors is good')
  multiply([3, 2], [2, 3], [6, 6], 'Multiplying point arrays is good')
  multiply(new Vector2(3, 2), [2, 2], [6, 4], 'Multiplying a vector and a point array is good')
  multiply(3, 2, [6, 6], 'Multiplying scalars is good')
  multiply(new Vector2(3, 2), 2, [6, 4], 'Multiplying a vector and a scalar is good')
  multiply([3, 2], 2, [6, 4], 'Multiplying a point array and a scalar is good')
})

test('Vector2::Divide -- instance method', assert => {
  assert.plan(4)

  function divide (x, y, exp, str) {
    assert.deepEqual(x.divide(y).pos, exp, str)
  }

  divide(new Vector2(3, 2), [1, 1], [3, 2], 'Dividing a point array is good')
  divide(new Vector2(4, 2), 2, [2, 1], 'Dividing a scalar is good')
  divide(new Vector2(4, 2), new Vector2(2, 1), [2, 2], 'Dividing a vector is good')
  divide(new Vector2(4, 2), [2, 0], [2, 0], 'Dividing by 0 returns 0 rather than infinity')
})

test('Vector2::Divide -- static method', assert => {
  assert.plan(10)

  function divide (x, y, exp, str) {
    const res = Vector2.divide(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  const x = new Vector2(3, 2)
  const y = new Vector2(1, 1)
  const res = Vector2.divide(x, y)
  assert.ok(res instanceof Vector2, 'static sub returns a new instance')
  assert.deepEqual(x.pos, [3, 2], 'Dividing vectors is non-destructive')
  assert.deepEqual(y.pos, [1, 1], 'Dividing vectors is non-destructive')

  divide(new Vector2(6, 4), new Vector2(3, 2), [2, 2], 'Dividing vectors is good')
  divide([4, 2], [2, 1], [2, 2], 'Dividing point arrays is good')
  divide(new Vector2(4, 4), [2, 2], [2, 2], 'Dividing a vector and a point array is good')
  divide(4, 2, [2, 2], 'Dividing scalars is good')
  divide(new Vector2(4, 2), 2, [2, 1], 'Dividing a vector and a scalar is good')
  divide([4, 2], 2, [2, 1], 'Dividing a point array and a scalar is good')

  divide([2, 1], [2, 0], [1, 0], 'Dividing by 0 returns 0 rather than infinity')
})

test('Vector2::magnitude', assert => {
  assert.plan(2)

  const x = new Vector2(0, 2)
  const mag = 4

  assert.deepEqual(x.magnitude(mag).pos, [0, 4], 'Vector magnitude can be set')
  assert.equal(x.len(), mag, 'Length is correctly calculated')
})

test('Vector2::dot -- instance method', assert => {
  assert.plan(5)

  const x = new Vector2(0, 1)

  // Check cardinals
  assert.equal(x.dot([0, 1]), 1, 'Both vectors point in the same direction')
  assert.equal(x.dot([1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(x.dot([-1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(x.dot([0, -1]), -1, 'Vectors point in opposite directions')

  // Sanity check diagonal
  const ne = Vector2.unit([1, 1])
  const dot = x.dot(ne)
  assert.ok(dot > 0.5 && dot < 1, 'Vectors are at 45 degrees')
})

test('Vector2::dot -- static method', assert => {
  assert.plan(5)

  const x = [0, 1]

  // Check cardinals
  assert.equal(Vector2.dot(x, [0, 1]), 1, 'Both vectors point in the same direction')
  assert.equal(Vector2.dot(x, [1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(Vector2.dot(x, [-1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(Vector2.dot(x, [0, -1]), -1, 'Vectors point in opposite directions')

  // Sanity check diagonal
  const ne = Vector2.unit([1, 1])
  const dot = Vector2.dot(x, ne)
  assert.ok(dot > 0.5 && dot < 1, 'Vectors are at 45 degrees')
})

test('Vector2::cross -- instance method', assert => {
  assert.plan(5)

  const x = new Vector2(0, 1)

  // Check cardinals
  assert.equal(x.cross([0, 1]), -1, 'Both vectors point in the same direction')
  assert.equal(x.cross([1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(x.cross([-1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(x.cross([0, -1]), 1, 'Vectors point in opposite directions')

  // Sanity check diagonal
  const ne = Vector2.unit([1, 1])
  const cross = x.cross(ne)
  assert.ok(cross > -1 && cross < -0.5, 'Vectors are at 45 degrees')
})

test('Vector2::cross -- static method', assert => {
  assert.plan(5)

  const x = [0, 1]

  // Check cardinals
  assert.equal(Vector2.cross(x, [0, 1]), -1, 'Both vectors point in the same direction')
  assert.equal(Vector2.cross(x, [1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(Vector2.cross(x, [-1, 0]), 0, 'Vectors are perpendicular')
  assert.equal(Vector2.cross(x, [0, -1]), 1, 'Vectors point in opposite directions')

  // Sanity check diagonal
  const ne = Vector2.unit([1, 1])
  const cross = Vector2.cross(x, ne)
  assert.ok(cross > -1 && cross < -0.5, 'Vectors are at 45 degrees')
})

test('Vector2::len -- instance method', assert => {
  assert.plan(3)

  assert.equal(new Vector2(0, 1).len(), 1, 'Unit vector is length 1')
  assert.equal(new Vector2(0, 2).len(), 2, 'Vector length is correct')
  assert.equal(new Vector2(3, 4).len(), 5, 'Vector length is correct')
})

test('Vector2::len -- static method', assert => {
  assert.plan(3)

  assert.equal(Vector2.len([0, 1]), 1, 'Unit vector is length 1')
  assert.equal(Vector2.len([0, 2]), 2, 'Vector length is correct')
  assert.equal(Vector2.len([3, 4]), 5, 'Vector length is correct')
})

test('Vector2::unit -- instance method', assert => {
  assert.plan(7)

  assert.deepEqual(new Vector2(0, 2).unit().pos, [0, 1], 'Unit vector is correct')
  assert.deepEqual(new Vector2(-3, 0).unit().pos, [-1, 0], 'Unit vector is correct')

  const diag = new Vector2(2, 2).unit().pos
  assert.ok(diag[0] > 0.707 && diag[0] < 0.708, 'Diagonal x component unit is correct')
  assert.ok(diag[1] > 0.707 && diag[1] < 0.708, 'Diagonal y component unit is correct')

  const x = new Vector2(0, 5)
  const y = x.unit()
  assert.ok(y instanceof Vector2, 'unit returns a Vector2 instance')
  assert.deepEqual(x.pos, [0, 5], 'unit is not mutative')
  assert.deepEqual(y.pos, [0, 1], 'unit vector calculated')
})

test('Vector2::unit -- static method', assert => {
  assert.plan(4)

  assert.deepEqual(Vector2.unit([0, 2]).pos, [0, 1], 'Unit vector is correct')
  assert.deepEqual(Vector2.unit([-3, 0]).pos, [-1, 0], 'Unit vector is correct')

  const diag = Vector2.unit([2, 2]).pos
  assert.ok(diag[0] > 0.707 && diag[0] < 0.708, 'Diagonal x component unit is correct')
  assert.ok(diag[1] > 0.707 && diag[1] < 0.708, 'Diagonal y component unit is correct')
})

test('Vector2::normal -- instance method', assert => {
  assert.plan(2)

  assert.deepEqual(new Vector2(0, 1).normal().pos, [-1, 0], 'Normal vector is correct')
  assert.deepEqual(new Vector2(1, 0).normal().pos, [0, 1], 'Normal vector is correct')
})

test('Vector2::normal -- static method', assert => {
  assert.plan(2)

  assert.deepEqual(Vector2.normal([0, 1]).pos, [-1, 0], 'Normal vector is correct')
  assert.deepEqual(Vector2.normal([1, 0]).pos, [0, 1], 'Normal vector is correct')
})

test('Vector2::backfaceNormal -- instance method', assert => {
  assert.plan(2)

  assert.deepEqual(new Vector2(0, 1).backfaceNormal().pos, [1, 0], 'Backface normal vector is correct')
  assert.deepEqual(new Vector2(1, 0).backfaceNormal().pos, [0, -1], 'Backface normal vector is correct')
})

test('Vector2::backfaceNormal -- static method', assert => {
  assert.plan(2)

  assert.deepEqual(Vector2.backfaceNormal([0, 1]).pos, [1, 0], 'Backface normal vector is correct')
  assert.deepEqual(Vector2.backfaceNormal([1, 0]).pos, [0, -1], 'Backface normal vector is correct')
})

test('Vector2::rotate', assert => {
  assert.plan(3)

  const x = new Vector2(1, 0)
  const rotation = Math.PI * 0.5

  assert.ok(closeEqual(x.rotate(rotation).pos, [0, 1]), 'rotates to the left')
  assert.ok(closeEqual(x.rotate(rotation).pos, [-1, 0]), 'rotates to the left')
  assert.ok(closeEqual(x.rotate(-rotation * 0.5).pos, [-0.707, 0.707]), 'rotates to the right')
})

test('Vector2::turn', assert => {
  assert.plan(2)

  const x = new Vector2(1, 0)

  assert.ok(closeEqual(x.turn(Math.PI).pos, [-1, 0]), 'turns to face a given direction')
  assert.ok(closeEqual(x.turn(Math.PI * 0.25).pos, [0.707, 0.707]), 'turns to face a given direction')
})

test('Vector2::angle', assert => {
  assert.plan(2)

  const x = new Vector2(1, 0)
  const y = new Vector2(0, 1)

  assert.equal(x.angle(), 0, 'Right is 0 degrees')
  assert.equal(y.angle(), Math.PI * 0.5, 'Straight up is 90 degrees')
})

test('Vector2::fromAngle', assert => {
  assert.plan(2)

  const x = Vector2.fromAngle(Math.PI * 0.5)

  assert.ok(x instanceof Vector2, 'fromAngle returns a Vector2 instance')
  assert.ok(closeEqual(x.pos, [0, 1]), 'Correct vector generated by fromAngle')
})

test('Vector2::lerp', assert => {
  assert.plan(3)

  const x = new Vector2(0, 1)
  const y = x.lerp(0.5)

  assert.ok(y instanceof Vector2, 'lerp returns a Vector2 instance')
  assert.deepEqual(y.pos, [0, 0.5], 'lerp correctly calculates a new vector')
  assert.deepEqual(x.pos, [0, 1], 'lerp is not mutative')
})

test('Vector2::distance', assert => {
  assert.plan(2)

  const x = new Vector2(1, 1)
  const y = new Vector2(4, 5)

  // By testing both directions we also ensure distance is not mutative
  assert.equal(x.distance(y), 5, 'Calculates the correct distance')
  assert.equal(y.distance(x), 5, 'Distance is communative')
})

test('Vector2::isHeading', assert => {
  assert.plan(3)

  const x = new Vector2(0, 4)
  const y = new Vector2(0, 2)
  assert.ok(x.isHeading(y), 'Heading is good')
  assert.ok(y.isHeading(x), 'Heading is communative')

  const z = new Vector2(1, 4)
  assert.notOk(x.isHeading(z), 'Heading can return false')
})

test('Vector2::isNearHeading', assert => {
  assert.plan(2)

  const x = new Vector2(0, 4)
  const y = new Vector2(0.02, 4)
  const angle = Math.PI * 0.25
  assert.ok(x.isNearHeading(y, angle), 'Near heading is good')

  const z = new Vector2(1, -5)
  assert.notOk(x.isNearHeading(z, angle), 'Near heading can return false')
})
