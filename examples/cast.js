
var { Ray, Vector2 } = require('../lib/mathutil.mjs')

const PI2 = Math.PI * 2
const CANVAS_SIZE = 600
const canvas = document.querySelector('canvas')
canvas.width = CANVAS_SIZE * window.devicePixelRatio
canvas.height = CANVAS_SIZE * window.devicePixelRatio
canvas.style.width = CANVAS_SIZE + 'px'
canvas.style.height = CANVAS_SIZE + 'px'

const ctx = canvas.getContext('2d')
ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

const drawCircle = (colour, x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, 4, 0, PI2, false)
  ctx.fillStyle = colour
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = '#323440'
  ctx.stroke()
}

// var r = new Ray(new Vector2(0, 1))
const r1 = new Ray(Vector2.fromAngle(Math.PI * 2))
const origin = [50, 50]
const magnitude = 100
const step = 10
const initial = true

const r2 = Ray.of(Vector2.fromAngle(Math.PI * 2.2))
const r3 = Ray.of(Vector2.fromAngle(Math.PI * 0.23))

// Create the cast generator
var cast = r1.cast({
  origin, magnitude, step, initial
})
var gen = r2.cast({
  origin, magnitude, step, initial
})()
var yeo = r3.cast({
  origin, magnitude, step, initial
})()
window.yeo = yeo

// Iterate over the generator, logging positions
for (const p of cast()) {
  console.log(' * ', p)
  drawCircle('red', p[0], p[1])
}

let p = gen.next()
while (!p.done) {
  console.log(' >> ', p.value)
  drawCircle('rebeccapurple', p.value[0], p.value[1])
  if (p.value[0] === 4) {
    console.log('done')
    break
  }
  p = gen.next()
}

const onYeo = gen => {
  const p = gen.next()
  if (!p.done) {
    console.log(' ~~~ ', p.value)
    drawCircle('yellow', p.value[0], p.value[1])
    setTimeout(() => onYeo(gen), 500)
  }
}
onYeo(yeo)
