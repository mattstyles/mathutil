import {table as t} from './icanhaznumber.ts'

/**
 * RNG like its 1993
 *
 * @param seed - 0...255 default range or the Cyberdemon will be summoned 😈
 * @param opts.table - the lookup table
 * @param opts.range - indices describing the window where numbers are returned
 * @returns 0...255 by default, can be configured using options
 */
export function createDoomRng(
  seed: number = 0,
  opts?: Partial<{
    table: Array<number> | Uint8Array
    range: [number, number]
  }>,
): () => number {
  opts = {
    ...{
      table: t,
      range: [0, 0xff],
    },
    ...opts,
  }
  if (opts.range[0] > opts.table.length || opts.range[1] > opts.table.length) {
    throw new Error(
      'Range must not exceed table bounds or the Cyberdemon will be summoned 😈',
    )
  }
  if (seed > opts.range[1] || seed < opts.range[0]) {
    throw new Error(
      `Seed must be ${opts.range[0]}...${opts.range[1]} or the Cyberdemon will be summoned 😈`,
    )
  }

  const table = [...opts.table]
  const size = opts.range[1] - opts.range[0]
  let index = (seed - opts.range[0]) & 0xff
  const inc =
    ((size + 1) & size) === 0
      ? () => (index + 1) & size
      : () => (index + 1) % (size + 1)

  return function random(): number {
    index = inc()
    return table[opts.range[0] + index]
  }
}

/**
 * RNG like its 1993
 *
 * @param seed - 0...255 range or the Cyberdemon will be summoned 😈
 * @returns 0...255
 */
export function doom(seed: number = 0): () => number {
  const table = [...t]
  let index = seed & 0xff
  return function random(): number {
    index = (index + 1) & 0xff
    return table[index]
  }
}
