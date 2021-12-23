import {wrap} from './wrap'

test('Wrap should wrap values around the specified range when they overflow', () => {
  for (let {min, max, value, expected} of tests) {
    expect(wrap(min, max, value)).toBeCloseTo(expected)
  }
})

test('Wrap has a curried form which can be used', () => {
  for (let {min, max, value, expected} of tests) {
    let fn = wrap(min, max)
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
    expected: 8,
  },
  {
    min: 0,
    max: 10,
    value: 13,
    expected: 3,
  },
  {
    min: -10,
    max: 10,
    value: -15,
    expected: 5,
  },
  {
    min: -10,
    max: 10,
    value: 2,
    expected: 2,
  },
  {
    min: -10,
    max: 16,
    value: 17,
    expected: -9,
  },
  {
    min: 0.6,
    max: 10.4,
    value: 10.6,
    expected: 0.8,
  },
  {
    min: -1.3,
    max: 9.7,
    value: 10,
    expected: -1,
  },
  {
    min: -1.9,
    max: 6.4,
    value: 5.2,
    expected: 5.2,
  },
]
