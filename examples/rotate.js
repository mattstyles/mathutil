
var mathutil = require( '../lib' )
var Vector2 = mathutil.Vector2

var canvas = document.querySelector( 'canvas' )
var ctx = canvas.getContext( '2d' )

var vec = new Vector2( 100, 100 )

ctx.strokeStyle = 'rgb( 100, 100, 255 )'

function drawLine( pt ) {
    ctx.beginPath()
    ctx.moveTo( 300, 300 )
    ctx.lineTo( 300 + pt.x, 300 + pt.y )
    ctx.stroke()
}

var rad = Math.PI / 180

for ( var a = 0; a < 360; a += 15 ) {
    drawLine( vec.rotate( a * rad ) )
}
