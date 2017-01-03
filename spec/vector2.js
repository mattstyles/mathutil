
import test from 'tape'

import Vector2 from '../src/vector2'

test('Constructor should create a new instance', assert => {
  assert.plan(1)

  let v = new Vector2(10, 10)

  assert.ok(v instanceof Vector2, 'Returns correct instance')
})

test('Vector2 should be able to output its internal structure as either an array or an object', assert => {
  assert.plan(3)

  let v = new Vector2(2, 1)

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
    let res = Vector2.add(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  let x = new Vector2(1, 1)
  let y = new Vector2(2, 2)
  let res = Vector2.add(x, y)
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
    let res = Vector2.sub(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  let x = new Vector2(3, 2)
  let y = new Vector2(1, 1)
  let res = Vector2.sub(x, y)
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
    let res = Vector2.multiply(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  let x = new Vector2(3, 2)
  let y = new Vector2(1, 1)
  let res = Vector2.multiply(x, y)
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
    let res = Vector2.divide(x, y)
    assert.deepEqual(res.pos, exp, str)
  }

  let x = new Vector2(3, 2)
  let y = new Vector2(1, 1)
  let res = Vector2.divide(x, y)
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
