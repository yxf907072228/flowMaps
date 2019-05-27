import Group from 'zrender/lib/container/Group'
import PathShape from 'zrender/lib/graphic/Path'
import pathTool from 'zrender/lib/tool/path'
import LinearGradient from  'zrender/lib/graphic/LinearGradient'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'
import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'
import CircleShape from 'zrender/lib/graphic/shape/Circle'
import { getCurvePath,getCPoint } from './coordinates'
import { Animator } from './animator'
import { debug, _extend } from 'util';



function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    var x = Math.abs(px-mx);
    var y = Math.abs(py-my);
    var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    var cos = y/z;
    var radina = Math.acos(cos);//用反三角函数求弧度
    var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度

    if(mx>px&&my>py){//鼠标在第四象限
        angle = 180 - angle;
    }

    if(mx==px&&my>py){//鼠标在y轴负方向上
        angle = 180;
    }

    if(mx>px&&my==py){//鼠标在x轴正方向上
        angle = 90;
    }

    if(mx<px&&my>py){//鼠标在第三象限
        angle = 180+angle;
    }

    if(mx<px&&my==py){//鼠标在x轴负方向
        angle = 270;
    }

    if(mx<px&&my<py){//鼠标在第二象限
        angle = 360 - angle;
    }



        return angle;
}



export default function fuck(tapu,start,end,option={}, callback){
    console.log(tapu)
    let points =getCurvePath([start.x,start.y],[end.x,end.y],0.4,0.02);
    let fcolor = option.color || 'rgb(228, 89, 33)';
    let group = new Group()
    let maxlen = 20
    let {x:sx,y:sy} = points[0]
    
   /*  var colorList = [
        
        {
            offset: 0,
            color: 'rgba(228, 89, 33, 1)'
        },
        {
            offset: 1,
            color: 'rgba(228, 89, 33, 1)'
        }
    ]
    let fcolor = new RadialGradient(0.5,0.5,0.5,colorList)  */
   /*  let test1 = new  CircleShape({
        shape:{
            //  cx:points[50].x,
            //  cy:points[50].y,
            cx: 200,
            cy: 200,
            r:50,
           
        },
        style:{
            fill:fcolor,
            blend:'lighter'
        },
        
        zlevel:1
    })

    tapu.rootGroup.add(test1) */


    for(let i = 0;i < maxlen; i++){
        let line =  new CircleShape({
            shape:{
                //  cx:points[50].x,
                //  cy:points[50].y,
                cx: sx-i*2,
                cy: sy,
                r:5-5/maxlen*i,
               
            },
            style:{
                fill:fcolor,
                opacity:0.5-0.4/maxlen*i-0.1*Math.random(),
                blend:'lighter',
                shadowColor:'rgba(255,255,255,0.6)',
                shadowBlur:5
            },
            
            zlevel:1
        })
        group.add(line)
    }
    tapu.rootGroup.add(group)

    let childs = group.children()
    let animator = new Animator()
    let count = points.length
    
    for(let j =0;j<count+4;j++){
        animator.when(30*j,(index,p)=>{
            
            let lx=1,ly=1;
            let p1 = points[index], p2 = points[index+1]
            if(p2){
                
                let angle = getAngle(p1.x,p1.y,p2.x,p2.y)*Math.PI/180
               /*  if(points[index+1].x<points[index].x){
                    lx=-1
                }

                if(points[index+1].y<points[index].y){
                    ly=-1
                } */

                childs.map((c, i)=>{
                    Object.assign(c.shape, {
                        cx: p1.x+(p2.x-p1.x)*p-i*4*lx*Math.sin(angle)+8*Math.random(),
                        cy: p1.y+(p2.y-p1.y)*p+i*4*ly*Math.cos(angle)+8*Math.random(),
                        r:7-7/maxlen*i
                    })
                    c.style.opacity = 0.5-0.4/maxlen*i-0.1*Math.random(),
                    c.dirty()
                })
            }else{
                p1 = points[points.length-2], p2 = points[points.length-1]
                let angle = getAngle(p1.x,p1.y,p2.x,p2.y)*Math.PI/180
                childs.map((c, i)=>{
                    if(c.style.opacity>0){
                        Object.assign(c.shape, {
                            cx: p1.x+(p2.x-p1.x)*p-i*3*lx*Math.sin(angle)+(6*Math.random()),
                            cy: p1.y+(p2.y-p1.y)*p+i*3*ly*Math.cos(angle)+(6*Math.random()),
                            r:7-7/maxlen*i
                        })
                        c.style.opacity = 0.5-0.5/maxlen*i,
                        c.dirty()
                    }
                   
                })
                let i = childs.length-(j-count)*6-7
                if(points[i]){
                    
                    for(let t=0;t<5;t++){
                        let c = childs[i-t]
                        if(c){
                        c.style.opacity = 0
                        c.dirty()
                        }
                    }
                }
            }
            /* if(points[index+1]){
                group.rotation = -getAngle(points[index].x,points[index].y,points[index+1].x,points[index+1].y)*Math.PI/180
                group.dirty()
            } */
        })
    }
    animator.start().done(()=>{
        tapu.rootGroup.remove(group)
        callback&&callback()
    })
    /* points.map((p,i)=>{
       
       if(points[i+1]){
            let line =  createLineItem({color:fcolor})
            line.position = [p.x, p.y]
        // line.rotation = -getAngle(p.x,p.y,points[i+1].x,points[i+1].y)*Math.PI/180
        //  console.log(getAngle(p.x,p.y,points[i+1].x,points[i+1].y))
            group.add(line)
       }
       
    }) 

  

    
    let childs = group.children()
    let animator = new Animator()
    let count = childs.length
    let len = 30
    for(let i =0;i<count+len;i++){
        
        animator.when(100*i,(index,p)=>{
            let start = index-len, end = index
            start= start<0?0:start
            end = end>=count?count-1:end
           
            for(let j=0;j<count;j++){
                let child = childs[j]
                if(j>=start&&j<=end){
                    let _i = j-start
                    _i = _i<0?0:_i
                    child.style.opacity = 1/(end-start)*(_i)+p/100
                    child.dirty()
                }else{
                    child.style.opacity = 0
                    child.dirty()
                }
            }
        })
    }
  
    animator.start().done(()=>{
        tapu.rootGroup.remove(group)
    }) */

}