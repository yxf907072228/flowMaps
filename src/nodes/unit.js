
import zrender from 'zrender/lib/zrender'
import TextShape from 'zrender/lib/graphic/Text'
import ImageShape from 'zrender/lib/graphic/Image'
import EllipseShape from 'zrender/lib/graphic/shape/Ellipse'
export default function render(group, option,nodeData){
    let {上:upTitle=0,下:downTitle=0} = nodeData
    let titleNode = new TextShape({
        style: {
            x:option.width/2,
            y:option.height+10,
            text: nodeData.title,
            textAlign: 'center',
            textFill: option.color,
            fontWeight:'bolder',
            fontSize:11,
            opacity:0.8
        }
    })


    var titleBK = new ImageShape({
        position: [0, 0],
        scale: [1, 1],
        style: {
            x:  0,
            y:  0,
            image: option.icon,
            width: option.width,
            height: option.height
        }
        
    })

    var icon1 = new TextShape({
        style:{
            textFill:'#fff',
            textBackgroundColor:'rgb(21,122,88)',
            x:2,
            y:0,
            text:upTitle,
            fontSize:8,
            fontWeight:'bolder',
            textAlign: 'center',
            textBorderRadius:10,
            textPadding:[0,2]
        }
    })

    var icon2 = new TextShape({
        style:{
            textFill:'#fff',
            textBackgroundColor:'rgb(250,63,72)',
            x:option.width-3,
            y:12,
            text:downTitle,
            textPadding:[0,2],
            fontSize:8,
            fontWeight:'bolder',
            textAlign: 'center',
            textBorderRadius:10
        }
    })

    group.add(titleBK)
    group.add(titleNode)
    group.add(icon1)
    group.add(icon2)
    
    
}
    
