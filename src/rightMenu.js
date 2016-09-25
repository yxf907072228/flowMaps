import React from 'react'
import tplRender from './jsx/rightmenu.js'

export default class RightMenu extends React.Component{
	
	constructor(props){
		super(props)
		
		this.state={
			show:false
		   ,left:0
		   ,top:0
		   ,indexItem:0
		}
	}
	
	render(){
		return tplRender.bind(this)()
	}
	
	rightMenuHandle(e){
    	e.preventDefault()
    }
	
	menuItemActiveHandle(indexItem){
		this.setState({
			indexItem
		})
	}

	showMenu(opts){
		this.setState(Object.assign({
			show:true
		   ,indexItem:0
		},opts))
	}
	
	hideMenu(){
		this.setState({
			show:false
		   ,indexItem:0
		})
	}
/*
	menuHandle(index,o,e){
		const {left,top}=this.state
		switch(index){
			case 1:
				//创建组相关操作
			;break
			case 2:
				//创建节点相关操作
				if(e){
					this.props.createNodeHandle(o.type,left-25,top-25)
				}
			;break;

			default:;
		}
		
		//this.hideMenu()
	}
*/
	

}
