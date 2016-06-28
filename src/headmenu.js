import React from 'react'
import tplRender from './jsx/headmenu.jsx'

export default class HeadMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
           
        }
    }
   
    
    
    render(){
        return tplRender.bind(this)()
    }
    
}