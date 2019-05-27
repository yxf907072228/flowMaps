
import zrender from 'zrender/lib/zrender'
import TextShape from 'zrender/lib/graphic/Text'
import ImageShape from 'zrender/lib/graphic/Image'
export default function render(group, option,nodeData){
    let zlevel = option.zlevel || 1;
    
    let titleNode = new TextShape({
        zlevel,
        style: {
            x:option.titleX,
            y:option.titleY,
            text: nodeData.title,
            textAlign: 'center',
            textFill: option.color,
            fontSize:'14',
            fontWeight:'bolder',
            opacity:0.8
        }
    })


    var titleBK = new ImageShape({
        position: [0, 0],
        scale: [1, 1],
        zlevel,
        style: {
            x:  0,
            y:  0,
            image: option.icon,
            width: option.width,
            height: option.height
        }
        
    })


    //group.zlevel=zlevel
    group.add(titleBK)
    group.add(titleNode)
    
    if(option.content){
        let contentNode = new TextShape({
            zlevel,
            style: {
                x:option.contentX,
                y:option.contentY,
                text:option.content,
                textAlign: 'center',
                textFill: option.color,
                fontSize:'14',
                fontWeight:'bolder',
                opacity:0.8
            }
        })
        group.add(contentNode)
    }
    
}