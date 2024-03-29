import type {InputPoint} from './inputScalar.ts'

import {Point} from './point.ts'
import {euclidean} from './euclidean.ts'

it('Should calculate the euclidean distance between 2 points', () => {
  for (const {a, b, expected} of tests) {
    expect(euclidean(a, b)).toBeCloseTo(expected)
  }
})

const tests: {a: InputPoint; b: InputPoint; expected: number}[] = [
  {
    a: [0, 0],
    b: [1, 1],
    expected: 1.414,
  },
  {
    a: [1, 1],
    b: [4, 5],
    expected: 5,
  },
  {
    a: Point.of(1, 2),
    b: Point.of(4, 2),
    expected: 3,
  },
  {
    a: {x: 0, y: 0},
    b: {x: 6, y: 8},
    expected: 10,
  },
]
