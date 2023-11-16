import {Point} from './point.ts'

test('Point::Constructor', () => {
  const p1 = new Point(1, 2)
  expect(p1.x).toEqual(1)
  expect(p1.y).toEqual(2)

  const p2 = Point.of(3, 4)
  expect(p2.x).toEqual(3)
  expect(p2.y).toEqual(4)
})

test('Point::clone', () => {
  const p1 = Point.of(1, 3)
  const p2 = Point.of(p1)

  expect(p1.equal(p2)).toEqual(true)
  expect(p1 === p2).toEqual(false)
})

test('Point::equal', () => {
  const p1 = Point.of(0, 2)
  const p2 = Point.of(0, 2)

  // Check against values, object, or Point
  expect(p1.equal(0, 2)).toEqual(true)
  expect(p1.equal({x: 0, y: 2})).toEqual(true)
  expect(p1.equal(p2)).toEqual(true)

  // Equals alias
  expect(p1.equals(p2)).toEqual(true)

  // Check false path
  expect(p1.equal(2, 3)).toEqual(false)
  expect(p1.equal(0, 3)).toEqual(false)
})

test('Point::translate instance member', () => {
  const p1 = Point.of(1, 2)

  // Positive
  p1.translate(3, 4)
  expect(p1.equal({x: 4, y: 6})).toEqual(true)

  // Negative
  p1.translate(-1, -1)
  expect(p1.equal({x: 3, y: 5})).toEqual(true)

  // Should return the point object itself
  expect(p1.translate(1, 1) === p1).toEqual(true)
})

test('Point::translate static method', () => {
  const p1 = Point.of(1, 1)
  const p2 = Point.of(3, 4)
  const t1 = Point.translate(p1, p2)

  expect(t1.equal(4, 5)).toEqual(true)

  const p3 = Point.of(1, 1)
  const p4 = Point.of(-3, -4)
  const t2 = Point.translate(p3, p4)

  expect(t2.equal(-2, -3)).toEqual(true)

  expect(t1 instanceof Point).toEqual(true)
})
