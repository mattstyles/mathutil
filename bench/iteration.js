/*eslint-env node*/

import {Point} from '../dist/point.js'
import {Bench} from 'tinybench'

const bench = new Bench({iterations: 1000})
const size = 1e6

const pointArray = Array.from({length: size}).map(() => new Point(0, 0))
const arrayArray = Array.from({length: size}).map(() => [0, 0])
const objectArray = Array.from({length: size}).map(() => ({x: 0, y: 0}))
bench
  .add('Iteration - Point', () => {
    for (let idx = 0; idx < pointArray.length; idx++) {
      const point = pointArray[idx]
      point.x = point.x >= 255 ? 0 : 0
    }
  })
  .add('Iteration - Array', () => {
    for (let idx = 0; idx < arrayArray.length; idx++) {
      const point = arrayArray[idx]
      point[0] = point[0] >= 255 ? 0 : 0
    }
  })
  .add('Iteration - Object', () => {
    for (let idx = 0; idx < objectArray.length; idx++) {
      const point = objectArray[idx]
      point.x = point.x >= 255 ? 0 : 0
    }
  })

console.log('\nRunning benchmarks.')

await bench.run()

console.table(bench.table())
