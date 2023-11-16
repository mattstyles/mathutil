/*eslint-env node*/

import crypto from 'node:crypto'
import {Bench} from 'tinybench'

const bench = new Bench({time: 100})

function sink() {}

let idx = 0
let table = [255, 167, 77, 74, 134, 23, 200, 211, 25]
function getRnd() {
  idx = idx >= table.length ? 0 : idx + 1
  return table[idx]
}

bench
  .add('Math.random', () => {
    sink(Math.random())
  })
  .add('rng table', () => {
    sink(getRnd())
  })
  .add('crypto :: from uuid', () => {
    sink(parseInt(crypto.randomUUID().slice(-2), 16))
  })

await bench.run()

console.log(bench.table())
