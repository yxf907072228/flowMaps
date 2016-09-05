import React from 'react';
import tplRender from './jsx/toolbar.jsx'
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
		console.log(btn)
	}
}
