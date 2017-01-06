import React from 'react'
import classNames from 'classnames'

export default function render(){
    const {activeBtn,config}=this.state
	const toolbarTypes = config['TOOLBAR_TYPES']
    return (
        <div className='toolbar' ref="toolbar">
			{
				toolbarTypes.map((group,i)=>{
					return <ul key={i} className='btns-group'>
						{
							group.map((item,j)=>{
								if(item.name=='search'){
									return <div key={j}>
										<input className='btn' placeholder="搜索关键字" onChange={this.setKeyWord.bind(this)} onKeyDown={this.enterSearch.bind(this)}/>
										<li className='btn' onClick={this.clickToolbarBtnHandle.bind(this,item)}><i className="ico toolbar-search" onClick={this.searchNode.bind(this)}></i></li>
									</div>
								}else if(item.checkBtn){
									return <li  key={j} className={classNames({btn:true,active:activeBtn==item.name})} onClick={this.clickToolbarBtnHandle.bind(this,item)}><i className={"ico toolbar-"+item.name}></i></li>
								}else{
									return <li  key={j} className='btn' onClick={this.clickToolbarBtnHandle.bind(this,item)}><i className={"ico toolbar-"+item.name}></i></li>
								}
								
							})
						}
					</ul>
				})
			}
			</div>
    )
}