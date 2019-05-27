import PathShape from 'zrender/lib/graphic/Path'
import pathTool from 'zrender/lib/tool/path'
import LinearGradient from  'zrender/lib/graphic/LinearGradient'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'
import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'
import CircleShape from 'zrender/lib/graphic/shape/Circle'
import { getCurvePath,getCPoint } from './coordinates'
import { Animator } from './animator'
function getLinearColor(p,start,end,option={}){
    let s1 = 0
    let e1 = p
    s1=e1-0.6
    s1=s1>=0?s1:0
    e1 = e1>=1?1:e1

    var colorList = [
        {
            offset: 0,
            color: option.color.replace(")",",0)")
        },{
            offset: s1,
            color: option.color.replace(")",",0)")
        },{
            offset: e1,
            color: option.color.replace(")",",1)")
        },
        {
            offset: e1,
            color: option.color.replace(")",",0)")
        },
        {
            offset: 1,
            color: option.color.replace(")",",0)")
        }
    ];
    var linearGradient = new LinearGradient(start.x,start.y,end.x,end.y, colorList,true);
    return linearGradient;
}

let path = ''
export default function fuck(tapu,start,end,option={}, callback){
    //console.log(arguments,'star')
    
    let points =getCurvePath([start.x,start.y],[end.x,end.y],0.4)
    let fcolor = option.color || 'rgba(56,222,56)';
    var colorList = [
        {
            offset: 0,
            color: fcolor.replace(")",",1)")
        },{
            offset: 1,
            color: fcolor.replace(")",",0.2)")
           // color: fcolor.replace(")",",0)")
        }
    ]
    let starColor = new RadialGradient(0.5,0.5,0.5,colorList)
    //console.log(points)
    let cpoint = getCPoint([start.x,start.y],[end.x, end.y],0.4)
    let line1 = new BezierCurveShape({
        zlevel:1,
        shape:{
            x1:start.x,
            y1:start.y,
            x2:end.x,
            y2:end.y,
            cpx1:cpoint[0],
            cpy1:cpoint[1]
        },
        style:{
            stroke:'transparent',
            lineWidth:4,
            shadowColor:fcolor,
            shadowBlur:6,
            opacity:0.2
        },
        level:1
    })
    let star = new CircleShape({
 
        shape:{
          //  cx:points[50].x,
          //  cy:points[50].y,
           cx:start.x,
           cy:start.y,
            r:5
        },
        style:{
            fill:starColor,
            shadowColor:'#fff',
            shadowBlur:6,
            blend:'lighter',
        },
        zlevel:1
    })
    tapu.rootGroup.add(line1)
    tapu.rootGroup.add(star)
    let animator = new Animator({})
    let len=points.length*(1+0.6)
    for(let index =0;index<len;index++){
      
        animator.when(20*index,(i,p)=>{
            let lastIndex=i-1
            if(i<points.length){
                
                lastIndex=lastIndex<0?0:lastIndex
                star.shape.cx=points[lastIndex].x +(points[i].x-points[lastIndex].x)*p
                star.shape.cy=points[lastIndex].y +(points[i].y-points[lastIndex].y)*p
                star.dirty()
    
                line1.style.stroke = getLinearColor((lastIndex+p)/100,start,end,{color:fcolor})
                line1.dirty()
            }else if(i==points.length){
                tapu.rootGroup.remove(star)
                star=null
                line1.style.stroke = getLinearColor((lastIndex+p)/100,start,end,{color:fcolor})
                line1.dirty()
            }else{
                line1.style.stroke = getLinearColor((lastIndex+p)/100,start,end,{color:fcolor})
                line1.dirty()
            }
        })
    }
    
    animator.start()
    .done(()=>{
       //console.log('结束了，移除!')
       tapu.rootGroup.remove(line1)
       star&&tapu.rootGroup.remove(star)
       callback&&callback()
    })
}