import {min} from './min'

test('Min finds the minimum number in a set or array', () => {
  for (let {set, expected} of tests) {
    expect(min(set)).toEqual(expected)
    expect(min(new Set(set))).toEqual(expected)
  }
})

const tests = [
  {
    set: [-20, 0, 10, 30, 300],
    expected: -20,
  },
  {
    set: [-0.25, 0.6, 1.4, 15.6, 100.02],
    expected: -0.25,
  },
  {
    set: [-10, -5.6, 0, 0.2],
    expected: -10,
  },
  {
    set: [23, 0, 12, 6, 7.4],
    expected: 0,
  },
]
