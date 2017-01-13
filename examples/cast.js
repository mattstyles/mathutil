
var {Ray, Vector2} = require('../lib')

var r = new Ray(new Vector2(1, 0))
var origin = [2, 0]
var magnitude = 10
var step = 1
var initial = false

// Create the cast generator
var cast = r.cast({
  origin, magnitude, step, initial
})

// Iterate over the generator, logging positions
for (let p of cast()) {
  console.log('  **  ', p)
}
