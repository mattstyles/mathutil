import {lerp} from './lerp'

test('lerp interpolates between positive values', () => {
  for (const {min, max, value, expected} of tests) {
    expect(lerp(min, max, value)).toBeCloseTo(expected)

    // Curried form
    const fn = lerp(min, max)
    expect(fn(value)).toBeCloseTo(expected)
  }
})

const tests = [
  // Positive values
  {min: 0, max: 10, value: 0.5, expected: 5},
  {min: 2, max: 10, value: 0.5, expected: 6},
  {min: 0, max: 10, value: 1.5, expected: 15},
  {min: 0, max: 10, value: -0.5, expected: -5},
  {min: 10, max: 20, value: 0.8, expected: 18},
  // Negative values
  {min: -10, max: 0, value: 0.5, expected: -5},
  {min: -20, max: -10, value: 0.5, expected: -15},
  {min: -20, max: -10, value: 1.5, expected: -5},
  {min: -30, max: -35, value: -0.5, expected: -27.5},
  {min: -5, max: -15, value: 0.25, expected: -7.5},
  // Positive and negative
  {min: -10, max: 10, value: 0.6, expected: 2},
  {min: -10, max: 10, value: 0.4, expected: -2},
  // Floats
  {min: -1.5, max: 1.5, value: 0.5, expected: 0},
  {min: 0, max: 2.5, value: 0.8, expected: 2},
  {min: -1.5, max: -1, value: 0.5, expected: -1.25},
  // Bounds
  {min: -1, max: 1, value: 0, expected: -1},
  {min: -1, max: 3, value: 1, expected: 3},
]
