
import test from 'tape'

import { euclidean } from '../src/euclidean'
import { manhattan } from '../src/manhattan'

test('Euclidean distance', assert => {
  assert.plan(2)

  assert.equal(euclidean([0, 1], [0, 3]), 2, 'Distance is calculated correctly')
  assert.equal(euclidean([1, 1], [4, 5]), 5, 'Distance is calculated correctly')
})

test('Manhattan distance', assert => {
  assert.plan(2)

  assert.equal(manhattan([0, 0], [1, 1]), 2, 'Distance is calculated correctly')
  assert.equal(manhattan([1, 1], [4, 5]), 7, 'Distance is calculated correctly')
})
