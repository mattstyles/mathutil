
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

tape('Rect::scale -- instance method', t => {
  t.plan(5)

  const r1 = Rect.of(0, 0, 2, 2)
  const s1 = r1.scale(2)

  t.deepEqual(s1.pos, [0, 0, 4, 4], 'Scales up')
  t.deepEqual(r1.pos, [0, 0, 4, 4], 'Scaling is mutative')
  t.ok(r1 === s1, 'Scaling returns itself')

  t.deepEqual(s1.scale(0.5).pos, [0, 0, 2, 2], 'Scales down')

  const r2 = Rect.of(2, 2, 5, 5)
  const expected = Rect.of(2, 2, 8, 8)

  t.deepEqual(r2.scale(2).pos, expected.pos, 'Scale preserves [x1, y1]')
})

tape('Rect::scale -- static method', t => {
  t.plan(5)

  const r1 = Rect.of(0, 0, 2, 2)
  const s1 = Rect.scale(r1, 2)

  t.deepEqual(s1.pos, [0, 0, 4, 4], 'Scales up')
  t.deepEqual(r1.pos, [0, 0, 2, 2], 'Scaling preserves passed in Rect')
  t.ok(r1 !== s1, 'Scaling returns a new instance')

  t.deepEqual(Rect.scale(r1, 0.5).pos, [0, 0, 1, 1], 'Scales down')

  const r2 = Rect.of(2, 2, 5, 5)
  const s2 = Rect.scale(r2, 2)
  const expected = [2, 2, 8, 8]

  t.deepEqual(s2.pos, expected, 'Scale preserves [x1, y1]')
})

tape('Rect::constrict -- instance method', t => {
  t.plan(4)

  const r1 = Rect.of(0, 0, 4, 4)
  const s1 = r1.constrict(1, 1)
  const e1 = [1, 1, 3, 3]

  t.deepEqual(r1.pos, e1, 'Constrict constricts')
  t.ok(r1 === s1, 'Constrict returns an instance')

  const r2 = Rect.of(0, 0, 5, 3)
  const e2 = [1, 0, 4, 3]

  t.deepEqual(r2.constrict(1, 0).pos, e2, 'Constrict applies to a single axis')

  const r3 = Rect.of(2, 2, 8, 8)
  const e3 = [0, 0, 10, 10]
  t.deepEqual(r3.constrict(-2, -2).pos, e3, 'Constrict unconstricts, nice.')
})

tape('Rect::constricts -- static method', t => {
  t.plan(4)

  const r1 = Rect.of(0, 0, 6, 4)
  const c1 = Rect.constrict(r1, 1, 1)
  const e1 = [1, 1, 5, 3]

  t.deepEqual(c1.pos, e1, 'Constrict constricts')
  t.notOk(r1 === c1, 'Returns a new instance')

  const r2 = Rect.of(0, 0, 5, 3)
  const e2 = [1, 0, 4, 3]

  t.deepEqual(Rect.constrict(r2, 1, 0).pos, e2, 'Constrict applies to a single axis')

  const r3 = Rect.of(2, 2, 8, 8)
  const e3 = [0, 0, 10, 10]
  t.deepEqual(Rect.constrict(r3, -2, -2).pos, e3, 'Constrict unconstricts, nice.')
})

tape('Rect::slope', t => {
  t.plan(1)

  let x = new Rect(1, 1, 4, 3)
  let v = x.slope()

  t.deepEqual(v.pos, [3, 2], 'Diagonal slope is returned')
})

tape('Rect::equal', t => {
  t.plan(3)

  const r1 = Rect.of(0, 0, 3, 3)
  const r2 = Rect.of(0, 0, 3, 3)

  t.ok(r1.equal(r2), 'Equal knows when things are equal')
  t.ok(r1.equal(0, 0, 3, 3), 'Equal accepts vertex parameters')
  t.notOk(r1 === r2, 'Test subjects are not the same pointer')
})

tape('Rect can round its vertices to integers', t => {
  t.plan(3)

  const r1 = Rect.of(0.6, 0.3, 5.2, 5.9)
  const e1 = [0, 0, 5, 5]

  t.deepEqual(r1.floor().pos, e1, 'Rounds down all vertices')

  const r2 = Rect.of(0.6, 0.3, 5.2, 5.9)
  const e2 = [1, 1, 6, 6]

  t.deepEqual(r2.ceil().pos, e2, 'Rounds up all vertices')

  const r3 = Rect.of(0.6, 0.3, 5.2, 5.9)
  const e3 = [0, 0, 6, 6]

  t.deepEqual(r3.round().pos, e3, 'Rounds down [x1, y1] and up [x2, y2]')
})
