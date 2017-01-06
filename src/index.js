import React from 'react'
import zrender from 'zrender/src/zrender'
import zrUtil from 'zrender/src/core/util'
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
           ,dataStr:'' //整张图序列化之后的字符串
           ,dataStrValid:true
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

        this.containers= {

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
       
        this.zr.add(this.rootGroup)
       // this.test();
     }

     test(){
        let _t=new Date().getTime()
        let node1=this.addNode('zuzhi',[59,500])
        let node2=this.addNode('zzuzhi',[499,200])
        let node3=this.addNode('zzuzhi',[199,100])



        let arrow1=this.addArrow()

        let arrow2=this.addArrow()

        

        this.addRelation(node1,node2,arrow1)
        this.addRelation(node2,node3,arrow2)
        
        let container1=this.addContainer(0,[100,200])

        this.bindNodeToContainor(container1,node2)
        this.bindNodeToContainor(container1,node3)
     }

     _initEvents(){
         let dStartX,
         dStartY,
         dragTarget;
         let startX 
          ,startY
         window.addEventListener("resize", this.refreshFillStyle.bind(this))

         this.refs.paper.addEventListener("mousedown",(e)=>{
            if(this.status.hoverGroup && this.status.locked == false){
                dragTarget = this.status.hoverGroup
            }else{
                dragTarget = this.rootGroup
            }

            if(this.status.activeArrow){
                 this.connectActiveArrow()
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
                    console.log(dragTarget.position)
                  }else{
                      dragTarget.position = [
                        startX+divi(e.pageX-dStartX,scale),
                        startY+divi(e.pageY-dStartY,scale)
                     ]
                     if(dragTarget['_type'] == 'container'){
                         dragTarget.childAt(1).eachChild((child)=>{
                             this.refreshArrowsByNode(child)
                         })
                     }else{
                         this.refreshArrowsByNode(dragTarget)
                     }
                     

                  }
                  
                dragTarget.dirty(true)
                if(dragTarget.parent&&dragTarget.parent._type == 'containerContent'){
                    this.refreshContainorReact(dragTarget.parent.parent)
                }
               // this.testRootGroupReact()
                this.zr.refresh()
             }else if(this.status.activeArrow){
                 let target = this.status.activeGroup
                 let activeArrowPosition = this.getActiveArrowPosition(e)
                 this.refreshArrow(this.status.activeArrow, activeArrowPosition.start, activeArrowPosition.end)
                 //console.log(this.status.activeArrow)
                 //refreshArrow
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

         this.refs.paper.addEventListener("mousewheel",(e)=>{
             if(e.wheelDelta > 0){
                 this.zoomIn()
             }else if(e.wheelDelta < 0){
                 this.zoomOut()
             }

             e.preventDefault()
         })

    }

    add(node){
        this.rootGroup.add(node)
    }

    refreshFillStyle(){
        let toolbarHeight = this.refs.toolbar?(this.refs.toolbar.offsetHeight):0
        this.setState({
            mapWidth:window.innerWidth
           ,mapHeight:window.innerHeight-toolbarHeight
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
           // position[0] += node.position[0]
           // position[1] += node.position[1]
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
        return this.getOffset(node.offsetParent, offset);//向上累加offset里的值
    }

    getPaperOffset(){
        let toolbarHeight = this.refs.toolbar?(this.refs.toolbar.offsetHeight):0
        let poffset=this.getOffset(this.refs.paper)
        let pleft=poffset.left,ptop=poffset.top - toolbarHeight
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
        let {activeBtn} = this.state
        switch(name){
            case 'zoomin':this.zoomIn();break;
            case 'zoomout':this.zoomOut();break;
            case 'zoomreset':this.zoomReset();break;
            case 'reset':this.resetPage();break;
            case 'json':this.setTxtData();break;
            //case 'pan':this.pan();break;
        }

        if(option.name != activeBtn){
            if(activeBtn == 'json' && this.validJson(this.state.dataStr)){
                this.setData(JSON.parse(this.state.dataStr))
            }

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
        if(!this.state.config['MENU_TYPES']){
            return
        }
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
		switch(index){
			case 'addGroup':
				//创建组相关操作
                this.createContainer(o.type,[left-25,top-25])
			;break
			case 'addNode':
				//创建节点相关操作
				if(e){
                    this.createNode(o.type,[left-25,top-25])
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

    dataStrChangeHandle(e){
        let dataStr = e.target.value
        let {dataStrValid} = this.state
        if(this.validJson(dataStr) == false){
            if(dataStr == ""){
                this.resetPage()
            }else{
             dataStrValid = false
            }
            
        }else{
            dataStrValid = true
        }

        this.setState({
            dataStr,
            dataStrValid
        })

    }

    validJson(jsonStr){
        try{
            JSON.parse(jsonStr)
        }catch(e){
            console.error(e)
            return false
        }
        return true
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
    
    addGroup(opt,parent){
        var group = new Group(Object.assign({
            position: [0, 0],
            style:{}
        },opt));
        if(parent){
            parent.add(group)
        }else{
            this.rootGroup.add(group)
        }
        
        return group
    }

    setGroupZLevel(group,zlevel){
       group.children().map((c,i)=>{
           c.zlevel = zlevel
           c.dirty(0)
       })
       this.zr.refresh()
    }

    addArrow(start={x:0,y:0},end={x:0,y:0},option){
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
        var group = this.addGroup(Object.assign({
            zlevel: -1,
            _type: 'arrow'
        },option))
        group.add(line)
        group.add(path)
        this.arrows[group.id] = group
        this.rootGroup.add(group)
        return group
    }

    refreshArrowsByNode(node){
        let arrows = this.arrows
        let targetId = node.id
        //刷新所有的箭头，性能不好，有待优化
        for(let key in arrows){
            let arrow = arrows[key]
            if((arrow['id']+"").indexOf("_"+targetId+"_") != -1){
                this.refreshArrow(arrow)
            }
        }
    }

    refreshArrow(group,start,end){
        let line =  group.childAt(0)
        let arrow =  group.childAt(1)
        let {scale} = this.status
        let {NODE_INFO} = this.state.config
        let nodeWidth = NODE_INFO['width'],
        nodeHeight = NODE_INFO['height']

        if(start ==null || end == null){
            let ids = group['id'].split("_")
            let startOfset = this.getNodeOffset(this.nodes[ids[1]])
            let endOfset = this.getNodeOffset(this.nodes[ids[2]])
            

            //交点算法，目前只支持圆形
            let xLen = endOfset[0] - startOfset[0]
            let yLen = endOfset[1] - startOfset[1]
            let zLen= Math.sqrt(Math.pow(yLen,2) + Math.pow(xLen,2))

            let xLow = nodeWidth*xLen/zLen/2
            let yLow = nodeHeight*yLen/zLen/2

            start = {
               x : divi( startOfset[0],scale) + NODE_INFO['width']/2 + xLow,
               y :  divi( startOfset[1] ,scale)+NODE_INFO['height']/2 + yLow
            }

            end = {
               x : divi(endOfset[0] ,scale) + NODE_INFO['width']/2 - xLow,
               y : divi(endOfset[1] ,scale) + NODE_INFO['height']/2 - yLow
            }
        }

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

    

    addNode(type,position,option={},parent){
            let {scale} = this.status
            let rootPosition = this.rootGroup.position
            let {NODE_TYPES ,NODE_INFO} = this.state.config
            
            var group = this.addGroup(Object.assign({
                 position:[divi(position[0] - rootPosition[0], scale), divi(position[1] - rootPosition[1], scale)],
                 _type:'node',
                 _nodeType:type,
                 title:option['title']||NODE_TYPES[type]['title'],
                 zlevel:1,
                 onclick:(e)=>{
                   /* group.zlevel = 2
                    
                    group.dirty(true)
                    this.zr.refresh()*/
                    group.zlevel = 11
                 },
                 onmousedown:(e)=>{
                     if(this.status.arrowTargetNode && this.status.arrowTargetNode.id == group.id){
                         //连线时候，当作目标节点，只连线，不设为焦点
                         return this.stopEvent(e)
                     }
                     this.setActiveNode(group)
                     return this.stopEvent(e)
                 },
                 onmouseover:(e)=>{
                     this.status.hoverGroup = group
                     
                     if(this.status.activeArrow){
                         
                         this.setArrowTargetNode(group)
                     }
                     return this.stopEvent(e)
                     
                 },
                 onmouseout:(e)=>{
                     if(this.status.hoverGroup&&(this.status.hoverGroup.id = group.id)){
                         this.status.hoverGroup = null
                     }
                     this.resetArrowTargetNode()
                     return this.stopEvent(e)
                 }
            },option),parent)
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
                },
                draggable: false,
                hoverable: false,
                clickable:false,
                silent: false
        })

        let titleNode = new TextShape({
            style:{
                x: NODE_INFO['width']/2,
                y: NODE_INFO['height']+15,
                text: option.title || NODE_TYPES[type]['title'],
                width: NODE_INFO['width'],
                height: NODE_INFO['height'],
                textAlign:'center',
               
            }
        })
        
        group.add(node);
        group.add(titleNode);
        this.nodes[group['id']] = group
        return group
    }
    
    //设置聚焦节点
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

    //设置连线目标节点
    setArrowTargetNode(node){
        if(node.id != this.status.activeGroup.id){
            node.childAt(0).style.shadowBlur = 10
            node.childAt(0).dirty(true)
            this.status.arrowTargetNode = node
        }
    }

    //清空连线目标节点
    resetArrowTargetNode(){
        if(this.status.arrowTargetNode && this.status.arrowTargetNode.id != this.status.activeGroup.id){
            this.status.arrowTargetNode.childAt(0).style.shadowBlur = 0
            this.status.arrowTargetNode.childAt(0).dirty(true)
            this.status.arrowTargetNode = null
        }
    }

    addContainer(type, position,option={}){
        let {scale} = this.status
        let {GROUP_TYPES} = this.state.config
        let rootPosition = this.rootGroup.position
        let containerGroup = this.addGroup(Object.assign({
            position: [divi(position[0] - rootPosition[0], scale), divi(position[1] - rootPosition[1], scale)],
            zlevel:0,
            _type:'container',
            _containerType:type,
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
        },option))

        let containerRect
        if(GROUP_TYPES[type]['shape'] == 'image'){
            containerRect=new ImageShape({
                    position: [0, 0],
                    _type:"image",
                    style: Object.assign({
                        x:0,
                        y:0,
                        width:200,
                        height:100,
                        image:GROUP_TYPES[type]['image']
                    },GROUP_TYPES[type]['style']),
                    zlevel:0
            })
        }else{
            containerRect = new RectShape({
                shape:{
                    x:0,
                    y:0,
                    width:200,
                    height:100
                },
                style: Object.assign({
                    fill:'rgba(255, 0, 0, 0)',
                    stroke:'red'
                },GROUP_TYPES[type]['style']),
                zlevel:0
            })
            if(GROUP_TYPES[type]['animateTime']){
                containerRect.animate('style', true)
                .when(GROUP_TYPES[type]['animateTime'], GROUP_TYPES[type]['animateOption'])
                .start();
            }
            
        }


        let contentGroup = this.addGroup({
            position: [0,0],
            _type:"containerContent"
        })

        containerGroup.add(containerRect)
        containerGroup.add(contentGroup)
        this.containers[containerGroup.id] = containerGroup
        return containerGroup;
    }

    connectActiveArrow(){
        if(this.status.arrowTargetNode){
            this.addRelation(this.status.activeGroup,this.status.arrowTargetNode,this.status.activeArrow)
            
            this.status.activeArrow = null
            this.setActiveNode(this.status.arrowTargetNode)
            this.resetArrowTargetNode()
        }else{
            this.rootGroup.remove(this.status.activeArrow)
            delete this.arrows[this.status.activeArrow.id]
            this.status.activeArrow = null
        }
    }

    addRelation(startNode,endNode,arrow){
        let newId = "_"+startNode.id+"_"+endNode.id+"_"
        this.arrows[newId] = this.arrows[arrow.id]
        delete this.arrows[arrow.id]
        arrow['id'] = newId
        this.refreshArrow(arrow)
    }

    refreshContainorReact(container){
        let content = container.childAt(1)
        let brect = content.getBoundingRect()
        let rect = container.childAt(0)
        if(rect['_type'] == 'image'){
            rect.style = Object.assign(rect.style, {
                x: brect.x-10,
                y: brect.y-10,
                width: brect.width+20,
                height: brect.height+20
            })
        }else{
            rect.shape =Object.assign(brect,{
                x: brect.x-10,
                y: brect.y-10,
                width: brect.width+20,
                height: brect.height+20
                
            })
        }

        rect.dirty(true)
    }

    bindNodeToContainor(container,node){
        let content = container.childAt(1)
        let {scale} = this.status
        content.add(node)
        let offset = this.getNodeOffset(container)
        node.position=[node.position[0] - offset[0]/scale,node.position[1] - offset[1]/scale]
        this.refreshContainorReact(container)
        //node.position=[node.position[0]-container.position[0],node.position[1]-container.position[1]]
        //node.dirty(true)
        //this.zr.refresh()
        // 
    }

    unbindNodeToContainor(){
        
    }

    toImage(){

    }

    getData(){
        let nodes = this.nodes,
        arrows = this.arrows,
        containers = this.containers

        let data={
            position:this.rootGroup.position,
            scale:this.rootGroup.scale
        }

        let nodesData = {}, arrowsData = {}, containersData = {}
        for(let key in nodes){
            let node = nodes[key]
            nodesData[key] = {
                id: node['id'],
                position: node['position'],
                title: node['title'],
                _pid:node.parent['_type'] == "containerContent"?node.parent.parent.id:parent.id,
                _nodeType:node['_nodeType'],
                _data: node['_data']
            }
        }

        for(let key in arrows){
            let arrow = arrows[key]
            arrowsData[key] = {
                id: arrow['id'],
                _data: arrow['_data']
            }
        }

        for(let key in containers){
            let containor = containers[key]
            containersData[key] = {
                id: containor.id,
                position: containor.position,
                _containerType: containor['_containerType'],
                _data: containor['_data']
            }
        }

        data['nodes'] = nodesData
        data['arrows'] = arrowsData
        data['containers'] = containersData
        
        return data;

    }

    setData(data){
        const {position, scale, containers, nodes, arrows} = data
        this.resetPage({}, ()=>{
            for(let key in containers){
                let container =  containers[key]
            // console.log(container)
                this.addContainer(container['_containerType'], container.position,{
                    id:container.id,
                    _data:container['_data']
                })
            }

            for(let key in nodes){
                let node = nodes[key]
                let container = this.containers[node['_pid']]
                this.addNode(node['_nodeType'],node['position'],{
                    title:node['title'],
                    id:node['id'],
                    _data:node['_data']
                },container&&container.childAt(1))
                
            }

            for(let key in this.containers){
                
                this.refreshContainorReact(this.containers[key])
            }

            for(let key in arrows){
                let arrow = arrows[key]
                let ids = arrow.id.split('_')
                let startNode = this.nodes[ids[1]],
                endNode = this.nodes[ids[2]]

                let arrowGroup = this.addArrow({
                    x: startNode.position[0],
                    y: startNode.position[1]
                },{
                    x: endNode.position[0],
                    y: endNode.position[1]
                },{
                    id:arrow['id'],
                    _data:arrow['_data']
                })

                this.refreshArrow(arrowGroup)
            }
    
            this.rootGroup.position = position
            this.rootGroup.scale = scale || [1,1]
            this.status.scale = scale[0]
        })
    }


    //######################所有工具栏点击操作################################
    //工具栏，清空页面
    resetPage(option={},callback){
        this.zr.clear()
        this.nodes= {}
        this.arrows= {}
        this.containers= {}

        this.status={
            hoverGroup: null,
            maxIndex: 99,
            minIndex: 1,
            scale:1,
            maxScale:5,
            minScale:0.2,
            locked:false
        }

        this.setState({
           // config:this.props.config
           //,checkBtn:""
           //,keyword:"" //搜索关键字
            searchIndex:0
           ,dataStr:'' //整张图序列化之后的字符串
           ,dataStrValid:true
        },()=>{
            this._initRootGroup()
            callback&&callback()
        })
        
    }

    _initRootGroup(option={}){
        this.rootGroup = new Group(Object.assign({
            position: [0,0]
           ,id: new Date().getTime()
           ,_type: 'rootGroup' 
        }))
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
       /* if(this.status.activeGroup){
            this.lookupNode(this.status.activeGroup)
        }*/
    }

    //设置搜索关键字
    setKeyWord(e){
        this.setState({
            keyword:e.target.value,
            searchIndex:0
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
            if(node['title'] && node['title'].indexOf(keyword) != -1&&(this.status.activeGroup == null || this.status.activeGroup.id != node.id)){
                this.setActiveNode(node)
                this.setState({
                    searchIndex:index
                })
                this.lookupNode(node)
                break;
            }
        }

        if(this.getMapLength(nodes) == index){
            this.setState({
                    searchIndex:0
            })
        }
    }

    lookupNode(node){
        let offset = this.getNodeOffset(node)
        let rootPosition = this.rootGroup.position
        const {mapWidth, mapHeight} = this.state
        const {scale} = this.status
        let xMove = sub(divi(mapWidth, 2), add(offset[0] + rootPosition[0], node.childAt(0).style.width*scale)),
        yMove = sub(divi(mapHeight, 2), add(offset[1] + rootPosition[1], node.childAt(0).style.height*scale))

        this.rootGroup.position = [ add(this.rootGroup.position[0], xMove), add(this.rootGroup.position[1], yMove)]
        this.rootGroup.dirty(true)
    }

    //工具栏，搜索文本框回车搜索
    enterSearch(e){
        if(e.keyCode == 13){//按下了enter键
            this.searchNode()
        }
    }


    //工具栏，显示json
    setTxtData(){
        let data = this.getData()
        this.setState({
            dataStr: JSON.stringify(data, null, 10),
            dataStrValid:true
        })
    }

    //######################所有右键菜单操作################################
    //右键菜单栏，创建节点操作
    createNode(type, position){
        let node = this.addNode(type, position)
        let {activeGroup} = this.status
        if(activeGroup && activeGroup['_type'] == 'container'){
            this.bindNodeToContainor(activeGroup, node)
        }
    }

    //创建组操作
    createContainer(type, position){
        let group = this.addContainer(type, position)
        let {activeGroup} = this.status
        if(activeGroup && activeGroup['_type'] == 'container'){
            this.bindNodeToContainor(activeGroup, group)
        }
    }

    //右键菜单 连接
    addActiveArrow(e){
        let arrowPosition = this.getActiveArrowPosition(e)
        this.status.activeArrow = this.addArrow(arrowPosition.start, arrowPosition.end)
        return this.status.activeArrow
    }

    getActiveArrowPosition(e){
        let {NODE_INFO} = this.state.config
        let activeGroup = this.status.activeGroup
        
        let paperOffset = this.getOffset(this.refs.paper)
        let rootPosition = this.rootGroup.position

        let startPosition = this.getNodeOffset(activeGroup)
        let endPosition = [e.clientX - paperOffset.left - rootPosition[0], e.clientY - paperOffset.top - rootPosition[1]]

        let scale = this.status.scale

        return {
            start:{
                x: divi(startPosition[0], scale) + NODE_INFO['width']/2,
                y: divi(startPosition[1], scale) + NODE_INFO['height']/2
            },
            end:{
                x: divi(endPosition[0], scale) + (endPosition[0]>startPosition[0]?-5:5),
                y: divi(endPosition[1], scale) + (endPosition[1]>startPosition[1]?-5:5),
            }
        }
    }

}