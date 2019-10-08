
import { Vector2 } from '../lib/mathutil.mjs'

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var vec = new Vector2(100, 100)

function color (value) {
  return 'rgb( ' + (0xff * value) + ', 0, 0 )'
}

function drawLine (pt) {
  ctx.beginPath()
  ctx.moveTo(300, 300)
  ctx.lineTo(300 + pt[0], 300 + pt[1])
  ctx.stroke()
}

var rad = Math.PI / 180
var step = 720

function drawRotation () {
  for (var a = 0; a < 360; a += ~~step) {
    ctx.strokeStyle = color(a / 360)
    drawLine(vec.rotate(a * rad).pos)
  }
}

function go () {
  ctx.clearRect(0, 0, 600, 600)

  step /= 2

  if (step < 1) {
    step = 360
  }

  drawRotation()

  setTimeout(function () {
    go()
  }, 100)
}

setTimeout(go, 100)
