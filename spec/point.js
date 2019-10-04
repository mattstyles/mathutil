
import tape from 'tape'

import { Point } from '../src'

tape('Point::Constructor', t => {
  t.plan(2)

  const p1 = new Point(1, 2)
  const p2 = Point.of(3, 4)

  t.ok(p1.x === 1 && p2.x === 3, 'constructor applies x aspect')
  t.ok(p1.y === 2 && p2.y === 4, 'constructor applies x aspect')
})

tape('Point::clone', t => {
  t.plan(2)

  const p1 = Point.of(1, 3)
  const p2 = Point.of(p1)

  t.ok(p1.equal(p2), 'Cloned point is equivalent')
  t.notOk(p1 === p2, 'Clone is not === the same')
})

tape('Point::toCartesian', t => {
  t.plan(3)

  const p1 = Point.of(1, 2)
  const coord = p1.toCartesian()

  t.equal(typeof coord, 'object', 'coords are an object')
  t.equal(coord.x, 1, 'coord x is applied correctly')
  t.equal(coord.y, 2, 'coord y is applied correctly')
})

tape('Point::equal', t => {
  t.plan(6)

  const p1 = Point.of(0, 2)
  const p2 = Point.of(0, 2)

  t.ok(p1.equal(0, 2), 'Equal takes an x and a y')
  t.ok(p1.equal({ x: 0, y: 2 }), 'Equal takes a plain object')
  t.ok(p1.equal(p2), 'Equal takes a Point instance')

  t.ok(p1.equals(p2), 'Equals alias also works')

  t.notOk(p1.equal(2, 3), 'Equal knows when you are lying')
  t.notOk(p1.equal(0, 3), 'Equal knows when you are lying')
})

tape('Point::translate instance member', t => {
  t.plan(3)

  const p1 = Point.of(1, 2)
  p1.translate(3, 4)

  t.ok(p1.equal({ x: 4, y: 6 }), 'Translate moves positively')

  p1.translate(-1, -1)
  t.ok(p1.equal({ x: 3, y: 5 }), 'Translate moves positively')

  t.ok(p1.translate(1, 1) === p1, 'Returns the Point object')
})

tape('Point::translate static method', t => {
  t.plan(3)

  const p1 = Point.of(1, 1)
  const p2 = Point.of(3, 4)
  const t1 = Point.translate(p1, p2)

  t.ok(t1.equal(4, 5), 'Translates moves positively')

  const p3 = Point.of(1, 1)
  const p4 = Point.of(-3, -4)
  const t2 = Point.translate(p3, p4)

  t.ok(t2.equal(-2, -3), 'Translate moves negatively')

  t.ok(t1 instanceof Point, 'Returns a new Point object')
})
