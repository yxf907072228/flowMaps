import React from 'react'
import {NODE_TYPES,NODE_INFO,NODE_TYPES_LENGTH} from './FLOW_MAP_DATA'
import zrender from 'zrender/src/zrender'
import ImageShape from 'zrender/src/shape/Image'
import PathShape from 'zrender/src/shape/Path'
import LineShape from 'zrender/src/shape/Line'
import ReactShape from 'zrender/src/shape/Rectangle'
import tplRender from './jsx/index.jsx'


export default class FlowMap extends React.Component{
    
    constructor(props){
        super(props)
        
        this.state={
            mapWidth:1000
           ,mapHeight:1000
           ,nodeMenuHandle:this.nodeMenuHandle
           ,toolItemTipX:0
           ,toolItemTipY:0
           ,toolItemTipShow:false
           ,toolItemTipText:''
        }
        this.status={
            dropToolItem:null
           ,activeNode:null
           ,arrowTargetNode:null
           ,activeArrow:null
           ,dragging:false
           ,draggingToolbar:false
           
        }
        this.toolbarItems=[]
        this.nodes={
            
        }
        this.arrows={
            
        }
    }
    
    componentDidMount() {
       
		window.addEventListener("resize", this.refreshFillStyle.bind(this))
        this._initPaper()
        this._initToolbar()
       // this._initMap()
        this.paperTop=this.getTop(this.refs.paper)
        this.paperLeft=this.getLeft(this.refs.paper)
        setTimeout(function(){
            this.refreshFillStyle()
        }.bind(this),100)
    }
    
    render(){
        return tplRender.bind(this)()
    }
    
    rightMenuHandle(e){
    	e.preventDefault()
    	const flowmap=this.refs.flowmap,rightmenu=this.refs.rightmenu.refs.rightmenu
    	let left=e.clientX,top=e.clientY
    	if(left>this.refs.flowmap.offsetWidth+this.refs.flowmap.offsetLeft-rightmenu.offsetWidth){
    		left=this.refs.flowmap.offsetWidth+this.refs.flowmap.offsetLeft-rightmenu.offsetWidth
    		
    	}
    	if(top>this.refs.flowmap.offsetHeight+this.refs.flowmap.offsetTop-rightmenu.offsetHeight){
    		top=this.refs.flowmap.offsetHeight+this.refs.flowmap.offsetTop-rightmenu.offsetHeight
    	}
    	this.refs.rightmenu.showMenu({
    		left
    	   ,top
    	})
    	//console.log(e.clientX,e.clientY)
    }
    onFlowMapClickHandle(){
    	this.refs.rightmenu.hideMenu()
    }
    clearPaper(){
        this.zr.clear()
        
        this.status={
            dropToolItem:null
           ,activeNode:null
           ,arrowTargetNode:null
           ,activeArrow:null
           ,dragging:false
           ,draggingToolbar:false
           
        }
        this.setState({
            toolItemTipX:0
           ,toolItemTipY:0
           ,toolItemTipShow:false
           ,toolItemTipText:''
        })
        this.toolbarItems=[]
        this.nodes={
            
        }
        this.arrows={
            
        }
        this._initToolbar()
        this.refs.nodemenu.setState({
                    show:false
        })
    }
    
    nodeMenuHandle(i,event){
        if(i==0){
            this.addActiveArrow(event)
            
        }else if(i==1){
            this.deleteNode()
        }
        this.refs.nodemenu.setState({
                    show:false
        })
    }
    
    //获取元素的纵坐标 
    getTop(e){ 
        var offset=e.offsetTop; 
        if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent); 
        return offset; 
    } 
    //获取元素的横坐标 
    getLeft(e){ 
        var offset=e.offsetLeft; 
        if(e.offsetParent!=null) offset+=this.getLeft(e.offsetParent); 
        return offset; 
    } 
    
    createArrow(){
        return this.doArrow()
    }
    
    doArrow(s,t){
        let activeNode=s||this.status.activeNode
        ,arrowTargetNode=t||this.status.arrowTargetNode
        let arrow=this.addArrow(activeNode,arrowTargetNode)
        this.arrows[arrow['id']]={
             arrow:arrow
            ,source:activeNode.id
            ,target:arrowTargetNode.id
        }
        activeNode['_sourceArrows'][arrow.id]=true
        arrowTargetNode['_targetArrows'][arrow.id]=true
        activeNode['_targetNodes'][arrowTargetNode.id]=true
        arrowTargetNode['_sourceNodes'][activeNode.id]=true
                            
        
        this.status.arrowTargetNode.style.shadowBlur=0
        this.status.activeNode=null
        this.status.arrowTargetNode=null
        this.zr.refresh()
        return this.arrows[arrow['id']]
    }
    
    _initPaper(){
        let _this=this
        this.zr = zrender.init(this.refs.paper)
        this.zr.on("mouseup",function(e){
            if(this.status.dropToolItem&&(((this.toolbox.position[0]+this.toolbox.style.width)<e['event'].offsetX)||((this.toolbox.position[1]+this.toolbox.style.height)<e['event'].offsetY))){
                this.createNode(this.status.dropToolItem,e['event'].offsetX,e['event'].offsetY);
            }else if(this.status.activeArrow){
                this.delActiveArrow()
                if(this.status.arrowTargetNode){
                    this.createArrow()
                }
            }
        }.bind(this))
        this.zr.on("click",function(e){
            this.refs.nodemenu.setState({
                 show:false
            })
        }.bind(this))
        this.zr.on("mousemove",function(e){
            if(this.status.activeArrow){
                this.refreshArrowPosition(this.status.activeArrow,this.status.activeNode,{
                    position:[e['event'].clientX-this.paperLeft,e['event'].clientY-this.paperTop]
                   ,style:{
                       width:0
                      ,height:0
                   }
                })
                this.zr.render()
            }else if(this.status.dragging){
                let sarrows=this.status.activeNode._sourceArrows
                let tarrows=this.status.activeNode._targetArrows
                for(let key in sarrows){
                    let arrow=this.arrows[key]
                    this.refreshArrowPosition(arrow['arrow'],this.nodes[arrow['source']],this.nodes[arrow['target']])
                }
                for(let key in tarrows){
                    let arrow=this.arrows[key]
                    this.refreshArrowPosition(arrow['arrow'],this.nodes[arrow['source']],this.nodes[arrow['target']])
                }
                this.zr.render()
            }
        }.bind(this))
    }
    
    addActiveArrow(event){
        this.disableToolbar()
        this.status.activeArrow=this.addArrow(this.status.activeNode,{
            position:[event.clientX-25,event.clientY]
            ,style:{
                width:0,
                height:0
            }
        })
        this.zr.render()
    }
    
    delActiveArrow(){
        this.enableToolbar()
        this.zr.delShape(this.status.activeArrow['line'])
        this.zr.delShape(this.status.activeArrow['arrow'])
        this.status.activeArrow=null
        this.zr.refresh()
    }
    
    disableToolbar(index){
        let items=this.toolbarItems
        if(index!==undefined){
            items[index].draggable=false
            items[index].style.image=NODE_TYPES[items[index]['_type']]['icon_no']
        }else{
            for(let i=0,_len=items.length;i<_len;i++){
                items[i].draggable=false
                items[i].style.image=NODE_TYPES[items[i]['_type']]['icon_no']
            }
        }
        this.zr.render()
    }
    
    enableToolbar(index){
        let items=this.toolbarItems
        if(index!==undefined){
            items[index].draggable=true
            items[index].style.image=NODE_TYPES[items[index]['_type']]['icon']
        }else{
            for(let i=0,_len=items.length;i<_len;i++){
                items[i].draggable=true
                items[i].style.image=NODE_TYPES[items[i]['_type']]['icon']
            }
        }
        this.zr.render()
    }
    _initToolbar(){
        let x=0,y=0,padding=8,index=0,wsize=NODE_INFO['width'],hsize=NODE_INFO['height']
        this.toolbox=new ReactShape({
            position:[x,y],
            style: {
                x:0,y:0,
                width: NODE_TYPES_LENGTH*wsize+padding*5,
                height:hsize+padding*2,
                color:'rgba(255, 0, 0, 0)',
               // shadowBlur:4,
               // shadowColor:'#999'
            },
            hoverable:false
        })
        this.zr.addShape(this.toolbox)
        for(let key in NODE_TYPES){
           this._addToolbarItem(index++,key)
        }
        
        this.zr.render()
    }
    
    

    _addToolbarItem(index,key){
        let _this=this
        let x=0,y=0,padding=8,wsize=NODE_INFO['width'],hsize=NODE_INFO['height']
        let item=NODE_TYPES[key]
        let toolItem=new ImageShape({
                _type:key,            
                position: [10+padding*index+wsize*index, y+padding],
                scale: [1, 1],
                style: {
                    x:0,y:0,
                    image: item['icon'],
                    width: wsize,
                    height:hsize,
                    //  text:key+'节点',
                    //  textPosition:'right'
                },
                draggable: true,
               // clickable:true,
                ondragstart:function(){
                  _this.refs.nodemenu.setState({
                            show:false
                  })
                  _this.status.draggingToolbar=true
                  _this.status.dropToolItem=key
                  toolItem.style=Object.assign(toolItem.style,{
                      opacity:0.5
                     ,width:NODE_INFO['width']
                     ,height:NODE_INFO['height']
                  })
                 // _this.toolbarItems.split(index,1)
                  _this._addToolbarItem(index,key)
                }
                ,ondragend:function(){
                   _this.status.dropToolItem=null
                    _this.zr.delShape(toolItem)
                    _this.zr.refresh()
                    _this.status.draggingToolbar=false
                }
                ,onmouseover:function(e){
                   // console.log("在图标上",e.event.pageX,pageY)
                    _this.setState({
                         toolItemTipX:e.event.pageX-_this.paperLeft+20
                        ,toolItemTipY:e.event.pageY-_this.paperTop+15
                        ,toolItemTipShow:true
                        ,toolItemTipText:NODE_TYPES[e.target._type].title
                    })
                }
                ,onmouseout:function(e){
//console.log("离开了图标",e)
                    _this.setState({
                         toolItemTipShow:false
                        ,toolItemTipText:''
                    })
                }
        })
        this.zr.addShape(toolItem);
        this.toolbarItems[index]=toolItem
        return toolItem;
    }
    
    _initMap(){
        this.house=this.addHouse()
        
        this.people=this.addPeople()
        this.computer=this.addComputer()
        this.zr.render()
    }
    
    deleteNode(delNode){
        if(this.status.activeNode||delNode){
            let node=delNode||this.status.activeNode
            /**
             * 
             *  _sourceArrows:{},
                    _targetArrows:{},
                    _sourceNodes:{},
                    _targetNodes:{},
             */
            
            for(let key in node['_sourceNodes']){
                delete this.nodes[key]['_targetNodes'][node.id]
            }
            for(let key in node['_targetNodes']){
                delete this.nodes[key]['_sourceNodes'][node.id]
            }
            for(let key in node['_sourceArrows']){
                //delete this.arrows[key]
                this.deleteArrow(key)
            }
            for(let key in node['_targetArrows']){
                //delete this.arrows[key]
                this.deleteArrow(key)
            }
            
            this.zr.delShape(node.id)
            this.zr.refresh()
            delete this.nodes[node['id']]
            if(delNode==null){
                this.status.activeNode=null
            }
            this.refs.nodemenu.setState({
                    show:false
            })
        }
    }
    
    createNode(type,x,y){
       return  this.addNode(type,x,y)
        
    }
    
    mouseOverActiveNode(node){
        if(this.status.dragging||this.status.draggingToolbar){
            return
        }
        if(this.status.activeArrow){
            if(this.isAddConnection(node)){
            this.status.arrowTargetNode=node
            node.style.shadowBlur=10
            this.zr.refresh()
            }
            return
        }
        
        this.refs.nodemenu.setState({
            show:true
            ,top:node['position'][1]+node.style.height
            ,left:node['position'][0]
        })
        this.status.activeNode=node
    }
    
    addNode(type,x,y){
             var node=new ImageShape({
                position: [x, y],
                    scale: [1, 1],
                    style: {
                        x: 0,
                        y: 0,
                        image: NODE_TYPES[type]['icon'],
                        width: NODE_INFO['width'],
                        height: NODE_INFO['height'],
                        color:'#9F9F9F',
                        strokeColor:'blue',
                        lineWidth:5,
                        shadowBlur:0
                       ,shadowColor:'yellow'
                       ,text:''
                       ,textColor:'#666'
                       ,textPosition:'bottom'
                       ,textFont:'bold 10px verdana'
                    },
                    draggable: true,
                    hoverable: true,
                    clickable:true,
                    _type:type,
                    _sourceArrows:{},
                    _targetArrows:{},
                    _sourceNodes:{},
                    _targetNodes:{},
                    
                    onclick:function(e){
                       
                    }.bind(this)
                   ,onmouseover:function(){
                       this.mouseOverActiveNode(node)
                   }.bind(this)
                   ,ondragstart:function(){
                        this.refs.nodemenu.setState({
                            show:false
                        })
                        this.status.dragging=true
                   }.bind(this)
                   ,ondragend:function(){
                        this.status.dragging=false
                   }.bind(this)
                   ,onmouseout:function(){
                       if(this.status.activeArrow&&this.status.activeNode.id!==node.id){
                            this.status.arrowTargetNode=null
                            node.style.shadowBlur=0
                            this.zr.refresh()
                            return
                       }
                       /*
                       node.style.shadowBlur=0
                       this.zr.refresh()*/
                       
                   }.bind(this)
                   
                
            })
            this.nodes[node['id']]=node
            this.zr.addShape(node);
            this.zr.render()
            return node
    }
    
    
    isAddConnection(node){
        return this.status.activeNode.id!==node.id&&this.status.activeNode._targetNodes[node.id]!=true
    }
    
    getArrowPath(source,target){
        var x1=source['position'][0],y1=source['position'][1],x2=target['position'][0],y2=target['position'][1]
        var arrowPath=this.arrowPoint({x:x1,y:y1},{x:x2,y:y2},6)
        return  'M '+x2+' '+y2+' L '+arrowPath[1]['x']+' '+arrowPath[1]['y']+' L '+arrowPath[2]['x']+' '+arrowPath[2]['y']+' L '+(x2)+' '+(y2)+' Z'
    }
    
    
    refreshArrowPosition(arrowObj,source,target){
        let x1=source['position'][0],y1=source['position'][1],x2=target['position'][0],y2=target['position'][1]
        let w1=source.style.width ,h1=source.style.height
        let w2=target.style.width ,h2=target.style.height
        
        let xl=x1-x2,yl=y1-y2
        xl=xl>0?xl:-xl
        yl=yl>0?yl:-yl
        
        if(xl>yl){
            if(x1>x2){
                x2+=w2
                y2+=w2/2
                y1+=w1/2
            }else{
                x1+=w1
                y1+=w1/2
                y2+=w2/2
            }   
        }else{
            if(y1>y2){
                y2+=h2
                x2+=h2/2
                x1+=h1/2
            }else{
                y1+=h1
                x1+=h1/2
                x2+=h2/2
            }
        }
       
        let arrowPath=this.arrowPoint({x:x1,y:y1},{x:x2,y:y2},6)
        arrowObj['line'].style=Object.assign(arrowObj['line'].style,{
                xStart : x1,
                yStart : y1,
                xEnd : x2,
                yEnd : y2,
        })
        arrowObj['arrow'].style=Object.assign(arrowObj['arrow'].style,{
                 path :'M '+x2+' '+y2+' L '+arrowPath[1]['x']+' '+arrowPath[1]['y']+' L '+arrowPath[2]['x']+' '+arrowPath[2]['y']+' L '+(x2)+' '+(y2)+' Z'
        }) 
    }
    
    deleteArrow(arrowId){
        /**
             * 
             *  _sourceArrows:{},
                    _targetArrows:{},
                    _sourceNodes:{},
                    _targetNodes:{},
             */
       let arrow=this.arrows[arrowId]
       delete this.nodes[arrow['source']]['_sourceArrows'][arrowId]
       delete this.nodes[arrow['source']]['_targetNodes'][arrow['target']]
       
       delete this.nodes[arrow['target']]['_targetArrows'][arrowId]
       delete this.nodes[arrow['target']]['_sourceNodes'][arrow['source']]
       
       this.zr.delShape(arrow['arrow']['line'])
       this.zr.delShape(arrow['arrow']['arrow'])
       delete this.arrows[arrowId]
       this.zr.refresh()
    }
 
    addArrow(source,target){
        
        let line=new LineShape({
             style : {
                strokeColor :'#9F9F9F',
                lineWidth : 2
            }
        })
        let arrow=new PathShape({
             style : {
                x : 0,
                y : 0,
                color : '#9F9F9F'
            },
            draggable : true
        })
        this.refreshArrowPosition({
            line
           ,arrow
           
        },source,target)
        this.zr.addShape(arrow)
        this.zr.addShape(line)
        return {
            line:line
           ,arrow:arrow
           ,id:line.id+"-"+arrow.id
        }
    }
    
    drawArrowLine(source,target){
        var l=new LineShape({
             style : {
                xStart : source['position'][0],
                yStart : source['position'][1],
                xEnd : target['position'][0],
                yEnd : target['position'][1],
                strokeColor :'red',
                lineWidth : 2
            }
        })
        this.zr.addShape(l)
        return l
    }
    
    
    arrowPoint(leftPoint, rightPoint, radius) {
		var area = Math.atan2(leftPoint.y - rightPoint.y, rightPoint.x - leftPoint.x) * (180 / Math.PI);
		
		var x = rightPoint.x - radius * Math.cos(area * (Math.PI / 180));
		var y = rightPoint.y + radius * Math.sin(area * (Math.PI / 180));
		
		var x1 = x + radius * Math.cos((area + 120) * (Math.PI / 180));
		var y1 = y - radius * Math.sin((area + 120) * (Math.PI / 180));
		var x2 = x + radius * Math.cos((area + 240) * (Math.PI / 180));
		var y2 = y - radius * Math.sin((area + 240) * (Math.PI / 180));
		
		return [rightPoint, {
				x : x1,
				y : y1
			}, {
				x : x2,
				y : y2
			}]
	}
    
    refreshFillStyle(){
        this.setState({
            mapWidth:window.innerWidth  
           ,mapHeight:window.innerHeight-46 
        })
        this.paperTop=this.getTop(this.refs.paper)
        this.paperLeft=this.getLeft(this.refs.paper)
        this.zr&&this.zr.resize()
    }
    
    
}