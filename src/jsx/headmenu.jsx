import React from 'react'
import classNames from 'classnames'
export default function render(){
   
    
    return (
        <ul className={classNames({'headMenu':true})}>
            <li title="新建页面" onClick={this.props.headMenuHandle.bind(this,0)}></li>
            
        </ul>
    )
}