import {doom, createDoomRng} from './random.ts'

test('doom rng', () => {
  const random = doom()
  expect(random()).not.toBe(random())
})

test('doom rng - seed', () => {
  const r1 = doom()
  const r2 = doom(23)

  // 2nd value in table, which is the first returned value
  expect(r1()).toBe(8)

  const s1: Array<number> = []
  const s2: Array<number> = []
  for (let i = 0; i < 10; i++) {
    s1.push(r1())
    s2.push(r2())
  }

  expect(s1).not.toEqual(s2)
})

test('doom - seed wrapping', () => {
  expect(() => {
    doom(500)
  }).not.toThrow()
  expect(() => {
    doom(-2)
  }).not.toThrow()

  const r1 = doom(257)
  expect(r1()).toBe(109)
  const r2 = doom(-2)
  expect(r2()).toBe(249)
})

test('doom - float seeds', () => {
  const r1 = doom(1.4)
  expect(r1()).toBe(109)
})

test('createDoomRng', () => {
  const random = createDoomRng()
  expect(random()).not.toBe(random())
})

test('createDoomRng - seed', () => {
  const random = createDoomRng(3)
  expect(random()).not.toBe(220)
  expect(random()).not.toBe(222)
})

test('createDoomRng - custom table', () => {
  const random = createDoomRng(0, {
    table: [0, 1, 2, 3],
    range: [0, 3],
  })
  expect(random()).not.toBe(random())
  expect(random()).toBe(3)
  expect(random()).toBe(0)
})

test('createDoomRng - range offset - pow2 fast mode', () => {
  const random = createDoomRng(2, {
    table: [0, 1, 2, 3, 4, 5, 6, 7],
    range: [1, 4],
  })
  expect([random(), random(), random(), random(), random()]).toStrictEqual([
    3, 4, 1, 2, 3,
  ])
})

test('createDoomRng - range offset - non-pow2 slow mode', () => {
  const random = createDoomRng(0, {
    table: [0, 1, 2, 3, 4, 5, 6, 7],
    range: [0, 5],
  })
  expect(Array.from({length: 7}).map(() => random())).toStrictEqual([
    1, 2, 3, 4, 5, 0, 1,
  ])
})

test('createDoomRng - offsets and ranges', () => {
  const tests: Array<{
    fixture: {seed: number; range: [number, number]; iterations: number}
    expected: Array<number>
  }> = [
    // Non pow2
    {
      fixture: {
        seed: 0,
        range: [0, 2],
        iterations: 5,
      },
      expected: [1, 2, 0, 1, 2],
    },
    // Non pow2 with offset
    {
      fixture: {
        seed: 2,
        range: [0, 2],
        iterations: 5,
      },
      expected: [0, 1, 2, 0, 1],
    },
    {
      fixture: {
        seed: 1,
        range: [0, 6],
        iterations: 10,
      },
      expected: [2, 3, 4, 5, 6, 0, 1, 2, 3, 4],
    },
    // pow2
    {
      fixture: {
        seed: 0,
        range: [0, 3],
        iterations: 5,
      },
      expected: [1, 2, 3, 0, 1],
    },
    // pow2 - offset
    {
      fixture: {
        seed: 2,
        range: [0, 3],
        iterations: 5,
      },
      expected: [3, 0, 1, 2, 3],
    },
  ]

  const sequentialTable = Array.from({length: 255}).map((_, i) => i)

  for (const {fixture, expected} of tests) {
    const rng = createDoomRng(fixture.seed, {
      table: sequentialTable,
      range: fixture.range,
    })
    expect(
      Array.from({length: fixture.iterations}).map(() => rng()),
    ).toStrictEqual(expected)
  }
})

test('createDoomRng with typed array table', () => {
  const buffer = new ArrayBuffer(0xff)
  const view = new Uint8Array(buffer)
  view[0] = 0
  view[1] = 2
  view[2] = 4
  view[3] = 6
  const rng = createDoomRng(0, {
    table: view,
  })
  expect(rng()).toBe(2)
  expect(rng()).toBe(4)
})

test('createDoomRng range check', () => {
  expect(() => {
    createDoomRng(0, {
      table: [0, 1, 2, 3],
      range: [0, 12],
    })
  }).toThrow()
  expect(() => {
    createDoomRng(0, {
      table: [0, 1, 2, 3],
      range: [18, 37],
    })
  }).toThrow()
  expect(() => {
    createDoomRng(0, {
      table: [0, 1, 2, 3],
      range: [2, 0],
    })
  }).toThrow()
})
