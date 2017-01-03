
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
