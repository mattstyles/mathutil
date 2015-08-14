
export default function max( map ) {
    let val = 0
    for ( var i = 0; i < map.length; i++ ) {
        val = map[ i ] > val
            ? map[ i ]
            : val
    }
    return val
}
