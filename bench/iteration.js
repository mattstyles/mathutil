/*eslint-env node*/

import {Point} from '../dist/point.js'
import {Bench} from 'tinybench'

const bench = new Bench({time: 1000})
const size = Point.of(1000, 1000)

function sink() {}

const pointArray = Array.from({length: size.x * size.y}).map(
  () => new Point(0, 0),
)
const arrayArray = Array.from({length: size.x * size.y}).map(() => [0, 0])
const objectArray = Array.from({length: size.x * size.y}).map(() => ({
  x: 0,
  y: 0,
}))
const arrayArray2 = Array.from({length: size.x * size.y}).map(() => [0, 0])
const typedArray = new Uint8ClampedArray(size.x * size.y * 2)

bench
  .add('Iteration - Class', () => {
    for (let idx = 0; idx < pointArray.length; idx++) {
      const point = pointArray[idx]
      point.x = point.x >= 255 ? 0 : point.x + 1
    }
  })
  .add('Iteration - Array', () => {
    for (let idx = 0; idx < arrayArray.length; idx++) {
      const point = arrayArray[idx]
      // point[0] = point[0] >= 255 ? 0 : point[0] + 1
      sink(point)
    }
  })
  .add('Iteration - Object', () => {
    for (let idx = 0; idx < objectArray.length; idx++) {
      const point = objectArray[idx]
      point.x = point.x >= 255 ? 0 : point.x + 1
    }
  })
  // 2 bit typed array holding x and y sequentially i.e. [x, y, x1, y1, x2, y2...]
  // Big advantage here, for this use case, is the automatic bit clamping of a Uint8Array which negates the need to test for wrapping
  .add('Iteration - Typed Array', () => {
    for (let idx = 0; idx < typedArray.length; idx = idx + 2) {
      typedArray[idx] = typedArray[idx] + 1
    }
  })
  .add('Iteration - 2d', () => {
    for (let y = 0; y < size.y; y++) {
      for (let x = 0; x < size.x; x++) {
        const point = arrayArray2[y * size.x + x]
        // point[0] = point[0] >= 255 ? 0 : point[0] + 1
        sink(point)
      }
    }
  })

console.log('\nRunning benchmarks.')

await bench.run()

console.table(bench.table())
