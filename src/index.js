import React from 'react'
import zrender from 'zrender/src/zrender'
import Group from 'zrender/src/container/Group'
import PathShape from 'zrender/src/graphic/Path'
import LineShape from 'zrender/src/graphic/shape/Line'
import RectShape from 'zrender/src/graphic/shape/Rect'
import ImageShape from 'zrender/src/graphic/Image'
import TextShape from 'zrender/src/graphic/Text'
import event from 'zrender/src/core/event'

import {add, sub, multi, divi} from './math'
import tplRender from './jsx/index.js'
import pathTool from 'zrender/src/tool/path'


export default class FlowMap extends React.Component{
    
    constructor(props){
        super(props)
        
        this.state={
            mapWidth:1000
           ,mapHeight:1000
        //   ,nodeMenuHandle:this.nodeMenuHandle
           
           ,config:this.props.config
           ,checkBtn:""
           ,keyword:"" //搜索关键字
           ,searchIndex:0
        }

        this.status={
            /*activeNode:null
           ,arrowTargetNode:null
           ,activeArrow:null
           ,dragging:false*/
           hoverGroup: null,
           maxIndex: 99,
           minIndex: 1,
           scale:1,
           maxScale:5,
           minScale:0.2,
           locked:false

        }

        this.rootGroup = null

        this.nodes= {
            
        }

        this.arrows= {
            
        }

        this.containors= {

        }
    }
    
    componentDidMount() {
		
        this._initPaper()
        this. _initEvents()
      //this._initRootGroup()
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

    

     _initPaper(){
        let _this=this
        this.zr = zrender.init(this.refs.paper)
        this.rootGroup = new Group({
            position:[0,0],
            _type:"rootGroup"
             
        })
      /* 
        this.rootRect=new RectShape({
            style:{
                 fill:null,
                 stroke:"red"
            },
            shape:{
                x:100,
                y:100,
                width:100,
                height:100
            }
        })*/
        /*
        this.zr.add(this.rootRect)
        */
        this.zr.add(this.rootGroup)
        this.test();
     }

     test(){
        let a=this.addArrow({x:110,y:40},{x:200,y:300})
        let node1=this.addNode('zuzhi',299,200)
        let node2=this.addNode('zzuzhi',499,200)
        let node3=this.addNode('zzuzhi',199,100)
        
        let container1=this.addContainer(0,100,200)

        this.bindNodeToContainor(container1,node2)
       // this.bindNodeToContainor(container1,node1)
        this.bindNodeToContainor(container1,a)
        
     }

     _initEvents(){
         let dStartX,
         dStartY,
         dragTarget;
         let startX 
          ,startY
         window.addEventListener("resize", this.refreshFillStyle.bind(this))
         document.body.addEventListener("click",()=>{
             console.log("click")
         })
         document.body.addEventListener("mousedown",(e)=>{
            if(this.status.hoverGroup && this.status.locked == false){
                dragTarget = this.status.hoverGroup
            }else{
                dragTarget = this.rootGroup
               // this.status.activeGroup = this.rootGroup
            }

            dStartX = e.pageX
            dStartY = e.pageY
            startX = dragTarget['position'][0]
            startY = dragTarget['position'][1]
         })
         document.body.addEventListener("mouseup",()=>{
             if(dragTarget){
                 dragTarget = null
             }
         })
         document.body.addEventListener("mousemove",(e)=>{
             if(dragTarget){
                  let {scale} = this.status
                  if( dragTarget['_type'] == 'rootGroup' ){
                      dragTarget.position = [
                        startX+e.pageX-dStartX,
                        startY+e.pageY-dStartY
                    ]
                  }else{
                      dragTarget.position = [
                        startX+divi(e.pageX-dStartX,scale),
                        startY+divi(e.pageY-dStartY,scale)
                    ]
                  }
                  
                dragTarget.dirty(true)
                if(dragTarget.parent&&dragTarget.parent._type == 'containerContent'){
                    this.refreshContainorReact(dragTarget.parent.parent)
                }
               // this.testRootGroupReact()
                this.zr.refresh()
             }
         })

         document.body.addEventListener("mouseleave",()=>{
             if(dragTarget){
                 dragTarget = null
             }
         })

         this.zr.on("mousedown",()=>{
             this.setActiveNode(this.rootGroup)
         })

         this.refs.flowmap.addEventListener("mousewheel",(e)=>{
             if(e.wheelDelta > 0){
                 this.zoomIn()
             }else if(e.wheelDelta < 0){
                 this.zoomOut()
             }

             e.preventDefault()
         })

     }
    /* 
     testRootGroupReact(){
         let rootRect = this.rootRect
         let brect =this.rootGroup.getBoundingRect()
         rootRect.shape =Object.assign(this.rootGroup.getBoundingRect(),{
             x:this.rootGroup.position[0]+brect.x,
             y:this.rootGroup.position[1]+brect.y
         })
         rootRect.dirty(true)
         console.log(this.rootGroup.getBoundingRect())
     }
    */
    add(node){
        this.rootGroup.add(node)
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

    getNodeOffset(node,position) {
        if(!position){
            position = [0, 0]
        }
        
        

        if(node['_type'] == 'rootGroup'){
            position[0] += node.position[0]
            position[1] += node.position[1]
            return position
        }else{
            position[0] += node.position[0]*this.status.scale
            position[1] += node.position[1]*this.status.scale
        }

        return this.getNodeOffset(node.parent,position)
    }

    //公共方法
    getOffset(node, offset) {
        if (!offset) {
            offset = {};
            offset.top = 0;
            offset.left = 0;
        }
        if (node == document.body) {//当该节点为body节点时，结束递归
            return offset;
        }
        offset.top += node.offsetTop;
        offset.left += node.offsetLeft;
        return this.getOffset(node.parentNode, offset);//向上累加offset里的值
    }

    getPaperOffset(){
        let poffset=this.getOffset(this.refs.paper)
        let pleft=poffset.left,ptop=poffset.top-36
        return {
            pleft,ptop
        }
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

    stopEvent(e){
        e.returnValue = false;
        e.cancelBubble = true;
        //e.event.preventDefault();
        //e.event.stopPropagation();
        return e
    }

    getMapLength(map){
        let index = 0
        for(let key in map){
            index++
        }
        return index
    }

    clickToolbarBtnHandle(option){
        let name = option.name
        switch(name){
            case 'zoomin':this.zoomIn();break;
            case 'zoomout':this.zoomOut();break;
            case 'zoomreset':this.zoomReset();break;
            case 'reset':this.resetPage();break;
            //case 'pan':this.pan();break;
        }

        if(option.checkBtn){
            if(option.name == 'pan'){
                this.status.locked = true
            }else{
                this.status.locked = false
            }

            this.setState({
                activeBtn:option.name
            })
        }
    }
    
    selectToolbarBtnHandle(key){
        const {activeBtn}=this.refs.toolbar.state
        switch(key){
            case 'default':
                if(activeBtn==key){
                    return
                }else{
                    this.enableDrag()
                }
            ;break;
            default:
                this.disableDrag()
            ;break;
        }
    }

    onFlowMapClickHandle(){
    	this.refs.rightmenu.hideMenu()
    }

    rightMenuHandle(e,event){
    	e.preventDefault()
        if(this.status.locked){
            return
        }

        
        let {pleft,ptop} = this.getPaperOffset()
    	const paper = this.refs.paper,rightmenu = this.refs.rightmenu.refs.rightmenu
    	let left = e.clientX,
        top = e.clientY
    	if(left>paper.offsetWidth+paper.offsetLeft-rightmenu.offsetWidth){
    		left = paper.offsetWidth+paper.offsetLeft-rightmenu.offsetWidth
    		
    	}
    	if(top>paper.offsetHeight+paper.offsetTop-rightmenu.offsetHeight){
    		top = paper.offsetHeight+paper.offsetTop-rightmenu.offsetHeight
    	}
    	this.refs.rightmenu.showMenu({
    		left:left-pleft+window.scrollX
    	   ,top:top-ptop+window.scrollY
           ,target:(this.status.hoverGroup&&this.status.hoverGroup._type)||"rootGroup"
    	})
    }


    rightMenuClickHandle(index,o,e){
        const {left,top} = this.refs.rightmenu.state
        console.log(index)
		switch(index){
			case 'addGroup':
				//创建组相关操作
                this.createContainer(o.type,left-25,top-25)
			;break
			case 'addNode':
				//创建节点相关操作
				if(e){
					this.createNode(o.type,left-25,top-25)
				}
			;break;
            case 'addArrow':
                this.addActiveArrow(o)
            ;break;
            case 'reset':
                this.resetPage()
            ;break;
            case 'zoomin':
                this.zoomIn()
            ;break;
            case 'zoomout':
                this.zoomOut()
            ;break;
            case 'zoomreset':
                this.zoomReset()
            ;break;
			default:;
		}

		this.zr.handler._lastDownButton = null //右键菜单已经被重写了，防止源码里面对右键的锁定措施
	}

    clearPaper(){
        this.zr.clear()
        
        this.status = {
            activeNode:null
           ,arrowTargetNode:null
           ,activeArrow:null
           ,dragging:false
        }
        this.nodes={
            
        }
        this.arrows={
            
        }
    }
    
    addGroup(opt){
        var group = new Group(Object.assign({
            position: [0, 0],
            style:{}
        },opt));
        this.rootGroup.add(group)
        return group
    }

    setGroupZLevel(group,zlevel){
       group.children().map((c,i)=>{
           c.zlevel = zlevel
           c.dirty(0)
       })
       this.zr.refresh()
    }

    addArrow(start,end){
        let line = new LineShape({
                shape: {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y
                },
                style:{
                   // text:123321,
                    //textRotation:0.5
                }
        });
        let arrowPath=this.getArrowPath(start,end,6)
        let path = pathTool.createFromString(arrowPath)
        var group = this.addGroup()
        group.add(line)
        group.add(path)
        this.arrows[group.id] = group
        return group
    }

    refreshArrow(group,start,end){
        let line =  group.childAt(0)
        let arrow =  group.childAt(1)

        line.shape = Object.assign(line.shape,{
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
        })

        let arrowPath = this.getArrowPath(start, end, 6)
        let path = pathTool.createFromString(arrowPath)
        arrow['buildPath'] = path['buildPath']
        arrow.dirty(true)
        line.dirty(true)
        this.zr.refresh()
    }

    getArrowPath(leftPoint, rightPoint, radius) {
        var area = Math.atan2(leftPoint.y - rightPoint.y, rightPoint.x - leftPoint.x) * (180 / Math.PI);
        var x = rightPoint.x - radius * Math.cos(area * (Math.PI / 180)),
        y = rightPoint.y + radius * Math.sin(area * (Math.PI / 180));
        
        var x1 = x + radius * Math.cos((area + 120) * (Math.PI / 180)),
            y1 = y - radius * Math.sin((area + 120) * (Math.PI / 180)),
            x2 = x + radius * Math.cos((area + 240) * (Math.PI / 180)),
            y2 = y - radius * Math.sin((area + 240) * (Math.PI / 180));
        return 'M '+rightPoint.x+' '+rightPoint.y+' L '+x1+' '+y1+' L '+x2+' '+y2+' L '+(rightPoint.x2)+' '+(rightPoint.y2)+' Z'
    }


    addNode(type,x,y){
            let {NODE_TYPES ,NODE_INFO} = this.state.config
            var group = this.addGroup({
                 position:[x,y],
                 _type:'node',
                 _title:NODE_TYPES[type]['title'],
                 onclick:(e)=>{
                   /* group.zlevel = 2
                    
                    group.dirty(true)
                    this.zr.refresh()*/
                    group.zlevel = 11
                   // console.log(group)
                 },
                 onmousedown:(e)=>{
                     this.setActiveNode(group)
                     return this.stopEvent(e)
                 },
                 onmouseover:(e)=>{
                     this.status.hoverGroup = group
                     
                     return this.stopEvent(e)
                     
                 },
                 onmouseout:(e)=>{
                     if(this.status.hoverGroup&&(this.status.hoverGroup.id = group.id)){
                         this.status.hoverGroup = null
                     }
                     return this.stopEvent(e)
                 }
            })
            var node=new ImageShape({
                position: [0, 0],
                scale: [1, 1],
                style: {
                    x: 0,
                    y: 0,
                    image: NODE_TYPES[type]['icon'],
                    width: NODE_INFO['width'],
                    height: NODE_INFO['height'],
                    color: '#9F9F9F',
                    strokeColor: 'blue',
                    lineWidth: 5,
                    shadowBlur: 0,
                    shadowColor:'yellow'
                  //  ,text: NODE_TYPES[type]['title']
                  //  ,textColor:'#666'
                  //  ,textPosition:'bottom'
                  //  ,textFont:'bold 10px verdana'
                },
                draggable: false,
                hoverable: false,
                clickable:false,
                silent: false,
                
               /* _sourceArrows:{},
                _targetArrows:{},
                _sourceNodes:{},
                _targetNodes:{},*/
        })

        let titleNode = new TextShape({
            style:{
                x: NODE_INFO['width']/2,
                y: NODE_INFO['height']+15,
                text: NODE_TYPES[type]['title'],
                width: NODE_INFO['width'],
                height: NODE_INFO['height'],
                textAlign:'center',
               
            }
        })
        
        group.add(node);
        group.add(titleNode);
        this.nodes[group['id']] = group
        // this.rootGroup.addChild(node)
        //this.setActiveNode(node)
        return group
    }

    setActiveNode(node){
        let {activeGroup, minIndex, maxIndex} = this.status
        
        
        if(activeGroup&&activeGroup['_type'] == 'node' ){
            activeGroup.childAt(0).style.shadowBlur = 0
            this.setGroupZLevel(activeGroup, minIndex)
        }
           
        
        if(node['_type'] == 'node' ){
            node.childAt(0).style.shadowBlur = 10
            this.setGroupZLevel(node, maxIndex)
        }

        this.status.hoverGroup = node
        this.status.activeGroup = node
        
    }

    addContainer(type, x = 0, y = 0){
        let containerGroup = this.addGroup({
            position: [x,y],
            zlevel:0,
            _type:'container',
            onmousedown:(e)=>{
               this.setActiveNode(containerGroup)
               return this.stopEvent(e)
            },
            onmouseover:(e)=>{
                this.status.hoverGroup = containerGroup
            },
            onmouseout:(e)=>{
                if(this.status.hoverGroup&&(this.status.hoverGroup.id = containerGroup.id)){
                    this.status.hoverGroup = null
                }
            }
        })

        let containerRect = new RectShape({
            shape:{
                x:0,
                y:0,
                width:200,
                height:100
            },
            style:{
                fill:'rgba(255, 0, 0, 0)',
                stroke:'red'
            },
            zlevel:0
        })

        let contentGroup = this.addGroup({
            position: [0,0],
            _type:"containerContent"
        })

        containerGroup.add(containerRect)
        containerGroup.add(contentGroup)
        this.containors[containerGroup.id] = containerGroup
        return containerGroup;
    }

    refreshContainorReact(container){
        let content = container.childAt(1)
        let brect = content.getBoundingRect()
        let rect = container.childAt(0)

        rect.shape =Object.assign(brect,{
            x: brect.x-10,
            y: brect.y-10,
            width: brect.width+20,
            height: brect.height+20
            
         })
         rect.dirty(true)
        //console.log(brect)
         //this.zr.refresh()
    }

    bindNodeToContainor(container,node){
        let content = container.childAt(1)
        content.add(node)
        node.position=[node.position[0]-container.position[0],node.position[1]-container.position[1]]
        this.refreshContainorReact(container)
        //node.position=[node.position[0]-container.position[0],node.position[1]-container.position[1]]
        //node.dirty(true)
        //this.zr.refresh()
        // 
    }

    unbindNodeToContainor(){
        
    }

    //######################所有工具栏点击操作################################
    //工具栏，清空页面
    resetPage(){
        this.zr.clear()
        this.nodes= {}
        this.arrows= {}
        this.containors= {}
        this.rootGroup = new Group({
            position:[0,0]
        })
        this.zr.add(this.rootGroup)
    }

    //比例操作
    zoom(scale){
        let {maxScale,minScale} = this.status
        if(scale < minScale || scale > maxScale){
            return
        }
        this.rootGroup.scale = [scale, scale]
        this.rootGroup.dirty(true)
        this.status.scale = scale
        //this.rootGroup.refresh()
    }
    //工具栏，放大
    zoomIn(){
        let scale = add(this.status.scale, 0.05)
        this.zoom(scale)
    }

    //工具栏，缩小
    zoomOut(){
        let scale = sub(this.status.scale, 0.05)
        this.zoom(scale)
    }

    //工具栏，正常大小
    zoomReset(){
        let scale=this.status.scale = 1
        this.zoom(scale)
        if(this.status.activeGroup){
            this.lookupNode(this.status.activeGroup)
        }
    }

    //设置搜索关键字
    setKeyWord(e){
        this.setState({
            keyword:e.target.value
        })
    }


    //工具栏，搜索节点
    searchNode(){
        let nodes = this.nodes
        let {keyword,searchIndex} = this.state
        let index = 0
        if(keyword == ''){
           return
        }

        for(let key in nodes){
            if(index++ < searchIndex){
                continue
            }
            let node = nodes[key]
            if(node['_title'] && node['_title'].indexOf(keyword) != -1&&(this.status.activeGroup == null || this.status.activeGroup.id != node.id)){
                this.setActiveNode(node)
                this.setState({
                    searchIndex:index
                })
                this.lookupNode(node)
                break;
            }
        }

        if(this.getMapLength(nodes) == searchIndex+1){
            this.setState({
                    searchIndex:0
            })
        }
    }

    lookupNode(node){
        let offset=this.getNodeOffset(node)
        const {mapWidth, mapHeight} = this.state
        const {scale} = this.status
        let xMove = sub(divi(mapWidth, 2), add(offset[0], node.childAt(0).style.width*scale)),
        yMove = sub(divi(mapHeight, 2), add(offset[1], node.childAt(0).style.height*scale))

        this.rootGroup.position = [ add(this.rootGroup.position[0], xMove), add(this.rootGroup.position[1], yMove)]
        this.rootGroup.dirty(true)
    }

    //工具栏，搜索文本框回车搜索
    enterSearch(e){
        if(e.keyCode == 13){//按下了enter键
            this.searchNode()
        }
    }

    //######################所有右键菜单操作################################
    //右键菜单栏，创建节点操作
    createNode(type, x, y){
        let node = this.addNode(type, x, y)
        let {activeGroup} = this.status
        if(activeGroup && activeGroup['_type'] == 'container'){
            this.bindNodeToContainor(activeGroup, node)
        }
    }

    //创建组操作
    createContainer(type, x, y){
        let group = this.addContainer(type, x, y)
        let {activeGroup} = this.status
        if(activeGroup && activeGroup['_type'] == 'container'){
            this.bindNodeToContainor(activeGroup, group)
        }
    }

}