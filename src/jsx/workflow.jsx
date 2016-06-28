import React from 'react'
import NodeMenu from '../nodemenu'
import HeadMenu from '../headmenu'
import '../../styles/flowMap.less'
export default function render(){
    const {mapWidth
        ,mapHeight
        ,nodeMenuHandle
        ,toolItemTipX
        ,toolItemTipY
        ,toolItemTipShow
        ,toolItemTipText
    }=this.state
    return (
        <div  className="flowmap workflow">
            <div ref="paper" style={{width:mapWidth,height:mapHeight}}>
                
            </div>
            <div className="item-tip" style={{top:toolItemTipY,left:toolItemTipX,display:toolItemTipShow?'block':'none'}}>{toolItemTipText}</div>
            <NodeMenu ref="nodemenu" menuClickHandle={nodeMenuHandle.bind(this)}></NodeMenu>
            <HeadMenu ref='headmenu' headMenuHandle={this.headMenuHandle.bind(this)}></HeadMenu>
            
        </div>
    )
}