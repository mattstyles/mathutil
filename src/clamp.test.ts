import {clamp} from './clamp.ts'

it('Should clamp the value to a defined range', () => {
  for (const {min, max, value, expected} of tests) {
    expect(clamp(min, max, value)).toBeCloseTo(expected)
  }
})

it('Should return a function that can be used with the defined range to clamp a value', () => {
  for (const {min, max, value, expected} of tests) {
    const fn = clamp(min, max)
    expect(fn(value)).toBeCloseTo(expected)
  }
})

const tests = [
  {
    min: 0,
    max: 10,
    value: 5,
    expected: 5,
  },
  {
    min: 0,
    max: 10,
    value: -2,
    expected: 0,
  },
  {
    min: 0,
    max: 10,
    value: 15,
    expected: 10,
  },
  {
    min: -10,
    max: 10,
    value: -2,
    expected: -2,
  },
  {
    min: -10,
    max: 10,
    value: -20,
    expected: -10,
  },
  {
    min: -10,
    max: 10,
    value: 11,
    expected: 10,
  },
  {
    min: 6,
    max: 12,
    value: 5,
    expected: 6,
  },
  {
    min: 6,
    max: 12,
    value: 8,
    expected: 8,
  },
  {
    min: 6,
    max: 12,
    value: 22,
    expected: 12,
  },
  {
    min: -14,
    max: -3,
    value: 5,
    expected: -3,
  },
  {
    min: -14,
    max: -3,
    value: -10,
    expected: -10,
  },
  {
    min: -14,
    max: -3,
    value: -16,
    expected: -14,
  },
  {
    min: -14,
    max: -3,
    value: -1,
    expected: -3,
  },
  {
    min: 2,
    max: 29,
    value: 6.3,
    expected: 6.3,
  },
  {
    min: 2,
    max: 29,
    value: 29.014,
    expected: 29,
  },
  {
    min: 2,
    max: 21,
    value: 1.3,
    expected: 2,
  },
  {
    min: -1.4,
    max: 3.2,
    value: 0.12,
    expected: 0.12,
  },
  {
    min: -1.4,
    max: 3.2,
    value: -2,
    expected: -1.4,
  },
  {
    min: -1.4,
    max: 3.2,
    value: 3.21,
    expected: 3.2,
  },
]
