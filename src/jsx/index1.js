import React from 'react'
import ToolBar from '../toolbar'
import RightMenu from '../rightmenu'

import '../../styles/flowMap.less'

export default function render( ){
    const {
         mapWidth
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
        	<ToolBar ref="toolbar" clickBtnHandle={this.clickToolbarBtnHandle.bind(this)} selectBtnHandle={this.selectToolbarBtnHandle.bind(this)} toolbarTypes={config.TOOLBAR_TYPES}></ToolBar>
            <div ref="paper" style={{width:mapWidth,height:mapHeight}} onContextMenu={this.rightMenuHandle.bind(this)} >
                
            </div>
            <RightMenu ref="rightmenu" menuHandle={this.rightMenuClickHandle.bind(this)} menuTypes={config.MENU_TYPES} nodeTypes={config.NODE_TYPES} ></RightMenu>
        </div>
    )
}