
import test from 'tape'

import { min } from '../src/min'
import { max } from '../src/max'

test('Min should find the minimum number from a set', assert => {
  assert.plan(3)

  const x = [-20, 0, 10, 30, 300]
  const y = [-0.25, 0.6, 1.4, 15.6, 100.02]
  const z = [-10, -5.6, 0, 0.2]

  assert.equal(min(x), -20, 'Min operates on integers')
  assert.equal(min(y), -0.25, 'Min operates on floats')
  assert.equal(min(z), -10, 'Min operates on mixed numbers')
})

test('Max should find the maximum number from a set', assert => {
  assert.plan(3)

  const x = [-20, 0, 10, 30, 300]
  const y = [-0.25, 0.6, 1.4, 15.6, 100.02]
  const z = [-10, -5.6, 0, 0.2]

  assert.equal(max(x), 300, 'Max operates on integers')
  assert.equal(max(y), 100.02, 'Max operates on floats')
  assert.equal(max(z), 0.2, 'Max operates on mixed numbers')
})
