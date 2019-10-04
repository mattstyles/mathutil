
import tape from 'tape'

import {Rect} from '../src/rect'

tape('Constructor should create a new instance', t => {
  t.plan(4)

  const x = new Rect(0, 0, 1, 1)

  t.ok(x instanceof Rect, 'Constructor returns a Rect instance')
  t.equal(x.pos.length, 4, 'Rect position has correct length')
  t.deepEqual(x.pos, [0, 0, 1, 1], 'Rect position is correctly assigned')

  const y = Rect.of(0, 0, 1, 1)
  t.deepEqual(y.pos, [0, 0, 1, 1], 'Rect.of works, yada')
})

tape('Rect clone', t => {
  t.plan(2)

  const r1 = Rect.of(0, 0, 1, 1)
  const r2 = Rect.of(r1)

  t.deepEqual(r2.pos, [0, 0, 1, 1], 'Coords are cloned correctly')
  t.notOk(r1 === r2, 'Clone is not the same object')
})

tape('Rect::area -- instance method', t => {
  t.plan(2)

  let x = new Rect(0, 0, 1, 1)
  let y = new Rect(0, 1, 4, 4)

  t.equal(x.area(), 1, 'Area is calculated correctly')
  t.equal(y.area(), 12, 'Area is calculated correctly')
})

tape('Rect::area -- static method', t => {
  t.plan(2)

  let x = new Rect(0, 0, 1, 1)
  let y = new Rect(0, 1, 4, 4)

  t.equal(Rect.area(x), 1, 'Area is calculated correctly')
  t.equal(Rect.area(y), 12, 'Area is calculated correctly')
})

tape('Rect::translate -- instance method', t => {
  t.plan(1)

  let x = new Rect(0, 0, 1, 1)

  t.deepEqual(x.translate(1, 2).pos, [1, 2, 2, 3], 'Area is calculated correctly')
})

tape('Rect::translate -- static method', t => {
  t.plan(3)

  let x = new Rect(0, 0, 1, 1)
  let y = Rect.translate(x, 2, 3)

  t.ok(y instanceof Rect, 'Translate returns a new instance')
  t.deepEqual(x.pos, [0, 0, 1, 1], 'Translate is not mutative')
  t.deepEqual(y.pos, [2, 3, 3, 4], 'Translate moves the rect correctly')
})

tape('Rect::slope', t => {
  t.plan(1)

  let x = new Rect(1, 1, 4, 3)
  let v = x.slope()

  t.deepEqual(v.pos, [3, 2], 'Diagonal slope is returned')
})
