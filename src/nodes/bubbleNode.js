
import CircleShape from 'zrender/lib/graphic/shape/Circle'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'

export default function render(group, option,nodeData){

    let color = option.color || 'rgba(228, 89, 33)'
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
    let fcolor = new RadialGradient(0.5,0.5,0.5,colorList)
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
    })

    
    node1.animate('shape', true)
    .when(timeRange, {
        r
    })
    .when(timeRange*2, {
        r
    })
    .start(); 

    node1.animate('style', true)
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
    group.add(node3)
    
    
}
    

