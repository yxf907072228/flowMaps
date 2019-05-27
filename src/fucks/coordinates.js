

export function getCPoint(start, end, curveness ){
    return  [
            ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * curveness,
            ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * curveness
    ];
}

export function getCurvePath(start, end, curveness, avalue=0.01 ) {
    var points = []
    var cp = getCPoint(start, end, curveness)
    
    for ( var t = 0; t <= 1; t += avalue) {

        var x = quadraticBezier( start[ 0 ], cp[ 0 ], end[ 0 ], t );
        var y = quadraticBezier( start[ 1 ], cp[ 1 ], end[ 1 ], t );
        
        points.push({x, y});
    }
    return points
}
    
    function quadraticBezier( p0, p1, p2, t ) {
        var k = 1 - t;
        return k * k * p0 + 2 * ( 1 - t ) * t * p1 + t * t * p2;    // 这个方程就是二次贝赛尔曲线方程
    }