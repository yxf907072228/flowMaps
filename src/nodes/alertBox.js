
import zrender from 'zrender/lib/zrender'
import TextShape from 'zrender/lib/graphic/Text'
import CircleShape from 'zrender/lib/graphic/shape/Circle'
import Group from 'zrender/lib/container/Group'
import ImageShape from 'zrender/lib/graphic/Image'
import LineShape from 'zrender/lib/graphic/shape/Line'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'
import { debug } from 'util';

export default function render(group, option,nodeData){
    let zlevel = option.zlevel || 1;
    let text = nodeData.title || '暂无告警信息!';
    //text = text.replace(/(.{12})(?=.)/g,"$1\r\n");
    let sbound = nodeData.node.getBoundingRect()
    let sx = nodeData.node.position[0]+sbound.width/4-4,sy=  nodeData.node.position[1] + sbound.y+sbound.height/4-5;
    
    if(nodeData.node.title=='数据中心'){
        sx+=12
        sy+=8

    }
    let circle1 = new CircleShape({
        position:[sx, sy],
        shape:{
            r:2
        },
        zlevel:1000,
        style:{
            fill:new RadialGradient(0.5 ,0.5, 1, [
                {
                    offset: 0,
                    color: 'rgba(255,16,110,1)' //'rgba(228,46,78)'
                },
                {
                    offset: 0.2,
                    color: 'rgba(255,16,110,0.5)' //'rgba(228,46,78)'
                },
                {
                    offset: 1,
                    color: 'rgba(255,16,110,0)'
                }
            ]),
            shadowBlur: 'rgba(255,16,110,1)',
            shadowBlur:20,
            opacity:1
        }
    });
    let circle2 = new CircleShape({
        position:[sx, sy],
        shape:{
            r:2
        },
        style:{
            fill:new RadialGradient(0.5 ,0.5, 1, [
                {
                    offset: 0,
                    color: 'rgba(255,16,110,1)' //'rgba(228,46,78)'
                },
                {
                    offset: 0.2,
                    color: 'rgba(255,16,110,0.5)' //'rgba(228,46,78)'
                },
                {
                    offset: 1,
                    color: 'rgba(255,16,110,0)'
                }
            ]),
            shadowBlur: 'rgba(255,16,110,1)',
            shadowBlur:20,
            opacity:1
        }
    });
    var p = new Group({
        position: [0,0],
        scale:[0.01,0.01],
        style: {}});
    let titleNode = new TextShape({
        zlevel,
        style: {
            x:0,
            y:0,
            text,
            textAlign: 'left',
            textFill: option.color,
            fontSize:'10',
            fontWeight:'bolder',
            opacity:0.8
        }
    })

    let line = new LineShape({
            shape: {
                x1: sx,
                y1: sy,
                x2:  nodeData.node.position[0],
                y2:  nodeData.node.position[1]
            },
            style:{
                stroke:'red',
                lineWidth:2,
                opacity:0.4
            },
            zlevel:100
    });
    let bound = titleNode.getBoundingRect()


    var titleBK = new ImageShape({
        position: [bound.x-40, bound.y-10],
        scale: [1, 1],
        zlevel,
        style: {
            x:  0,
            y:  0,
            fill:'rgb(55, 8, 9)',
            image: option.icon,
            width: bound.width+40,
            height: (bound.height<30?30:bound.height)+20
        }
        
    })

    var titleIcon = new ImageShape({
        position: [-35,0],
        scale: [1, 1],
        zlevel,
        style: {
            x:  0,
            y:  0,
            image: option.warnicon,
            width:30,
            height:30
        }
        
    })


    //group.zlevel=zlevel
    p.add(titleBK)
    p.add(titleIcon)
    p.add(titleNode)
    group.add(p)
    group.parent.add(line)
    group.parent.add(circle1)
    group.parent.add(circle2)
    
    
    let t=1000

    line.animate('shape',false)
    .when(t,{
        x2:530,
        y2:10
    }).during(function(shape){

        circle2.position = group.position = [shape.x2, shape.y2]
        group.dirty(true)
        circle2.dirty(true)
    }).done(function(){
       
     //  group.position = [circle2.position[0]-bound.width/2,circle2.position[1]-bound.height/2]
     //  group.dirty(true)
    
        p.animateTo({
            scale:[1,1],
            position:[-titleBK.style.width/2+40,-titleBK.style.height+10]
        },t,function(){
            close()
        });
    }).start()

   /*  
    p.parent.animateTo({
        position:[210,0]
    },t,function(){
        p.animateTo({
            scale:[1,1]
        },t);
    })
        
    line.animateTo({
        shape:{
            x2:350,
            y2:150
        }
    },t,function(){
       
    }) */
    

    function close(){
        setTimeout(()=>{

        line.animateTo({
           shape:
           {x1:circle2.position[0],
            y1:circle2.position[1]
           }
        },function(){
            nodeData.tapu.deleteNode(line)
            
            nodeData.tapu.deleteNode(circle1)
            nodeData.tapu.deleteNode(circle2) 
            group.animateTo({
                scale:[0.01,0.01]
            },function(){
                nodeData.tapu.deleteNode(group)
            })
        })

        circle1.animateTo({
            position:circle2.position
        })
    
        
        },11000)
    }
    
}