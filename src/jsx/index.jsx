import React from 'react'
import NodeMenu from '../nodemenu'
import ToolBar from '../toolbar'
import RightMenu from '../rightmenu'

import '../../styles/flowMap.less'

export default function render(){
    const {mapWidth
        ,mapHeight
        ,nodeMenuHandle
        ,toolItemTipX
        ,toolItemTipY
        ,toolItemTipShow
        ,toolItemTipText
        ,config
    }=this.state
    return (
        <div  ref="flowmap" className="flowmap" onClick={this.onFlowMapClickHandle.bind(this)}>
        	<ToolBar ref="toolbar" selectBtnHandle={this.selectToolbarBtnHandle.bind(this)}></ToolBar>
            <div ref="paper" style={{width:mapWidth,height:mapHeight}} onContextMenu={this.rightMenuHandle.bind(this)} >
                
            </div>
            <RightMenu ref="rightmenu" menuHandle={this.rightMenuClickHandle.bind(this)} menuTypes={config.MENU_TYPES} nodeTypes={config.NODE_TYPES} ></RightMenu>
           {/*<NodeMenu ref="nodemenu" menuClickHandle={nodeMenuHandle.bind(this)}></NodeMenu>*/} 
        </div>
    )
}