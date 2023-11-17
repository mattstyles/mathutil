/*eslint-env node*/

import {Bench} from 'tinybench'
import {toRadians} from '../dist/index.js'

const bench = new Bench({time: 100})

function sink() {}

const table = Array.from({length: 360}).map((_, i) => {
  return toRadians(i)
})
function lookup(deg) {
  return table[deg & 360]
}

bench
  .add('toRadians function', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(toRadians((Math.random() * 720) | 0))
    }
  })
  .add('Precalc table', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(lookup((Math.random() * 720) | 0))
    }
  })

await bench.run()

console.table(bench.table())
