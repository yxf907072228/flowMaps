//import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'
import pathTool from 'zrender/lib/tool/path'


export default function render(start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, option={}, that){
   
    var group ,line;
    var config = that.arrayMap[option.arrowType]

   // var {color='#666',way=1} = config
    if(option.type=="group"&&option.arrowType){
        group = option
        line = group.childAt(0)
        line.dirty(true)
       
    }else{
       
        group = that.addGroup(Object.assign({
            
        }, option))
        that.data(group, {
            type: 'arrow',
            arrowType: option.arrowType || 'normal'
        })

        //bessel
        line =  pathTool.createFromString("")
        
        line.style.fill = 'transparent'
        line.style.stroke = 'rgba(1,242,200)'
        line.style.lineWidth = 5
        line.style.lineDash = [8, 8]
        line.animate('style', true)
        .when(1000,{
            lineDashOffset: 16
        }) 
        .start();
        //let arrowPath = that.getArrowPath(start, end, 6)
        group.add(line)
        that.arrows[group.id] = group
        that.rootGroup.add(group)
    }


  /*   let len=50 
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
 */ 
    let t1=10,t2=2,vx=1,vy=1;
    if(start.x>end.x){
        vx=-1
    }
    if(start.y>end.y){
        vy=-1
    }
    let path = pathTool.createFromString(`
    M${start.x} ${start.y} L${start.x} ${end.y-8*vy} S${start.x-2*vx} ${end.y-2*vy} ${start.x+8*vx} ${end.y} L${end.x} ${end.y}
    `)
    
    line['buildPath'] = path['buildPath']
    
    return group
}