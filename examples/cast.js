
var {Ray, Vector2} = require('../lib')

// var r = new Ray(new Vector2(0, 1))
var r = new Ray(Vector2.fromAngle(Math.PI))
var origin = [2, 0]
var magnitude = 10
var step = 1
var initial = true

// Create the cast generator
var cast = r.cast({
  origin, magnitude, step, initial
})
var gen = r.cast({
  origin, magnitude, step, initial
})()

// Iterate over the generator, logging positions
for (let p of cast()) {
  console.log('  **  ', p)
}

let p = gen.next()
while (!p.done) {
  console.log('  ~~  ', p.value)
  if (p.value[0] === 4) {
    console.log('done')
    break
  }
  p = gen.next()
}
