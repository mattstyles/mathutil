/*eslint-env node*/

import {Bench} from 'tinybench'
import {Point} from '../dist/index.js'

const bench = new Bench({time: 100})

function sink() {}

function instanceCheck(x) {
  if (x instanceof Point) {
    return x.pos
  }

  if (typeof x === 'number') {
    return [x, x]
  }

  // {x, y}
  if ('x' in x && 'y' in x) {
    return [x.x, x.y]
  }

  return x
}

// Duck typing
function propertyCheck(x) {
  // x.pos
  if (x.pos != null) {
    return x.pos
  }

  if (typeof x === 'number') {
    return [x, x]
  }

  // {x.y}
  if (x.x != null && x.y != null) {
    return [x.x, x.y]
  }

  return x
}

function positionEqual(a, b) {
  if (a[0] === b[0] && a[1] === b[1]) {
    return true
  }

  throw new Error('Error converting to position tuple')
}

bench
  .add('instanceof', () => {
    const output = [20, 20]
    sink(positionEqual(instanceCheck(Point.of(20, 20)), output))
    // sink(positionEqual(instanceCheck({pos: [20, 20]}), output))
    sink(positionEqual(instanceCheck([20, 20]), output))
    sink(positionEqual(instanceCheck({x: 20, y: 20}), output))
    sink(positionEqual(instanceCheck(20), output))
  })
  .add('duck typing', () => {
    const output = [20, 20]
    sink(positionEqual(propertyCheck(Point.of(20, 20)), output))
    // sink(positionEqual(propertyCheck({pos: [20, 20]}), output))
    sink(positionEqual(propertyCheck([20, 20]), output))
    sink(positionEqual(propertyCheck({x: 20, y: 20}), output))
    sink(positionEqual(propertyCheck(20), output))
  })

await bench.run()

console.table(bench.table())
