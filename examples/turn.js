
import {Vector2, toRadians} from '../lib/index.mjs'

const CANVAS_SIZE = 600

const canvas = document.querySelector('canvas')

canvas.width = CANVAS_SIZE * window.devicePixelRatio
canvas.height = CANVAS_SIZE * window.devicePixelRatio
canvas.style.width = CANVAS_SIZE + 'px'
canvas.style.height = CANVAS_SIZE + 'px'

const ctx = canvas.getContext('2d')
ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

const PI2 = Math.PI * 2

class Entity {
  constructor (x, y) {
    this.pos = new Vector2(x, y)
    this.dir = new Vector2(0, 1)

    this.size = 4
    this.fov = 100
    this.visionDistance = 80
  }

  render () {
        // Calc vision segment
    let halfVisionAngle = toRadians(this.fov / 2)
    let leftVector = Vector2
      .fromAngle(this.dir.angle() - halfVisionAngle)
    let rightVector = Vector2
      .fromAngle(this.dir.angle() + halfVisionAngle)
    let facingVector = Vector2.multiply(this.dir, this.visionDistance)

        // Render vision segment
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.arc(this.pos.x, this.pos.y, this.visionDistance, leftVector.angle(), rightVector.angle(), false)
    ctx.fillStyle = 'rgba( 0, 0, 0, .15 )'
    ctx.fill()

        // Render facing vector
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.lineTo(...Vector2.add(this.pos, facingVector).position())
    ctx.stroke()

        // Render entity shape
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, PI2, false)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#404040'
    ctx.stroke()
  }

  forward () {
    this.pos.add(this.dir)
  }

  backward () {
    this.pos.sub(this.dir)
  }

  left () {
    this.dir.rotate(toRadians(-10))
  }

  right () {
    this.dir.rotate(toRadians(10))
  }

}

let pc = new Entity(100, 100)

function render () {
  ctx.clearRect(0, 0, 600, 600)
  pc.render()
}

// Add keys
document.addEventListener('keydown', event => {
    // quick and dirty
  switch (event.keyCode) {
        // left
    case 37:
      pc.left()
      break

        // up
    case 39:
      pc.right()
      break

        // up
    case 38:
      pc.forward()
      break

        // up
    case 40:
      pc.backward()
      break

    default:
      break
  }

  render()
})

render()
