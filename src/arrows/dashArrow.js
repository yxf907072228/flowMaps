import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'


function getLevel(stream){
    if(stream==0){
        return 0
    }else if(stream<10){
        return 10
    }else if(stream<100){
        return 12
    }else if(stream<1000){
        return 14
    }else if(stream<10000){
        return 16
    }else if(stream<100000){
        return 18
    }else if(stream<1000000){
        return 20
    }else if(stream<10000000){
        return 22
    }else if(stream<100000000){
        return 24
    }else{
        return 26
    }
}

export default function render(start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, option={}, that){
   
    var group ,line;
    var config = that.arrayMap[option.arrowType]

    var {color='#666',way=1} = config
    if(option.type=="group"&&option.arrowType){
        group = option
        line = group.childAt(0)
        line.dirty(true)
       
    }else{
        let countLevel = 0
        if(option.id){
            let nodeId = option.id.split('_')[1]
            let stream = that.nodes[nodeId].stream || 0
            countLevel = getLevel(stream)
        }
        group = that.addGroup(Object.assign({
            
        }, option))
        that.data(group, {
            type: 'arrow',
            arrowType: option.arrowType || 'normal'
        })

        //bessel
        line = new BezierCurveShape({
            zlevel: 1,
            shape: {

            },
            style: {
                // text:123321,
                //textRotation:0.5
                shadowBlur:2,
                shadowColor: 'rgba(1,242,200)', 
                lineDash: [4, 4],
              //  [ARROW_INFO.color && 'stroke']: ARROW_INFO.color
              stroke:color,
              opacity:0.7
            }
        });
         line.animate('style', true)
        .when(1000-countLevel*40,{
            lineDashOffset: -8
        }) 
        .start();
        //let arrowPath = that.getArrowPath(start, end, 6)
        group.add(line)
        that.arrows[group.id] = group
        that.rootGroup.add(group)
    }
    let len=50 * way
    let xlen = end.x-start.x, ylen=end.y-start.y;
    let clen = Math.sqrt(xlen*xlen+ylen*ylen);
    line.shape = Object.assign(line.shape, {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        cpx1:start.x+xlen/2+len/clen*ylen,
        cpy1:start.y+ylen/2-len/clen*xlen,
    })

  
    return group
}