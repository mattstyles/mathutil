/*eslint-env node*/

import {Bench} from 'tinybench'
import {manhattan, euclidean, Point} from '../dist/index.js'

const bench = new Bench({time: 100})

function sink() {}

bench
  .add('Euclidean', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(euclidean([0, 0], [15, 15]))
    }
  })
  .add('Manhattan', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(manhattan([0, 0], [15, 15]))
    }
  })
  .add('Manhattan with point allocation', () => {
    for (let i = 0; i < 1e5; i++) {
      sink(manhattan(new Point(0, 0), new Point(15, 15)))
    }
  })
  .add('Manhattan raw', () => {
    for (let i = 0; i < 1e5; i++) {
      const x = [0, 0]
      const y = [15, 15]
      sink(Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]))
    }
  })

await bench.run()

console.table(bench.table())
