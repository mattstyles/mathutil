/*eslint-env node*/

import crypto from 'node:crypto'
import {Bench} from 'tinybench'
import {doom, createDoomRng} from '../dist/random.js'
import {random, table} from '../dist/icanhaznumber.js'

const bench = new Bench({time: 100})

function sink() {}

let idx = 0
let some_table = [255, 167, 77, 74, 134, 23, 200, 211, 25]
function getRnd() {
  // This is maintained because it shows that bit shifting for wrapping (@see doom function) is faster
  idx = idx >= some_table.length ? 0 : idx + 1
  return some_table[idx]
}
const rnd = doom()
const rnd2 = createDoomRng(0, {
  table: table,
  range: [0, 255],
})

bench
  .add('Math.random', () => {
    sink(Math.random())
  })
  .add('rng table', () => {
    sink(getRnd())
  })
  /**
   * Unsurprisingly this is slow with the string generation, slicing, and then parsing. You _can_ fill a table for the doom lookup algo with the crypto module though...
   */
  .add('crypto :: from uuid', () => {
    sink(parseInt(crypto.randomUUID().slice(-2), 16))
  })
  .add('doom rnd table', () => {
    sink(rnd())
  })
  .add('createDoom rng', () => {
    sink(rnd2())
  })
  .add('icanhaznumber', () => {
    sink(random())
  })

await bench.run()

console.table(bench.table())
