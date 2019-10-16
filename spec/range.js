
import tape from 'tape'

import { clamp, wrap } from '../src'

tape('clamp', t => {
  t.plan(8)

  t.equal(clamp(3, 1, 5), 3, 'Integers in range')
  t.equal(clamp(0, 1, 5), 1, 'Integers min')
  t.equal(clamp(10, 1, 5), 5, 'Integers max')

  t.equal(clamp(-2, 0, 5), 0, 'Zero value min bounds ok')
  t.equal(clamp(10, -2, 0), 0, 'Zero value max bounds ok')

  t.equal(clamp(3.4, 1, 5.75), 3.4, 'Float in range')
  t.equal(clamp(0.12, 1.44, 5), 1.44, 'Float min')
  t.equal(clamp(10, 1.23, 5.33), 5.33, 'Float max')
})

tape('wrap', t => {
  t.plan(8)

  t.equal(wrap(2, 0, 5), 2, 'Integer in range')
  t.equal(wrap(8, 0, 5), 3, 'Integer over')
  t.equal(wrap(-1, 0, 5), 4, 'Integer under')

  t.equal(wrap(2.4, 1, 5), 2.4, 'Float in range')
  t.equal(wrap(10.2, 8, 10), 8.2, 'Float over')
  t.equal(wrap(-1, 0.5, 5), 3.5, 'Float under')

  t.equal(wrap(22, 0, 10), 2, 'Multiples over')
  t.equal(wrap(5, 10, 12), 11, 'Multiples under')
})
