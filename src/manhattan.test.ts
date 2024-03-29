import {InputPoint} from './inputScalar.ts'

import {Point} from './point.ts'
import {manhattan} from './manhattan.ts'

it('Should calculate the manhattan distance between 2 points', () => {
  for (const {a, b, expected} of tests) {
    expect(manhattan(a, b)).toEqual(expected)
  }
})

const tests: {a: InputPoint; b: InputPoint; expected: number}[] = [
  {
    a: [0, 0],
    b: [1, 1],
    expected: 2,
  },
  {
    a: [1, 1],
    b: [4, 5],
    expected: 7,
  },
  {
    a: Point.of(1, 2),
    b: Point.of(4, 2),
    expected: 3,
  },
  {
    a: {x: 0, y: 0},
    b: {x: 6, y: 8},
    expected: 14,
  },
]
