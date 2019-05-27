import Group from 'zrender/lib/container/Group'
import PathShape from 'zrender/lib/graphic/Path'
import pathTool from 'zrender/lib/tool/path'
import LinearGradient from  'zrender/lib/graphic/LinearGradient'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'
import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'
import CircleShape from 'zrender/lib/graphic/shape/Circle'
import { getCurvePath,getCPoint } from './coordinates'
import { Animator } from './animator'
import { debug } from 'util';


let p = 'M70.4 787.2l416-457.6c12.8-16 38.4-16 51.2 0l416 457.6c6.4 9.6 19.2 12.8 28.8 12.8 35.2 0 51.2-41.6 28.8-67.2l-448-492.8c-28.8-32-76.8-32-102.4 0L12.8 732.8c-22.4 25.6-3.2 67.2 28.8 67.2 12.8 0 22.4-3.2 28.8-12.8z'

function createLineItem(option={}){
    let line =  pathTool.createFromString(p)
    line.style.fill = option.color || 'yellow'
    line.style.opacity = 0
    line.scale=[0.012,0.012]
    return line
}

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
    let points =getCurvePath([start.x,start.y],[end.x,end.y],0.4,0.02);
    let fcolor = option.color || 'rgba(56,222,56)';
    let group = new Group()
    
    points.map((p,i)=>{
       
       if(points[i+1]){
        let line =  createLineItem({color:fcolor})
        line.position = [p.x, p.y]
        line.zlevel = 10
        line.rotation = -getAngle(p.x,p.y,points[i+1].x,points[i+1].y)*Math.PI/180
      //  console.log(getAngle(p.x,p.y,points[i+1].x,points[i+1].y))
        group.add(line)
       }
       
    }) 

  

    tapu.rootGroup.add(group)
    let childs = group.children()
    let animator = new Animator()
    let count = childs.length
    let len = 30
    for(let i =0;i<count+len;i++){
        
        animator.when(30*i,(index,p)=>{
            let start = index-len, end = index
            start= start<0?0:start
            end = end>=count?count-1:end
            /* for(let j=start;j<=end;j++){
                let child = childs[j]
                child.style.opacity = 1/(end-start)*j
                child.dirty()
            } */

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
    /* let flen = 10
    childs.map((c,index)=>{
        animator.when(40*index,(i,p)=>{
            let len= i
            len = len>=childs.length?childs.length-1:len
            let min = len-10
            min=min<=0?0:min
            console.log(len-childs.length)
            childs.map((child, j)=>{
                
                
                if(j<=len&&j>=min){
                    child.style.opacity = 1/i*j+p/100
                    child.dirty()
                }else if(j<min){
                    let o = child.style.opacity-p/50
                    o-=1/childs.length/4
                    o=o<=0?0:o 
                    child.style.opacity = o
                    child.dirty()
                }

            })
        })
    }) */
   /*  childs.map((c,index)=>{
        animator.when(100*index,(i,p)=>{
            childs.map((child,j)=>{
                let o=child.style.opacity-1/50
                o=o<0?0:o
                child.style.opacity = o
                child.dirty()
            })
        })
    }) */
    animator.start().done(()=>{
        tapu.rootGroup.remove(group)
        callback&&callback()
    })

}