import React from 'react'
import tplRender from './jsx/rightmenu.jsx'

export default class RightMenu extends React.Component{
	
	constructor(props){
		super(props)
		
		this.state={
			show:false
		   ,left:0
		   ,top:0
		}
	}
	
	render(){
		return tplRender.bind(this)()
	}
	
	rightMenuHandle(e){
    	e.preventDefault()
    }
	
	showMenu(opts){
		this.setState(Object.assign({
			show:true
		},opts))
	}
	
	hideMenu(){
		this.setState({
			show:false
		})
	}
}
