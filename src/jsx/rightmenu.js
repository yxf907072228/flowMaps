import React from 'react'
import classNames from 'classnames'



export default function render(){
    const {show,top,left,indexItem}=this.state
    const {nodeTypes,menuTypes,menuHandle}=this.props

    function getNodeTypes(nodeTypes){
        let nodeTypeMenu=[]
        for(let t in nodeTypes){
            let node=nodeTypes[t]
            node.type=t
            nodeTypeMenu.push(<li key={t} onClick={menuHandle.bind(this,'addNode',node)}>{node['title']}</li>)
        }
        return nodeTypeMenu
    }
    
    return (
        <ul ref="rightmenu" className={classNames({'rightMenu':true,'active':show})} style={{left:left,top:top}} onContextMenu={this.rightMenuHandle.bind(this)}>
            {
                menuTypes.map((item,i)=>{
                    if(item.key=='addGroup'){
                        return <li key={i} className={classNames({active:indexItem==item.key})} onClick={menuHandle.bind(this,item.key)} onMouseOver={this.menuItemActiveHandle.bind(this,item.key)}>
                            新建组
                            <ul className={classNames({'rightMenu':true,'rightMenuChild':true})}>
                                <li>组一</li>
                                <li>组二</li>
                                <li>组三</li>
                            </ul>
                        </li>
                    }else if(item.key=='addNode'){
                         return <li key={i} className={classNames({active:indexItem==item.key})} onClick={menuHandle.bind(this)}  onMouseOver={this.menuItemActiveHandle.bind(this,item.key)}>
                            新建节点
                            <ul className={classNames({'rightMenu':true,'rightMenuChild':true})}>
                                {getNodeTypes.call(this,nodeTypes)}
                            </ul>
                        </li>
                    }else{
                         return <li key={i} onClick={menuHandle.bind(this,item.key)} onMouseOver={this.menuItemActiveHandle.bind(this,item.key)}>{item.title}</li>
                    }
                   
                })
            }
        </ul>
    )
}