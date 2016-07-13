import React from 'react'
import classNames from 'classnames'
export default function render(){
    const {show,top,left}=this.state
    const {menuClickHandle}=this.props
    const _menuClickHandle=function(index,event){
        menuClickHandle(index,event)
    }
    return (
        <ul ref="rightmenu" className={classNames({'rightMenu':true,'active':show})} style={{left:left,top:top}} onContextMenu={this.rightMenuHandle.bind(this)}>
            <li>新建组</li>
        	<li>新建节点</li>
        	<li>清空画布</li>
        	<li>放大</li>
        	<li>缩小</li>
        	<li>1:1</li>
        </ul>
    )
}