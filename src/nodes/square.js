
import zrender from 'zrender/lib/zrender'
import RectShape from 'zrender/lib/graphic/shape/Rect'
import TextShape from 'zrender/lib/graphic/Text'
import textBkIcon from '../images/square-normal.png'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'
import ImageShape from 'zrender/lib/graphic/Image'
export default function render(group, option,nodeData){
    let zlevel = option.zlevel
    var circle = new ImageShape({
        position: [5, -15],
        scale: [1, 1],
        zlevel,
        style: {
            x:  0,
            y:  0,
            image: option.color,
            width: option.width ||100,
            height: option.height||100
        },
        onclick(){
           // window.open('/skyeye/home/screen3?unit='+nodeData.title)
        }
        
    })
   /*  let rect1 = new RectShape({
        rotation:Math.PI/4,
        zlevel,
        shape: {
            x:10,
            y:10,
            width:10,
            height:10,
        },
        style: {
            fill:option.color,
            shadowBlur: option.color,
            shadowBlur:50
        }
    })
    let rect2 = new RectShape({
        rotation:Math.PI/4,
        zlevel,
        shape: {
            x:5,
            y:5,
            width:20,
            height:20,
        },
        style: {
            opacity:0,
            fill:option.color,
            shadowBlur: option.color,
            shadowBlur:50
        }
    })

    let rect3 = new RectShape({
        rotation:Math.PI/4,
        zlevel,
        shape: {
            x:0,
            y:0,
            width:30,
            height:30,
        },
        style: {
            opacity:0,
            fill:option.color,
            shadowBlur: option.color,
            shadowBlur:50
        }
    }) */

    
    let titleNode = new TextShape({
        zlevel,
        style: {
            x: option.width/2 + 5,
            y: option.height -2,
            text: nodeData.title,
            textAlign: 'center',
            textFill: '#4CDAF6',//option.color,
            fontSize:'10',
            opacity:0.8
        }
    })

    let {x:titleX,y:titleY,width:titleWidth,height:titleHeight} = titleNode.getBoundingRect()
    
    var titleBK = new ImageShape({
        position: [0, 0],
        scale: [1, 1],
        style: {
            x:  titleX,
            y: titleY-4,
            image: textBkIcon,
            width: titleWidth,
            height:titleHeight+8
           
        }
    })


   /*  
    rect2.animate('style', true)
    .when(1000, {
        opacity:0.6
    })
    .when(2000, {
        opacity:0.6
    })
    .when(3000, {
        opacity:0.6
    })
    .when(4000, {
        opacity:0
    })
    .start();
    rect3.animate('style', true)
    .when(1000, {
        opacity:0
    })
    .when(2000, {
        opacity:0.4
    })
    .when(3000, {
        opacity:0
    })
    .when(4000, {
        opacity:0
    })
    .start(); */


    
    /* group.add(rect1)
    group.add(rect2)
    group.add(rect3) */
    group.add(circle)
    group.add(titleBK)
    group.add(titleNode)
    
}