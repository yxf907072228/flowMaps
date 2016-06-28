import React from 'react'
import classNames from 'classnames'
export default function render(){
    const {show,more,top,left,menus}=this.state
    const {menuClickHandle}=this.props
    const _menuClickHandle=function(index,event){
        menuClickHandle(index,event)
    }
    return (
        <ul className={classNames({'nodeMenu':true,'active':show,'more':more})} style={{top:top,left:left}}>
            <li title="增加链接" style={{display:menus[0]==true?'block':'none'}} onClick={_menuClickHandle.bind(this,0)}></li>
            <li title="删除节点"  style={{display:menus[1]==true?'block':'none'}}  onClick={_menuClickHandle.bind(this,1)}></li>
            <li title="增加管理员权限" style={{display:menus[2]==true?'block':'none'}}  onClick={_menuClickHandle.bind(this,2)}></li>
            <li title="删除管理员权限"  style={{display:menus[3]==true?'block':'none'}}  onClick={_menuClickHandle.bind(this,3)}></li>
            <li title="设为支付账户" style={{display:menus[4]==true?'block':'none'}}   onClick={_menuClickHandle.bind(this,4)}></li>
            <li title="取消支付账户" style={{display:menus[5]==true?'block':'none'}}   onClick={_menuClickHandle.bind(this,5)}></li>
        </ul>
    )
}