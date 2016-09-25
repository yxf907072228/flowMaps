import React from 'react';
import tplRender from './jsx/toolbar.js'
export default class ToolBar extends React.Component{
	
	
	constructor(props){
        super(props);
        this.state={
        	activeBtn:'default'
        }
    }
	render(){
		return tplRender.bind(this)()
	}
	
	onSelectBtnHandle(activeBtn){
		const {selectBtnHandle}=this.props
		this.setState({
			activeBtn
		})
		selectBtnHandle&&selectBtnHandle(activeBtn)
		this.onBtnClickHandle(activeBtn)
	}
	
	onBtnClickHandle(btn){
		this.props.clickBtnHandle(btn)
	}
}
