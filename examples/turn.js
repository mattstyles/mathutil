
import { Vector2, toRadians } from '../lib'

const canvas = document.querySelector( 'canvas' )
const ctx = canvas.getContext( '2d' )

const PI2 = Math.PI * 2

class Entity {
    constructor( x, y ) {
        this.pos = new Vector2( x, y )
        this.dir = new Vector2( 0, 1 )

        this.size = 4
    }

    render() {
        // Render facing vector
        ctx.beginPath()
        ctx.moveTo( this.pos.x, this.pos.y )
        ctx.lineTo( ...this.pos.add( this.dir.unit().scalar( 10 ) ).position() )
        ctx.stroke()

        // Render entity shape
        ctx.beginPath()
        ctx.arc( this.pos.x, this.pos.y, this.size, 0, PI2, false )
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = '#404040'
        ctx.stroke()
    }

    forward() {
        this.pos = this.pos.add( this.dir.unit().scalar( 5 ) )
    }

    backward() {
        this.pos = this.pos.add( this.dir.unit().scalar( -5 ) )
    }

    left() {
        this.dir = this.dir.unit().rotate( toRadians( -10 ) )
    }

    right() {
        this.dir = this.dir.unit().rotate( toRadians( 10 ) )
    }

}

let pc = new Entity( 100, 100 )

function render() {
    ctx.clearRect( 0, 0, 600, 600 )
    pc.render()
}

// Add keys
document.addEventListener( 'keydown', event => {
    // quick and dirty
    switch( event.keyCode ) {
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
