/*eslint-env node*/

import {Bench} from 'tinybench'
import {Point, doom} from '../dist/index.js'

const bench = new Bench({time: 100})
const rng = doom()

function sink() {}

function P(x, y) {
  return [x, y]
}

function PCheck(x, y) {
  if (Array.isArray(x)) {
    return [x[0], x[1]]
  }
  if (y === undefined) {
    return [x, x]
  }
  return [x, y]
}

bench
  .add('create point .of', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(Point.of(rng(), rng()))
    }
  })
  .add('create point new', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(new Point(rng(), rng()))
    }
  })
  .add('position array', () => {
    for (let i = 0; i < 1e5; i++) {
      sink([rng(), rng()])
    }
  })
  .add('point object', () => {
    for (let i = 0; i < 1e5; i++) {
      sink({x: rng(), y: rng()})
    }
  })
  .add('point function constructor', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(P(rng(), rng()))
    }
  })
  .add('point function constructor with cast', () => {
    for (let i = 0; i < 1e5; i++) {
      // No way to check the copy for perf here as other comparisons involve an rng lookup
      sink(PCheck(rng(), rng()))
    }
  })

await bench.run()

console.table(bench.table())
