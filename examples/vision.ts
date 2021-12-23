import {Point} from '../esm/point'
import {Vector2} from '../esm/vector2'
import {Ray} from '../esm/ray'
import {toRadians} from '../esm/toRadians'

/**
 * This is a fairly terrible raycasting algorithm for calculating field of view
 * in a square tilemap, but does demonstrate how a couple of utils work.
 */

document.body.style.height = '100vh'
document.body.style.background = '#232429'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const dpr = window.devicePixelRatio
const canvasWidth = 1088
const canvasHeight = 816
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'
ctx.scale(dpr, dpr)

const PI2 = Math.PI * 2
const borderColour = '#32344033'
const blockColour = '#FD0E35'
const floorColour = '#FDD7E4'
const rayColour = '#FC74FD22'
const raySpeed = 10

function drawCircle(colour: string, x: number, y: number, r = 4) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, PI2, false)
  ctx.fillStyle = colour
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = borderColour
  ctx.stroke()
}

function drawRect(colour: string, x: number, y: number, size = 10) {
  ctx.beginPath()
  ctx.rect(x, y, size, size)
  ctx.fillStyle = colour
  ctx.fill()
  ctx.lineWidth = 1
  ctx.strokeStyle = borderColour
  ctx.stroke()
}

type Tile = {
  isBlocker: boolean
  isVisible: boolean
}
type TileMapData = Tile[][]

function generateTileMap(w: number, h: number): TileMapData {
  const data = []
  for (let y = 0; y < h; y++) {
    const row: Tile[] = []
    for (let x = 0; x < w; x++) {
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
        row.push({isBlocker: true, isVisible: false})
        continue
      }

      const isBlocker = Math.random() > 0.75
      row.push({
        isBlocker: isBlocker,
        isVisible: false,
      })
    }
    data.push(row)
  }

  return data
}

class TileMap {
  data: TileMapData
  width: number
  height: number
  cellSize: number

  constructor(w: number, h: number, cellSize: number) {
    this.width = w
    this.height = h
    this.cellSize = cellSize
    this.data = generateTileMap(w, h)
  }

  get(x: number, y: number) {
    return this.data[y][x]
  }

  set(x: number, y: number, tile: Tile) {
    this.data[y][x] = tile
  }

  toWorldCoords(x: number, y: number): Point {
    const xx = Math.floor(x / this.cellSize)
    const yy = Math.floor(y / this.cellSize)
    return Point.of(xx, yy)
  }

  iterate(cb: (tile: Tile, x: number, y: number) => void) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.get(x, y)
        cb(tile, x, y)
      }
    }
  }
}

const worldWidth = 40
const worldHeight = 40
const cellSize = 16
const world: TileMap = new TileMap(worldWidth, worldHeight, cellSize)

let rayPoints: Set<Point> = new Set()
function onRaycast(origin: Point) {
  rayPoints = new Set()

  const onCast = (gen) => {
    const p = gen.next()
    if (!p.done) {
      const point = Point.of(p.value.pos[0], p.value.pos[1])
      const worldPoint = world.toWorldCoords(point.x, point.y)
      const tile = world.get(worldPoint.x, worldPoint.y)

      world.set(worldPoint.x, worldPoint.y, {
        ...tile,
        isVisible: true,
      })

      if (tile.isBlocker) {
        return
      }

      rayPoints.add(point)
      render()

      setTimeout(() => {
        onCast(gen)
      }, raySpeed)
    }
  }

  for (let i = 0; i < 360; i = i + 6) {
    const ray = Ray.of(Vector2.fromAngle(toRadians(i)))
    const cast = ray.cast({
      origin: origin.pos,
      magnitude: 180,
      step: world.cellSize * 0.5,
      initial: true,
    })

    onCast(cast())
  }
}

canvas.addEventListener('click', (event) => {
  const origin = Point.of(event.offsetX, event.offsetY)
  onRaycast(origin)
})

function renderTileMap(map: TileMap) {
  map.iterate((tile, x, y) => {
    const colour = tile.isBlocker ? blockColour : floorColour
    const alpha = tile.isVisible ? 'FF' : '22'
    drawRect(colour + alpha, x * map.cellSize, y * map.cellSize, map.cellSize)
  })
}

function renderRaypoints(set: Set<Point>, world: TileMap) {
  for (let p of set) {
    drawCircle(rayColour, p.x, p.y, 4)
  }
}

function render() {
  ctx.clearRect(0, 0, canvasWidth, canvasWidth)
  renderTileMap(world)
  renderRaypoints(rayPoints, world)
}

render()
