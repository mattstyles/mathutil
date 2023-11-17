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

// @TODO this is still not correct, it works _here_, but not everywhere
test('createDoomRng - range offset', () => {
  const random = createDoomRng(2, {
    table: [0, 1, 2, 3, 4, 5, 6, 7],
    range: [1, 4],
  })
  expect([random(), random(), random(), random(), random()]).toStrictEqual([
    3, 4, 1, 2, 3,
  ])
})
