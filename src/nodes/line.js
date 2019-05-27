
import zrender from 'zrender/lib/zrender'
import LineShape from 'zrender/lib/graphic/shape/Line'
export default function render(group, option,nodeData){
    let zlevel = option.zlevel || 1;
    let lineWidth=1
    let line = new LineShape({
        zlevel,
        shape: {
            x1:2,
            y1:lineWidth,
            x2:100,
            y2:lineWidth
        },
        style: {
            // text:123321,
            //textRotation:0.5
          //  lineDash: [2, 2],
          //  [ARROW_INFO.color && 'stroke']: ARROW_INFO.color
          lineWidth:lineWidth,
          stroke: '#666'
        }
    })
   
    //group.zlevel=zlevel
    group.add(line)
   
}