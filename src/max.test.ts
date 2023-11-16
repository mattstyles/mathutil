import {max} from './max'

test('Min finds the minimum number in a set or array', () => {
  for (const {set, expected} of tests) {
    expect(max(set)).toEqual(expected)
    expect(max(new Set(set))).toEqual(expected)
  }
})

const tests = [
  {
    set: [-20, 0, 10, 30, 300],
    expected: 300,
  },
  {
    set: [-0.25, 0.6, 1.4, 15.6, 100.02],
    expected: 100.02,
  },
  {
    set: [-10, -5.6, 0, 0.2],
    expected: 0.2,
  },
  {
    set: [-10, -5.6, 0],
    expected: 0,
  },
]
