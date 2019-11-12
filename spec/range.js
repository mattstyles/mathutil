
import tape from 'tape'

import { clamp, wrap } from '../src'

tape('clamp', t => {
  t.plan(8)

  t.equal(clamp(1, 5, 3), 3, 'Integers in range')
  t.equal(clamp(1, 5, 0), 1, 'Integers min')
  t.equal(clamp(1, 5, 10), 5, 'Integers max')

  t.equal(clamp(0, 5, -2), 0, 'Zero value min bounds ok')
  t.equal(clamp(-2, 0, 10), 0, 'Zero value max bounds ok')

  t.equal(clamp(1, 5.75, 3.4), 3.4, 'Float in range')
  t.equal(clamp(1.44, 5, 0.12), 1.44, 'Float min')
  t.equal(clamp(1.23, 5.33, 10), 5.33, 'Float max')
})

tape('wrap', t => {
  t.plan(9)

  t.equal(wrap(0, 5, 2), 2, 'Integer in range')
  t.equal(wrap(0, 5, 8), 3, 'Integer over')
  t.equal(wrap(0, 5, -1), 4, 'Integer under')

  t.equal(wrap(1, 5, 2.4), 2.4, 'Float in range')
  t.equal(wrap(8, 10, 10.2), 8.2, 'Float over')
  t.equal(wrap(0.5, 5, -1), 3.5, 'Float under')

  t.equal(wrap(0, 10, 22), 2, 'Multiples over')
  t.equal(wrap(10, 12, 5), 11, 'Multiples under')

  t.equal(wrap(1, 5, 0), 4, '0 as a value is used, currying not attempted')
})

tape('wrap and clamp currying', t => {
  t.plan(4)

  const wrapRange = wrap(0, 10)
  t.equals(wrapRange(2), 2, 'wrap can be curried')
  t.equals(wrap(0, 10, 0), 0, '0 is correctly interpreted')

  const clampRange = clamp(0, 10)
  t.equals(clampRange(2), 2, 'wrap can be curried')
  t.equals(clamp(0, 10, 0), 0, '0 is correctly interpreted')
})
