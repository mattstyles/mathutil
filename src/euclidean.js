
export default function euclidean( p0, p1 ) {
    return Math.sqrt( Math.pow( p0.x - p1.x, 2 ) + Math.pow( p0.y - p1.y, 2 ) )
}
