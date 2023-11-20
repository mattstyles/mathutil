/*eslint-env node*/

import {Point} from '../dist/point.js'
import {doom} from '../dist/random.cjs'
import {Bench} from 'tinybench'

const bench = new Bench({time: 1000})
const size = Point.of(1000, 1000)

// These are both deterministic so good for this sort of comparison, effectively a seeded rng
const random = doom()
const random2 = doom()

const data1 = Array.from({length: size.x * size.y}).map(() => [0, 0])
const data2 = Array.from({length: size.x * size.y}).map(() => [0, 0])

bench
  .add('Comparison - &&', () => {
    for (let idx = 0; idx < data1.length; idx++) {
      const point = data1[idx]
      if (point[0] === 0 && point[1] === 0) {
        data1[idx] = random()
        continue
      }
      data1[idx] = random()
    }
  })
  .add('Comparison - nested array', () => {
    for (let idx = 0; idx < data2.length; idx++) {
      const point = data2[idx]
      if (point[0] === 0) {
        if (point[1] === 0) {
          data2[idx] = random2()
          continue
        }
      }
      data2[idx] = random2()
    }
  })

console.log('\nRunning benchmarks.')

await bench.run()

console.table(bench.table())
