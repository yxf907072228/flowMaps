import React from 'react'
import classNames from 'classnames'
export default function render(){
    const {activeBtn}=this.state
    return (
        <div className='toolbar'>
				<ul className='btns-group'>
					<li className={classNames({btn:true,active:activeBtn=='default'})} onClick={this.onSelectBtnHandle.bind(this,'default')}><i className="ico toolbar-default"></i></li>
					<li className={classNames({btn:true,active:activeBtn=='rectangle_selection'})} onClick={this.onSelectBtnHandle.bind(this,'rectangle_selection')}><i className="ico toolbar-rectangle_selection"></i></li>
					<li className={classNames({btn:true,active:activeBtn=='pan'})} onClick={this.onSelectBtnHandle.bind(this,'pan')}><i className="ico toolbar-pan"></i></li>
				</ul>
				<ul className='btns-group'>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'zoomin')}><i className="ico toolbar-zoomin"></i></li>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'zoomout')}><i className="ico toolbar-zoomout"></i></li>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'zoomreset')}><i className="ico toolbar-zoomreset"></i></li>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'overview')}><i className="ico toolbar-overview"></i></li>
				</ul>
				<ul className='btns-group'>
					<li className='btn' className={classNames({btn:true,active:activeBtn=='edge'})} onClick={this.onSelectBtnHandle.bind(this,'edge')}><i className="ico toolbar-edge"></i></li>
					<li className='btn' className={classNames({btn:true,active:activeBtn=='edge_VH'})} onClick={this.onSelectBtnHandle.bind(this,'edge_VH')}><i className="ico toolbar-edge_VH"></i></li>
					<li className='btn' className={classNames({btn:true,active:activeBtn=='polygon'})} onClick={this.onSelectBtnHandle.bind(this,'polygon')}><i className="ico toolbar-polygon"></i></li>
					<li className='btn' className={classNames({btn:true,active:activeBtn=='line'})} onClick={this.onSelectBtnHandle.bind(this,'line')}><i className="ico toolbar-line"></i></li>
				</ul>
				<ul className='btns-group'>
					<input className='btn' placeholder="Name"/>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'search')}><i className="ico toolbar-search"></i></li>
				</ul>
				<ul className='btns-group'>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'print')}><i className="ico toolbar-print"></i></li>
					
				</ul>
				<ul className='btns-group'>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'json')}><i className="ico toolbar-json"></i></li>
				</ul>
				<ul className='btns-group'>
					<li className='btn' onClick={this.onBtnClickHandle.bind(this,'max')}><i className="ico toolbar-max"></i></li>
				</ul>
				
			</div>
    )
}