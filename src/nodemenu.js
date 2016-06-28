import React from 'react'
import tplRender from './jsx/nodemenu.jsx'

export default class NodeMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show:false
           ,top:0
           ,left:0
           ,menus:{
               0:true,1:true,2:true,3:true,4:true,5:true
           }
        }
    }
    
    show(opts){
        let o=Object.assign({
            show:true
           ,top:0
           ,left:0
        },opts)
        o.menus=Object.assign({
           0:true,1:true,2:true,3:true,4:true,5:true
        },opts.menus)
        if(JSON.stringify(o.menus)=='{"0":false,"1":true,"2":false,"3":false,"4":false,"5":false}'){
            o.left+=10
        }
        this.setState(o)
    }

    hide(){
        this.setState({
             show:false
            ,menus:{
                0:true,2:true,3:true,4:true,5:true
            }
        })
    }

    render(){
        return tplRender.bind(this)()
    }
    
}