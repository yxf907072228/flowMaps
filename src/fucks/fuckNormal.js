import PathShape from 'zrender/lib/graphic/Path'
import pathTool from 'zrender/lib/tool/path'
import LinearGradient from  'zrender/lib/graphic/LinearGradient'
import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'

import { getCurvePath,getCPoint } from './coordinates'
import { Animator } from './animator'

function getLinearColor(index,start,end, option={}){
   /*  let start = index-1
    let end = index
   // console.log(start,end)
    start = start<0?0:start
    end =end>1?1:end */
    let p =index*2
    var colorList = [
        {
            offset: 0,
            color: option.color.replace(")",",0)")
        },{
            offset: p>1?p-1:0,
            color: option.color.replace(")",",0)")
        },{
            offset: index,
            color: option.color.replace(")",",1)")
        },
        {
            offset: p>1?1:p,
            color: option.color.replace(")",",0)")
        },
        {
            offset: 1,
            color: option.color.replace(")",",0)")
        }
    ];
    var linearGradient = new LinearGradient(start.x,start.y,end.x,end.y, colorList,true);
    return linearGradient;
   
   // return `rgba(56,222,56,${index})`
}
export default function fuck(tapu,start,end,option={},callback){
   
   // let points = getCurvePath([start.x,start.y],[end.x, end.y],0.4)
    let fcolor = option.color || 'rgba(56,222,56)';

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
            lineWidth:5,
            opacity:0.8,
            blend:'lighter'
        },
        level:1
    })
    tapu.rootGroup.add(line1)
    
    let animator = new Animator({})
    for(let x=0;x<100;x++){
        animator.when(20*x,(i,p)=>{
            line1.style.stroke = getLinearColor((i+p)/100,start,end,{color:fcolor})
            line1.dirty()
        })
    }
    animator
    .start()
    .done(()=>{
        tapu.rootGroup.remove(line1)
        callback&&callback()
    })

}