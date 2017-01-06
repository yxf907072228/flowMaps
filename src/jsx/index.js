import React from 'react'
import classNames from 'classnames'
import renderToolBar from '../toolbar'
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
        ,activeBtn
        ,dataStr
        ,dataStrValid
    } = this.state
    
    return (
        <div  ref="flowmap" className="flowmap" onClick={this.onFlowMapClickHandle.bind(this)}>
        	{/*
                <ToolBar ref="toolbar" clickBtnHandle={this.clickToolbarBtnHandle.bind(this)} selectBtnHandle={this.selectToolbarBtnHandle.bind(this)} toolbarTypes={config.TOOLBAR_TYPES}></ToolBar>
            */}
            {config['TOOLBAR_TYPES']&&renderToolBar.call(this)}
            <div ref="paper" className={classNames({"paper":true,"active": activeBtn !== 'json'})} style={{width:mapWidth,height:mapHeight}} onContextMenu={this.rightMenuHandle.bind(this)} >
                
            </div>
            <textarea value={dataStr} onChange={this.dataStrChangeHandle.bind(this)}  className={classNames({"json": true, "active": activeBtn == 'json', error: dataStrValid == false})} style={{width:mapWidth,height:mapHeight}}>

            </textarea>
            {/*<div ref="eye" style={{width:'300px',height:'200px',border:'1px solid red',zindex:10,top:0,right:0,position:'absolute'}}>

            </div>*/}
            <RightMenu ref="rightmenu" menuHandle={this.rightMenuClickHandle.bind(this)} menuTypes={config.MENU_TYPES} groupTypes={config.GROUP_TYPES} nodeTypes={config.NODE_TYPES} ></RightMenu>
        </div>
    )
}