import pathTool from 'zrender/lib/tool/path'
import CircleShape from 'zrender/lib/graphic/shape/Circle'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'

let p = 'M960 42.666667H64c-12.8 0-21.333333 8.533333-21.333333 21.333333v896c0 12.8 8.533333 21.333333 21.333333 21.333333h896c12.8 0 21.333333-8.533333 21.333333-21.333333V64c0-12.8-8.533333-21.333333-21.333333-21.333333z m-21.333333 896H85.333333V682.666667h853.333334v256z m0-298.666667H85.333333V384h853.333334v256z m0-298.666667H85.333333V85.333333h853.333334v256zM298.666667 768h-42.666667v85.333333h42.666667v-85.333333z m-85.333334 0H170.666667v85.333333h42.666666v-85.333333z m661.333334 21.333333h-170.666667v42.666667h170.666667v-42.666667zM298.666667 469.333333h-42.666667v85.333334h42.666667v-85.333334z m-85.333334 0H170.666667v85.333334h42.666666v-85.333334z m661.333334 21.333334h-170.666667v42.666666h170.666667v-42.666666zM298.666667 170.666667h-42.666667v85.333333h42.666667V170.666667z m-85.333334 0H170.666667v85.333333h42.666666V170.666667z m661.333334 21.333333h-170.666667v42.666667h170.666667V192z';

export default function render(group, option,nodeData){

    let color =  'rgba(255, 255, 0)'
    let r = option.r || 30
    let timeRange = option.timeRange || 2000
    var colorList = [
        
        {
            offset: 0,
            color: color.replace(")",",0)")
        },
        {
            offset: 0.7,
            color: color.replace(")",",0.2)")
        },
        {
            offset: 1,
            color: color.replace(")",",1)")
        }
    ]

    let node1 =  pathTool.createFromString(p)
    node1.style.fill = color
    node1.style.opacity = 1

    node1.scale=[0.05, 0.05]
    group.add(node1)

  /*   let fcolor = new RadialGradient(0.5,0.5,0.5,colorList)
    let node1 = new  CircleShape({
        shape:{
            cx: r,
            cy: r,
            r:0,
           
        },
        style:{
            fill:fcolor,
            opacity:1
        },
        
        zlevel:1
    })

    let node2 = new  CircleShape({
        shape:{
            cx: r,
            cy: r,
            r:0,
           
        },
        style:{
            fill:fcolor,
            opacity:1
        },
        
        zlevel:1
    })

    let node3 = new  CircleShape({
        shape:{
            cx: r,
            cy: r,
            r:2,
           
        },
        style:{
            fill:color,
            opacity:0.8
        },
        
        zlevel:1
    }) */

    
    node1.animate('', true)
    .when(timeRange, {
        scale:[0.1, 0.1]
    })
    .start(); 

   /*   node1.animate('style', true)
    .when(timeRange, {
        opacity:1
    })
    .when(timeRange*2, {
        opacity:0
    })
    .start(); 
    
    node2.animate('shape', true).delay(timeRange)
    .when(timeRange, {
        r
    })
    .when(timeRange*2, {
        r
    })
    .start(); 

    node2.animate('style', true).delay(timeRange)
    .when(timeRange, {
        opacity:1
    })
    .when(timeRange*2, {
        opacity:0
    })
    .start(); 
    group.add(node1)
    group.add(node2)
    group.add(node3) */
    
    
}
    

