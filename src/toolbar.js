import React from 'react';
import tplRender from './jsx/toolbar.js'
 
	
	/*
	constructor(props){
        super(props);
        this.state={
        	activeBtn:'default'
        }
    }*/

	export default function render(){
		return tplRender.bind(this)()
	}
	
	

