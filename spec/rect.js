
import test from 'tape'

import Rect from '../src/rect'

test('Constructor should create a new instance', assert => {
  assert.plan(3)

  let x = new Rect(0, 0, 1, 1)

  assert.ok(x instanceof Rect, 'Constructor returns a Rect instance')
  assert.equal(x.pos.length, 4, 'Rect position has correct length')
  assert.deepEqual(x.pos, [0, 0, 1, 1], 'Rect position is correctly assigned')
})

test('Rect::area -- instance method', assert => {
  assert.plan(1)

  let x = new Rect(0, 0, 1, 1)

  assert.equal(x.area(), 1, 'Area is calculated correctly')
})

test('Rect::area -- static method', assert => {
  assert.plan(1)

  let x = new Rect(0, 0, 1, 1)

  assert.equal(Rect.area(x), 1, 'Area is calculated correctly')
})

test('Rect::translate -- instance method', assert => {
  assert.plan(1)

  let x = new Rect(0, 0, 1, 1)

  assert.deepEqual(x.translate(1, 2).pos, [1, 2, 2, 3], 'Area is calculated correctly')
})

test('Rect::translate -- static method', assert => {
  assert.plan(3)

  let x = new Rect(0, 0, 1, 1)
  let y = Rect.translate(x, 2, 3)

  assert.ok(y instanceof Rect, 'Translate returns a new instance')
  assert.deepEqual(x.pos, [0, 0, 1, 1], 'Translate is not mutative')
  assert.deepEqual(y.pos, [2, 3, 3, 4], 'Translate moves the rect correctly')
})

test('Rect::slope', assert => {
  assert.plan(1)

  let x = new Rect(1, 1, 4, 3)
  let v = x.slope()

  assert.deepEqual(v.pos, [3, 2], 'Diagonal slope is returned')
})
