
import tape from 'tape'
import { lerp } from '../src'

tape('lerp interpolates between positive values', t => {
  t.plan(5)

  t.equals(lerp(0, 10, 0.5), 5, 'positive values from 0')
  t.equals(lerp(2, 10, 0.5), 6, 'positive values from >0')
  t.equals(lerp(0, 10, 1.5), 15, 'can project beyond max')
  t.equals(lerp(0, 10, -0.5), -5, 'can project beyond min')
  t.equals(lerp(10, 20, 0.8), 18, 'positive value')
})

tape('lerp interpolates between negative values', t => {
  t.plan(5)

  t.equals(lerp(-10, 0, 0.5), -5, 'negative to 0')
  t.equals(lerp(-20, -10, 0.5), -15, 'negative non-0')
  t.equals(lerp(-20, -10, 1.5), -5, 'can project beyond max')
  t.equals(lerp(-30, -35, -0.5), -27.5, 'can project beyond min')
  t.equals(lerp(-5, -15, 0.25), -7.5, 'positive value')
})

tape('lerp can be curried', t => {
  t.plan(2)

  const lerpRange = lerp(0, 20)

  t.equals(lerpRange(0.25), 5, 'lerp can be curried')
  t.equals(lerp(1, 5, 0), 1, '0 is correctly interpreted as valid')
})
