
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
