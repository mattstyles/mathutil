import {Rect} from './rect.ts'
import {Point} from './point.ts'
import {Vector2} from './vector2.ts'

test('Constructor should create a new instance', () => {
  const x = new Rect(0, 0, 1, 1)

  expect(x instanceof Rect).toEqual(true)
  expect(x.pos.length).toEqual(4)
  expect(x.pos).toEqual([0, 0, 1, 1])

  // Test .of constructor
  const y = Rect.of(0, 0, 1, 1)
  expect(y.pos).toEqual([0, 0, 1, 1])
})

test('Rect clone', () => {
  const r1 = Rect.of(0, 0, 1, 1)
  const r2 = Rect.of(r1)

  expect(r2.pos).toEqual([0, 0, 1, 1])
  expect(r1 === r2).toEqual(false)
})

test('Rect::area -- instance getter method', () => {
  const x = new Rect(0, 0, 1, 1)
  const y = new Rect(0, 1, 4, 4)
  const z = new Rect(-1, -1, 1, 1)

  expect(x.area).toEqual(1)
  expect(y.area).toEqual(12)
  expect(z.area).toEqual(4)
})

test('Rect::area -- static method', () => {
  const x = new Rect(0, 0, 1, 1)
  const y = new Rect(0, 1, 4, 4)
  const z = new Rect(-1, -1, 1, 1)

  expect(Rect.area(x)).toEqual(1)
  expect(Rect.area(y)).toEqual(12)
  expect(Rect.area(z)).toEqual(4)
})

test('Rect::translate -- instance method', () => {
  const x = new Rect(0, 0, 1, 1)

  // Translate instance method is mutative
  x.translate(1, 2)
  expect(x.pos).toEqual([1, 2, 2, 3])
})

test('Rect::translate -- static method', () => {
  const x = new Rect(0, 0, 1, 1)
  const y = Rect.translate(x, 2, 3)

  expect(y instanceof Rect).toEqual(true)
  expect(x.pos).toEqual([0, 0, 1, 1])
  expect(y.pos).toEqual([2, 3, 3, 4])

  // Translate static method is not mutative, returns new Rect
})

test('Rect::scale -- instance method', () => {
  const r1 = Rect.of(0, 0, 2, 2)
  const s1 = r1.scale(2)

  // Scale instance method is mutative
  expect(s1.pos).toEqual([0, 0, 4, 4])
  expect(r1.pos).toEqual([0, 0, 4, 4])
  expect(r1 === s1).toEqual(true)

  // Scale down
  s1.scale(0.5)
  expect(s1.pos).toEqual([0, 0, 2, 2])

  // Scale is from the origin coordinates
  const r2 = Rect.of(2, 2, 5, 5)
  const expected = Rect.of(2, 2, 8, 8)

  expect(r2.scale(2).pos).toEqual(expected.pos)
})

test('Rect::scale -- static method', () => {
  const r1 = Rect.of(0, 0, 2, 2)
  const s1 = Rect.scale(r1, 2)

  // Scale static method is not mutative and returns a new instance
  expect(r1.pos).toEqual([0, 0, 2, 2])
  expect(s1.pos).toEqual([0, 0, 4, 4])
  expect(r1 === s1).toEqual(false)

  // Scale down
  const r2 = Rect.scale(r1, 0.5)
  expect(r1.pos).toEqual([0, 0, 2, 2])
  expect(r2.pos).toEqual([0, 0, 1, 1])

  // Scale is from the origin coordinates
  const x = Rect.of(2, 2, 5, 5)
  const y = Rect.scale(x, 2)
  const expected = [2, 2, 8, 8]

  expect(y.pos).toEqual(expected)
})

test('Rect::constrict -- instance method', () => {
  const r1 = Rect.of(0, 0, 4, 4)
  const s1 = r1.constrict(1, 1)
  const e1 = [1, 1, 3, 3]

  // Constrict instance is mutative
  expect(r1.pos).toEqual(e1)
  expect(r1 === s1).toEqual(true)

  // Constrict can apply to a single axis
  const r2 = Rect.of(0, 0, 5, 3)
  const e2 = [1, 0, 4, 3]
  expect(r2.constrict(1, 0).pos).toEqual(e2)

  // Negative i.e. unconstricts
  const r3 = Rect.of(2, 2, 8, 8)
  const e3 = [0, 0, 10, 10]
  expect(r3.constrict(-2, -2).pos).toEqual(e3)
})

test('Rect::constricts -- static method', () => {
  const r1 = Rect.of(0, 0, 6, 4)
  const c1 = Rect.constrict(r1, 1, 1)
  const e1 = [1, 1, 5, 3]

  // Constrict static method is not mutative and returns a new instance
  expect(c1.pos).toEqual(e1)
  expect(r1 === c1).toEqual(false)

  // Constriction across a single axis
  const r2 = Rect.of(0, 0, 5, 3)
  const e2 = [1, 0, 4, 3]
  expect(Rect.constrict(r2, 1, 0).pos).toEqual(e2)

  // Negative
  const r3 = Rect.of(2, 2, 8, 8)
  const e3 = [0, 0, 10, 10]
  expect(Rect.constrict(r3, -2, -2).pos).toEqual(e3)
})

test('Rect::slope', () => {
  const x = new Rect(1, 1, 4, 3)
  const v = x.slope()

  expect(v instanceof Vector2).toEqual(true)
  expect(v.pos).toEqual([3, 2])
})

test('Rect::equal', () => {
  const r1 = Rect.of(0, 0, 3, 3)
  const r2 = Rect.of(0, 0, 3, 3)

  expect(r1.equal(r2)).toEqual(true)
  expect(r1.equal(0, 0, 3, 3)).toEqual(true)
  expect(r1 === r2).toEqual(false)
})

test('Rect can round its vertices to integers', () => {
  const r1 = Rect.of(0.6, 0.3, 5.2, 5.9)
  const e1 = [0, 0, 5, 5]

  expect(r1.floor().pos).toEqual(e1)

  const r2 = Rect.of(0.6, 0.3, 5.2, 5.9)
  const e2 = [1, 1, 6, 6]

  expect(r2.ceil().pos).toEqual(e2)

  const r3 = Rect.of(0.6, 0.3, 5.2, 5.9)
  const e3 = [0, 0, 6, 6]

  expect(r3.round().pos).toEqual(e3)
})

test('Rect::contains', () => {
  const r1 = Rect.of(2, 2, 8, 8)

  // Handles Rect, Point, object and values
  expect(r1.contains(Rect.of(4, 5, 6, 7))).toEqual(true)
  expect(r1.contains(Point.of(5, 6))).toEqual(true)
  expect(r1.contains({x: 5, y: 3})).toEqual(true)
  expect(r1.contains(3, 7)).toEqual(true)

  // False if target surround base
  expect(r1.contains(Rect.of(0, 0, 10, 10))).toEqual(false)
  // False is target is not completely contained
  expect(r1.contains(Rect.of(0, 6, 4, 7))).toEqual(false)

  // Check false returns for Point, object, value
  expect(r1.contains(Point.of(4, 12))).toEqual(false)
  expect(r1.contains({x: 12, y: 7})).toEqual(false)
  expect(r1.contains(23, 3)).toEqual(false)

  // Check floats
  expect(r1.contains(Point.of(2.3, 5.43))).toEqual(true)
  expect(r1.contains({x: 1.1, y: 16.2})).toEqual(false)
  expect(r1.contains(-10, -12)).toEqual(false)

  // Check boundary edges and same size
  expect(r1.contains(2, 2)).toEqual(true)
  expect(r1.contains(8, 8)).toEqual(true)
  expect(r1.contains(Rect.of(2, 2, 8, 8))).toEqual(true)

  // Check source with negative values
  const r2 = Rect.of(-4, 2, -1, 10)

  expect(r2.contains(-2, 4)).toEqual(true)
  expect(r2.contains(-1, 2.3)).toEqual(true)
  expect(r2.contains(-3.2, 8)).toEqual(true)
  expect(r2.contains(Rect.of(-2, 2, -1, 6))).toEqual(true)
  expect(r2.contains(-12, 16)).toEqual(false)
})
