// var {Vector2} = require('../esm/index.js')
// var {Vector2} = require('../esm/vector2.js')
import {Vector2} from '../esm/vector2'

const PI90 = Math.PI * 0.5

const CANVAS_SIZE = 1600
const canvas = document.querySelector('canvas')
canvas.width = CANVAS_SIZE * window.devicePixelRatio
canvas.height = CANVAS_SIZE * window.devicePixelRatio
canvas.style.width = CANVAS_SIZE + 'px'
canvas.style.height = CANVAS_SIZE + 'px'

const ctx = canvas.getContext('2d')
ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

// const drawCircle = (colour, x, y) => {
//   ctx.beginPath()
//   ctx.arc(x, y, 4, 0, PI2, false)
//   ctx.fillStyle = colour
//   ctx.fill()
//   ctx.lineWidth = 1
//   ctx.strokeStyle = '#323440'
//   ctx.stroke()
// }

class Dragon {
  constructor(x, y) {
    this.pos = new Vector2(x, y)
    this.dir = new Vector2(0, 1)
    this.speed = 1.5
  }

  traceForward() {
    const forward = Vector2.multiply(this.dir, this.speed)
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.lineTo(...this.pos.add(forward).pos)
    ctx.stroke()
  }

  rotate(value) {
    this.dir.rotate(PI90 * value)
  }

  traceRotate(value) {
    this.rotate(value)
    this.traceForward()
  }
}

const elderDragon = new Dragon(600, 300)
// const rootHalf = Math.pow(0.5, 0.5)
//
// const dragonCurve = (order, length, sign, dragon) => {
//   dragon = dragon || elderDragon
//   if (order === 0) {
//     dragon.traceForward()
//     return
//   }
//
//   dragonCurve(order - 1, length * rootHalf, 1, dragon)
//   dragon.rotate(sign)
//   dragonCurve(order - 1, length * rootHalf, -1, dragon)
// }
// // dragonCurve(14, 0, 1)
//
// const maxOrder = 10
// const drawDragonCurve = order => {
//   if (order >= maxOrder) {
//     return
//   }
//   dragonCurve(order, 10, 1, new Dragon(400, 200))
//
//   setTimeout(() => drawDragonCurve(++order), 200)
// }
// drawDragonCurve(1)

const isOdd = (value) => {
  const h = value * 0.5
  return h !== ((value * 0.5) | 0)
}

const findPower = (value) => {
  let i = -1
  while (++i < 20) {
    const test = value / Math.pow(2, i)
    if (isOdd(test)) {
      return test
    }
  }

  const err = `Unable to find power for ${value}`
  throw new Error(err)
}

const findTurn = (i) => {
  const out = findPower(i) % 4
  if (out !== 1 && out !== 3) {
    const err = `Turn not recognised: ${out}`
    throw new Error(err)
  }

  return out === 1 ? 1 : -1
}

const maxIterations = 400000
const speed = 10
const next = (i, step) => {
  let ii = 0
  while (ii++ < step) {
    elderDragon.traceRotate(findTurn(i + ii))
  }

  if (i < maxIterations) {
    i += step
    setTimeout(() => next(i, ++step), speed)
  }
}
next(1, 2)
