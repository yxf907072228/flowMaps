import zrender from 'zrender/lib/zrender'
import zrUtil from 'zrender/lib/core/util'
import Group from 'zrender/lib/container/Group'
import PathShape from 'zrender/lib/graphic/Path'
import pathTool from 'zrender/lib/tool/path'
import LineShape from 'zrender/lib/graphic/shape/Line'
import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'
import RectShape from 'zrender/lib/graphic/shape/Rect'
import ImageShape from 'zrender/lib/graphic/Image'
import TextShape from 'zrender/lib/graphic/Text'
import event from 'zrender/lib/core/event'

import * as mapConfig from './FLOW_MAP_DATA'
import { add, sub, multi, divi } from './math'
import RadialGradient from 'zrender/lib/graphic/RadialGradient'
import LinearGradient from  'zrender/lib/graphic/LinearGradient'
import { getCurvePath } from './fucks/coordinates'
//import tplRender from './jsx/index.js'

import './styles/flowMap.less'
import { contain } from 'zrender/lib/contain/path';

import fuck from './fucks'



export default class FlowMap {

    constructor(props) {
        //super(props)
        this.state = {
              mapWidth: 1000
            , mapHeight: 1000
            //   ,nodeMenuHandle:this.nodeMenuHandle

            , config: mapConfig
            , checkBtn: ""
            , keyword: "" //搜索关键字
            , searchIndex: 0
            , dataStr: '' //整张图序列化之后的字符串
            , dataStrValid: true
        }



        this.status = {
            /*activeNode:null
           ,arrowTargetNode:null
           ,activeArrow:null
           ,dragging:false*/
            hoverGroup: null,
            maxIndex: 99,
            minIndex: 1,
            scale: 1,
            maxScale: 5,
            minScale: 0.2,
            locked: false
        }

        let { ARROW_TYPES } = mapConfig

        let arrayMap = {}

        ARROW_TYPES.map((item)=>{
            arrayMap[item.key] = item
        })

        this.rootGroup = null

        this.arrayMap = arrayMap

        this.nodes = {

        }

        this.arrows = {

        }

        this.containers = {

        }

        this._data = {

        }
    }

    componentDidMount() {
        this._initPaper()
        this._initEvents()

        this.paperTop = this.getTop(this.paper)
        this.paperLeft = this.getLeft(this.paper)
       /*  setTimeout(function () {
            this.refreshFillStyle()
        }.bind(this), 100) */
    }

    render(paper, config) {
        this.paper = paper

        this.componentDidMount()
    }

    setState() {
        console.log('setState', arguments)
    }



    _initPaper() {
        let _this = this
        this.zr = zrender.init(this.paper)
        this.rootGroup = new Group({
            position: [0, 0]
        })

        this.data(this.rootGroup, {
            type: "rootGroup"
        })

        this.zr.add(this.rootGroup)
       
    }
 

    _initEvents() {
        let dStartX,
            dStartY,
            dragTarget;
        let startX
            ,startY
            ,cStartX = 0
            ,cStartY = 0

        window.addEventListener("resize", () =>{
            this.zr.resize()
        })

        this.paper.addEventListener("mousedown", (e) => {
            if (this.status.hoverGroup && this.status.locked == false) {
                dragTarget = this.status.hoverGroup
            } else {
                dragTarget = this.rootGroup
            }

            if (this.status.activeArrow) {
                this.connectActiveArrow()
            }

            if (dragTarget.parent && this.data(dragTarget.parent)['type'] == 'containerContent') {
                let container =  dragTarget.parent.parent
                cStartX = container.position[0]
                cStartY = container.position[1]
                this.resetContainerContent(container)
            }
            dStartX = e.pageX
            dStartY = e.pageY
            startX = dragTarget['position'][0]
            startY = dragTarget['position'][1]
        })


        document.body.addEventListener("mousemove", (e) => {
            if (dragTarget) {
                let { scale } = this.status
                let toLeft = divi(e.pageX - dStartX, scale),toTop = divi(e.pageY - dStartY, scale)
                if (this.data(dragTarget)['type'] == 'rootGroup') {
                    dragTarget.position = [
                        startX + e.pageX - dStartX,
                        startY + e.pageY - dStartY
                    ]
                } else {
                    dragTarget.position = [
                        startX + toLeft ,
                        startY + toTop
                    ]
                    if (this.data(dragTarget)['type'] == 'container') {
                        this.refreshArrowsByNode(dragTarget)
                        dragTarget.childAt(1).eachChild((child) => {
                            this.refreshArrowsByNode(child)
                        })
                    } else {
                        this.refreshArrowsByNode(dragTarget)
                    }


                }

                dragTarget.dirty(true)
                if (dragTarget.parent && this.data(dragTarget.parent)['type'] == 'containerContent') {
                   let container = dragTarget.parent.parent
                  /*  let left = cStartX+toLeft,top=cStartY+toTop;
                   if(toLeft>0){
                    left = cStartX
                   }
                   if(toTop){
                    top = cStartY
                   } */
                    this.refreshContainerReact(container,cStartX,cStartY)
                    this.refreshArrowsByNode(container)
                }
                // this.testRootGroupReact()
                this.zr.refresh()
            } else if (this.status.activeArrow) {
                let target = this.status.activeGroup
                let activeArrowPosition = this.getActiveArrowPosition(e)
                this.refreshArrow(this.status.activeArrow, activeArrowPosition.start, activeArrowPosition.end)
                //console.log(this.status.activeArrow)
                //refreshArrow
            }
        })

        document.body.addEventListener("mouseup", () => {
      
            if (dragTarget) {
               if (dragTarget.parent && this.data(dragTarget.parent)['type'] == 'containerContent') {
            
                    let container = dragTarget.parent.parent
                    this.resetContainerContent(container)
                    
                }
                this.onDragEnd(dragTarget)
                dragTarget = null
            }
        })

        document.body.addEventListener("mouseleave", () => {
            if (dragTarget) {
                this.onDragEnd(dragTarget)
                dragTarget = null
            }
        })

        this.zr.on("mousedown", () => {


            this.setActiveNode(this.rootGroup)
        })

        this.paper.addEventListener("mousewheel", (e) => {
            if (e.wheelDelta > 0) {
                this.zoomIn()
            } else if (e.wheelDelta < 0) {
                this.zoomOut()
            }

            e.preventDefault()
        })

    }

    add(node) {
        this.rootGroup.add(node)
    }

    refreshFillStyle(s=1,option={}) {
     
       /*  let rootGroup = this.rootGroup
        let { offsetHeight:ph, offsetWidth:pw } = this.paper
        let scale = this.status.scale * s
        let {x,y,width,height} = rootGroup.getBoundingRect()
 
        if(width/height>pw/ph){
            //width/pw
            scale/=width/pw
            this.rootGroup.position =[(pw-width*scale)/2 -x*scale,(ph-height*scale)/2-y*scale]
           // this.rootGroup.position =[, 0-y]
            this.rootGroup.dirty(true)
        }else{
            //height/ph
            scale/=height/ph
            this.rootGroup.position =[(pw-width*scale)/2 -x*scale+(option.left?option.left:0),(ph-height*scale )/2-y*scale+(option.top?option.top:0)]
           // this.rootGroup.position =  [0-x, (ph-height*scale-y) / 2]
            this.rootGroup.dirty(true)
        }
        this.zoom(scale) */
    }

    getNodeOffset(node, position) {
        if (!position) {
            position = [0, 0]
        }

        if (this.data(node)['type'] == 'rootGroup') {
            // position[0] += node.position[0]
            // position[1] += node.position[1]
            return position
        } else {
            position[0] += node.position[0] * this.status.scale
            position[1] += node.position[1] * this.status.scale
        }

        return this.getNodeOffset(node.parent, position)
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

    getPaperOffset() {
        let toolbarHeight = this.refs.toolbar ? (this.refs.toolbar.offsetHeight) : 0
        let poffset = this.getOffset(this.paper)
        let pleft = poffset.left, ptop = poffset.top - toolbarHeight
        return {
            pleft, ptop
        }
    }

    //获取元素的纵坐标 
    getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
    }

    //获取元素的横坐标 
    getLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
        return offset;
    }

    stopEvent(e) {
        e.returnValue = false;
        e.cancelBubble = true;
        return e
    }

    //获取对象长度
    getMapLength(map) {
        return Object.keys(map).length
    }

    //获取所有跟节点有关联的箭头的id
    findArrowIdsByNode(node) {
        let { id } = node
        let reg = new RegExp("[^\|]*" + id + "[^\|]*", "ig"),
            keysStr = Object.keys(this.arrows).join("|")
        return keysStr.match(reg) || []
    }
    texsst(){
        this.fuck(this.findNodeByName('1'),this.findNodeByName('2'))
        this.fuck(this.findNodeByName('1'),this.findNodeByName('2'),{
            radian:150,
            speed:300
        })
        this.fuck(this.findNodeByName('1'),this.findNodeByName('2'),{
            radian:200,
            speed:350
        })
        this.fuck(this.findNodeByName('1'),this.findNodeByName('2'),{
            radian:250,
            speed:500
        })
        
        this.fuck(this.fineNodeByName('1'),this.fineNodeByName('3'),{
            radian:150,
            speed:500
        })
        
        
        console.log(this.fineNodeByName('111'))
        return;
    }

    fuck(startNode,endNode,option={}){
        if(!(startNode&&endNode)){
            return
        }
        let {NODE_TYPES} = this.state.config
        let { scale } = this.status
        let startOfset = this.getNodeOffset(startNode)
        let endOfset = this.getNodeOffset(endNode)
        let startArrowOffset = startNode.nodeType&&NODE_TYPES[startNode.nodeType].arrowOffset||[0,0]
        , endArrowOffset = endNode.nodeType&&NODE_TYPES[endNode.nodeType].arrowOffset||[0,0];
        
        let { width: startWidth, height: startHeight } = startNode.getBoundingRect()
        let { width: endWidth, height: endHeight } = endNode.getBoundingRect()
        let start,end;
        if( startArrowOffset[0] ||  startArrowOffset[1]){
            start = {
                x: divi(startOfset[0], scale) +startArrowOffset[0],
                y: divi(startOfset[1], scale) +startArrowOffset[1]
            }
        }else{
            start = {
                x: divi(startOfset[0], scale) + startWidth / 2,
                y: divi(startOfset[1], scale) + startHeight / 2
            }
        }

        if( endArrowOffset[0] ||  endArrowOffset[1]){
            end = {
                x: divi(endOfset[0], scale)  + endArrowOffset[0],
                y: divi(endOfset[1], scale)  + endArrowOffset[1]
            }
        }else{
            end = {
                x: divi(endOfset[0], scale) + endWidth / 2 ,
                y: divi(endOfset[1], scale) + endHeight / 2
            }
        }
        
        return fuck(this,start,end,Object.assign({type:'star'},option))


/* 
        let len1=option.radian || 100
        let len2 = len1+30
        let xlen = end.x-start.x, ylen=end.y-start.y;
        let clen = Math.sqrt(xlen*xlen+ylen*ylen);
        let speed = option.speed || 800

        let cpx1 = start.x+xlen/2+len1/clen*ylen,
        cpy1 = start.y+ylen/2-len1/clen*xlen;

        let cpx2 = start.x+xlen/2+len2/clen*ylen,
        cpy2 = start.y+ylen/2-len2/clen*xlen;
        
        let fcolor = option.color || 'rgba(228,46,78)';
        let line1 = new BezierCurveShape({
            zlevel:1,
            shape:{
                x1:start.x,
                y1:start.y,
                x2:end.x,
                y2:end.y,
                cpx1,
                cpy1,
                percent:0
            },
            style:{
                stroke:new RadialGradient(0.3 ,0.3, 1, [
                    {
                        offset: 0,
                        color: fcolor
                    },
                    {
                        offset: 0.2,
                        color: fcolor.replace(")",",0.7)")
                    },
                    {
                        offset: 0.3,
                        color: fcolor.replace(")",",0.4)")
                    },
                    {
                        offset: 1,
                        color: fcolor.replace(")",",0)")
                    }
                ]),
                lineWidth:4,
                shadowBlur:4,
                shadowColor:option.color || option.shadowColor ||'yellow',
                opacity:1
            }
        })

       // p.style.fill = 'red'
       // p.dirty(true)
        this.rootGroup.add(line1)
        
      
        //this.rootGroup.add(line2)
     

     line1.animate('shape', false,'quadraticIn')
     .when(speed,{
         percent: 1
     }).done(()=>{
         line1.shape= {
                 x2:start.x,
                 y2:start.y,
                 x1:end.x,
                 y1:end.y,
                 cpx1,
                 cpy1,
                 percent: 1
         }
 
         line1.dirty(true)
         line1.animate('shape', false,'quadraticOut')
         .when(speed,{
             percent: 0
         }).done(()=>{
            this.rootGroup.remove(line1)
         })
         .start();
     })
     .start(); */
    }

    test(){
       
        let node1 = this.findNodeByName('单位一')
        let node2 = this.findNodeByName('单位二')
        let start=[100,100],end=[500,500]
        let points = getCurvePath(start,end,0.4)

        function getLinearColor(index){
            index/=100
            let start = index-0.6
            let end = index
            if(end>1){
                end=1
            }
           // console.log(start,end)
            start = start<0?0:start
            var colorList = [
                {
                    offset: 0,
                    color: 'rgba(56,222,56,0)'
                },{
                    offset: start,
                    color: 'rgba(56,222,56,0)'
                },
                {
                    offset: end,
                    color: 'rgba(56,222,56,1)'
                },
                {
                    offset: end,
                    color: 'rgba(56,222,56,0)'
                }
            ];
            var linearGradient = new LinearGradient(0,0,1,1, colorList,false);
            return linearGradient;
           
           // return `rgba(56,222,56,${index})`
        }
        

        let node =  new RectShape({
            zlevel:10,
            shape: {
                x: 0,
                y: 0,
                width:10,
                height: 10
            },
            style: Object.assign({
                fill: 'blue',
                stroke: 'red'
            })
        })
       
       /*var cp = [
            ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * 0.5,
            ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * 0.5
        ];*/
        let line =  pathTool.createFromString(points.map((p,i)=>{
            if(i==0){
                return `M${p.x} ${p.y}`
            }else{
                return `L${p.x} ${p.y}`
            }
        }).join(' '))
        
        line.style.fill = 'transparent'
        line.style.stroke = 'orange'
        line.style.lineWidth = 5
      
        this.rootGroup.add(line)
        console.log(line) 

        this.rootGroup.add(node)

       /*  let _index= 0
        let t=window.setInterval(()=>{
            let p = points[_index++]
            node.shape.x = p.x - 5
            node.shape.y = p.y - 5
            node.dirty()
            if(_index==100){
                window.clearInterval(t)
            }
        },20) */

       /* setTimeout(()=>{
        for(let i =0;i<points.length;i++){
            window.requestAnimationFrame(()=>{
                let p = points[i]
                node.shape.x = p.x - 5
                node.shape.y = p.y - 5
                node.dirty()
            })
        }
       },3000) */
        /* window.requestAnimationFrame(()=>{
            console.log('ani')
            if(_index<100){
                let p = points[_index++]
                node.shape.x = p.x - 5
                node.shape.y = p.y - 5
                node.dirty()
               
            }
        }) */
        let animObj = node.animate('shape', false)
      
        points.map((p,index)=>{
            animObj.when(2000*index, {
             x:index,
             y:index,
            })
        })
       // console.log(animObj,'animObj')
      //  animObj.start()
       console.log(animObj)
        
       /*  let animObjL = line.animate('style', false)
        points.map((p,index)=>{
            animObjL.when(20*index, {
             //   stroke:getLinearColor(index)
            })
        })
        animObjL.start() */
        
        let _i = 0
       /*  window.setInterval(()=>{
            line.style.stroke = getLinearColor(_i++)
            line.dirty()
        },1000) */
       // animObjL.start() 
        //this.fuck(node1,node2, {speed:500})
    }

    clickToolbarBtnHandle(option) {
        let name = option.name
        let { activeBtn } = this.state
        switch (name) {
            case 'zoomin': this.zoomIn(); break;
            case 'zoomout': this.zoomOut(); break;
            case 'zoomreset': this.zoomReset(); break;
            case 'reset': this.test(); break;
            case 'json': this.setTxtData(option); break;
            case 'print': this.texsst()
            //case 'pan':this.pan();break;
        }

        if (option.name != activeBtn) {
            if (activeBtn == 'json' && this.validJson(this.state.dataStr)) {
                this.deserialization(JSON.parse(this.state.dataStr))
            }

            if (option.name == 'pan') {
                this.status.locked = true
            } else {
                this.status.locked = false
            }

            this.setState({
                activeBtn: option.name
            })
        }
    }

    selectToolbarBtnHandle(key) {
        const { activeBtn } = this.refs.toolbar.state
        switch (key) {
            case 'default':
                if (activeBtn == key) {
                    return
                } else {
                    this.enableDrag()
                }
                ; break;
            default:
                this.disableDrag()
                    ; break;
        }
    }

    onFlowMapClickHandle() {
        this.refs.rightmenu.hideMenu()
    }

    rightMenuHandle(e, event) {

        e.preventDefault()
        if (!this.state.config['MENU_TYPES']) {
            return
        }
        if (this.status.locked) {
            return
        }


        let { pleft, ptop } = this.getPaperOffset()
        const paper = this.paper, rightmenu = this.refs.rightmenu.refs.rightmenu
        let left = e.clientX,
            top = e.clientY
        if (left > paper.offsetWidth + paper.offsetLeft - rightmenu.offsetWidth) {
            left = paper.offsetWidth + paper.offsetLeft - rightmenu.offsetWidth

        }
        if (top > paper.offsetHeight + paper.offsetTop - rightmenu.offsetHeight) {
            top = paper.offsetHeight + paper.offsetTop - rightmenu.offsetHeight
        }
        this.refs.rightmenu.showMenu({
            left: left - pleft + window.scrollX
            , top: top - ptop + window.scrollY
            , target: (this.status.hoverGroup && this.data(this.status.hoverGroup)['type']) || "rootGroup"
        })
    }


    rightMenuClickHandle(index, o, e) {
        const { left, top, type } = o
        switch (index) {
            case 'addGroup':
                //创建组相关操作
                this.createContainer(type, [left - 25, top - 25])
                    ; break
            case 'addNode':
                //创建节点相关操作
                if (e) {
                    this.createNode(type, [left - 25, top - 25])
                }
                ; break;
            case 'addArrow':
                this.addActiveArrow(o)
                    ; break;
            case 'reset':
                this.resetPage()
                    ; break;
            case 'zoomin':
                this.zoomIn()
                    ; break;
            case 'zoomout':
                this.zoomOut()
                    ; break;
            case 'zoomreset':
                this.zoomReset()
                    ; break;
            case 'delete':
                this.deleteHandle()
                    ; break;
            case 'rename':
                this.renameHandle(e)
                    ; break;
            default: ;

        }

        this.zr.handler._lastDownButton = null //右键菜单已经被重写了，防止源码里面对右键的锁定措施
    }

    dataStrChangeHandle(e) {
        let dataStr = e.target.value
        let { dataStrValid } = this.state
        if (this.validJson(dataStr) == false) {
            if (dataStr == "") {
                this.resetPage()
            } else {
                dataStrValid = false
            }

        } else {
            dataStrValid = true
        }

        this.setState({
            dataStr,
            dataStrValid
        })

    }

    validJson(jsonStr) {
        try {
            JSON.parse(jsonStr)
        } catch (e) {
            console.error(e)
            return false
        }
        return true
    }

    addGroup(opt, parent) {
        var group = new Group(Object.assign({
            position: [0, 0],
            style: {}
        }, opt));
        if (parent) {
            parent.add(group)
        } else {
            this.rootGroup.add(group)
        }

        return group
    }

    setGroupZLevel(group, zlevel) {
        group.zlevel = zlevel
        /* group.children().map((c, i) => {
            c.zlevel = zlevel
            c.dirty(0)
        }) */
        this.zr.refresh()
    }

    addArrow(start = { x: 0, y: 0 }, end = { x: 0, y: 0 }, option={}) {
       // let { ARROW_INFO } = this.state.config
       
        if(this.arrayMap[option.arrowType].render){
            return this.arrayMap[option.arrowType].render(start, end, option, this)
        }

        var group ,line, arrow;
        var isArrow = this.arrayMap[option.arrowType].arrow?true:false
        var color =  this.arrayMap[option.arrowType].color || '#666'
       // var arrowOffset = this.arrayMap[option.arrowType].arrowOffset || [0,0]
        if(option.type=="group" && option.arrowType){
            group = option
            line = group.childAt(0)
            line.dirty(true)
            if(isArrow){
                arrow = group.childAt(1)
                arrow.dirty(true)
            }
            
        }else{
            let zlevel=1
            group = this.addGroup(Object.assign({
                zlevel,
            //    type: 'arrow',
                arrowType: option.arrowType || 'normal'
            }, option))
            /* 
            this.data(group, {
                type: 'arrow',
                arrowType: option.arrowType || 'normal'
            }) */

            //bessel
            line = new (['unbessel','bessel'].indexOf(option.arrowType)!=-1?BezierCurveShape:LineShape)({
                zlevel,
                shape: {

                },
                style: {
                    // text:123321,
                    //textRotation:0.5
                  //  lineDash: [2, 2],
                  //  [ARROW_INFO.color && 'stroke']: ARROW_INFO.color
                  stroke:color
                }
            });
           /*  line.animate('style', true)
            .when(300,{
                lineDashOffset: -4
            }) 
            .start();*/
            //let arrowPath = this.getArrowPath(start, end, 6)
            group.add(line)
            if(isArrow){
                let path = pathTool.createFromString("")
                
                path.style.fill = color
                
                arrow = path
                
                group.add(path)
            }
            
        }
        
        if(option.arrowType=='bessel' || option.arrowType=='unbessel'){
            var un = option.arrowType=='unbessel'?true:false
            let len=100
            let xlen = end.x-start.x, ylen=end.y-start.y;
            let clen = Math.sqrt(xlen*xlen+ylen*ylen);
            line.shape = Object.assign(line.shape, {
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y,
                cpx1:start.x+xlen/2+len/clen*ylen*(un?-1:1),
                cpy1:start.y+ylen/2-len/clen*xlen*(un?-1:1)
            })

        }else{
            line.shape = Object.assign(line.shape, {
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y
            })
        }
        
        if(isArrow){
            let arrowPath = this.getArrowPath(start, end, 6)
            let path = pathTool.createFromString(arrowPath)
            arrow['buildPath'] = path['buildPath']
        }

        this.arrows[group.id] = group
        this.rootGroup.add(group)
        return group
    }

    refreshArrowsByNode(node) {
        let arrows = this.arrows
        let targetId = node.id

        let arrowIds = this.findArrowIdsByNode(node)
        arrowIds.map((id, index) => {
            this.refreshArrow(arrows[id])
        })
    }

    refreshArrow(group, start, end) {
        if (start == null || end == null) {
            let ids = group['id'].split("_")
            let startNode = ids[1].length == 4 ? this.containers[ids[1]] : this.nodes[ids[1]]
            let endNode = ids[2].length == 4 ? this.containers[ids[2]] : this.nodes[ids[2]]
            let arrowResult;
            
            if(group.arrowType=='vertical'){
                arrowResult = this.refreshVerticalArrow(startNode, endNode)
            }else{
                arrowResult = this.refreshNormalArrow(startNode, endNode)
            }
            
            start = arrowResult.start;
            end = arrowResult.end;
        }
        
        this.addArrow(start, end, group)

        this.zr.refresh()
    }
    
    //普通直线交点算法
    refreshNormalArrow(startNode, endNode) {
        let { scale } = this.status
        let {NODE_TYPES} = this.state.config
        let startOfset = this.getNodeOffset(startNode)
        let endOfset = this.getNodeOffset(endNode)

        let { width: startWidth, height: startHeight } = startNode.getBoundingRect()
        let { width: endWidth, height: endHeight } = endNode.getBoundingRect()
        
        let startArrowCenter =startNode.nodeType&&  NODE_TYPES[startNode.nodeType].arrowCenter
        ,endArrowCenter = endNode.nodeType&&NODE_TYPES[endNode.nodeType].arrowCenter
        let startArrowOffset = startNode.nodeType&&NODE_TYPES[startNode.nodeType].arrowOffset||[0,0]
        , endArrowOffset = endNode.nodeType&&NODE_TYPES[endNode.nodeType].arrowOffset||[0,0]
        let xLen = endOfset[0] - startOfset[0]
        let yLen = endOfset[1] - startOfset[1]
        let zLen = Math.sqrt(Math.pow(yLen, 2) + Math.pow(xLen, 2))

        let xLowStart = 0
        let yLowStart = 0

        let xLowEnd = 0
        let yLowEnd = 0
        if (Math.abs(xLen) > Math.abs(yLen)) {
            xLowStart = startWidth / 2
            xLowEnd = endWidth / 2

        } else if (Math.abs(xLen) < Math.abs(yLen)) {
            yLowStart = startHeight / 2
            yLowEnd = endHeight / 2
        } else {
            xLowStart = startWidth / 2
            xLowStart = startWidth / 2

            xLowStart = startWidth / 2
            yLowEnd = endHeight / 2
        }

        if (xLen < 0) {
            xLowStart *= -1
            xLowEnd *= -1
        }

        if (yLen < 0) {
            yLowStart *= -1
            yLowEnd *= -1
        }

        let start = {
            x: divi(startOfset[0], scale) + startWidth / 2 + xLowStart,
            y: divi(startOfset[1], scale) + startHeight / 2 + yLowStart
        }

        let end = {
            x: divi(endOfset[0], scale) + endWidth / 2 - xLowEnd,
            y: divi(endOfset[1], scale) + endHeight / 2 - yLowEnd
        }

        if(startArrowCenter){
            start = {
                x: divi(startOfset[0], scale) + startWidth / 2 ,
                y: divi(startOfset[1], scale) + startHeight / 2
            }
        }

        if(endArrowCenter){
            end = {
                x: divi(endOfset[0], scale) + endWidth / 2,
                y: divi(endOfset[1], scale) + endHeight / 2
            }
        }

        if( startArrowOffset[0] ||  startArrowOffset[1]){
            start = {
                x: divi(startOfset[0], scale) + startArrowOffset[0],
                y: divi(startOfset[1], scale) + startArrowOffset[1]
            }
        }

        if( endArrowOffset[0] ||endArrowOffset[1]){
            end = {
                x: divi(endOfset[0], scale) + endArrowOffset[0],
                y: divi(endOfset[1], scale) + endArrowOffset[1] 
            }
        }

        return {
            start,
            end
        }
    }

    //垂直线交点算法
    refreshVerticalArrow(startNode, endNode) {
        let { scale } = this.status
        let {NODE_TYPES} = this.state.config
        
  
        let { width: startWidth, height: startHeight } = startNode.getBoundingRect()
        let { width: endWidth, height: endHeight } = endNode.getBoundingRect()
        console.log(endWidth,endHeight )
        endHeight=1
        let startOfset = this.getNodeOffset(startNode)
        let endOfset = this.getNodeOffset(endNode)
        
        
        let startArrowCenter =startNode.nodeType&&  NODE_TYPES[startNode.nodeType].arrowCenter,endArrowCenter = endNode.nodeType&&NODE_TYPES[endNode.nodeType].arrowCenter
        let startArrowOffset = startNode.nodeType&&NODE_TYPES[startNode.nodeType].arrowOffset||[0,0], endArrowOffset = endNode.nodeType&&NODE_TYPES[endNode.nodeType].arrowOffset||[0,0]
        let xLen = endOfset[0] - startOfset[0]
        let yLen = endOfset[1] - startOfset[1]
        let zLen = Math.sqrt(Math.pow(yLen, 2) + Math.pow(xLen, 2))

        let xLowStart = 0
        let yLowStart = 0

        let xLowEnd = 0
        let yLowEnd = 0
        let start,end
       
      /*   startOfset[0] = divi(startOfset[0], scale)
        startOfset[1] = divi(startOfset[1], scale)
        endOfset[0] = divi(endOfset[0], scale)
        endOfset[1] = divi(endOfset[1], scale) */
        if(startOfset[1]+startHeight/2>=endOfset[1] && startOfset[1]<=endOfset[1]+endHeight-startHeight/2){//左右两边
            if(startOfset[0]+startWidth/2<endOfset[0]+endWidth/2){ //左边
                if(startOfset[0]+startWidth/2>endOfset[0]){ //在左边内部
                    start = {
                        x:divi(startOfset[0], scale),
                        y:divi(startOfset[1], scale) + startHeight/2
                    }
                }else{
                    start = {
                        x:divi(startOfset[0], scale) + startWidth,
                        y:divi(startOfset[1], scale) + startHeight/2
                    }
                }
                
                end = {
                    x:divi(endOfset[0], scale),
                    y:start.y
                }
            }else{
                if(startOfset[0]+startWidth/2<endOfset[0]+endWidth){//在右边内部
                    start = {
                        x:divi(startOfset[0], scale)+startWidth,
                        y:divi(startOfset[1], scale) + startHeight/2
                    }
                }else{
                    start = {
                        x:divi(startOfset[0], scale),
                        y:divi(startOfset[1], scale) + startHeight/2
                    }
                }
                
                end = {
                    x:divi(endOfset[0], scale) + endWidth,
                    y:start.y
                }
            }
            

            
        }else if(startOfset[0]+startWidth/2>=endOfset[0] && startOfset[0]<=endOfset[0]+endWidth-startWidth/2){//上下两边
            if(startOfset[1]<endOfset[1]+endHeight/2){ //上边
                start = {
                    x:divi(startOfset[0], scale) + startWidth/2,
                    y:divi(startOfset[1], scale) + startHeight
                }
                end = {
                    x:start.x,
                    y:divi(endOfset[1], scale)
                }
            }else{//
                start = {
                    x: divi(startOfset[0], scale) + startWidth/2,
                    y: divi(startOfset[1], scale)
                }
                end = {
                    x:start.x,
                    y:divi(endOfset[1], scale) + endHeight
                }
            }
        }else{
            start = {
                x: divi(startOfset[0], scale),
                y: divi(startOfset[1], scale)
            }
            end = {
                x:divi(endOfset[0], scale),
                y:divi(endOfset[1], scale)
            }
            if(startOfset[1]<endOfset[1]+endHeight/2){
                start.y +=startHeight

            }else{
                end.y +=endHeight
            }

            if(startOfset[0]<endOfset[0]+endWidth/2){
                start.x +=startWidth
            }else{
                end.x +=endWidth
            }
            
        }
        /* if (Math.abs(xLen) > Math.abs(yLen)) {
            xLowStart = startWidth / 2
            xLowEnd = endWidth / 2

        } else if (Math.abs(xLen) < Math.abs(yLen)) {
            yLowStart = startHeight / 2
            yLowEnd = endHeight / 2
        } else {
            xLowStart = startWidth / 2
            xLowEnd = endWidth / 2

            yLowStart = startHeight / 2
            yLowEnd = endHeight / 2
        }

        if (xLen < 0) {
            xLowStart *= -1
            xLowEnd *= -1
        }

        if (yLen > 0) {
           
            yLowEnd *= -1
        }else{
            yLowStart *= -1
        }

        let start = {
            x: divi(startOfset[0], scale) + startWidth / 2 + xLowStart,
            y: divi(startOfset[1], scale) + startHeight / 2 + yLowStart
        }

        let end = {
            x: divi(endOfset[0], scale) + endWidth / 2 - xLowEnd,
            y: divi(endOfset[1], scale) + endHeight / 2 + yLowEnd
        }

        if (Math.abs(xLen) > Math.abs(yLen)) {
            end.y =start.y
        } else {
            end.x=start.x
        }

        if(end.x<endOfset[0]){
            end.x=endOfset[0]
        }
        if(end.x>endOfset[0]+endWidth){
            end.x = endOfset[0]+endWidth
        }

        if(end.y<endOfset[1]){
            end.y=endOfset[1]
        }
        if(end.y>endOfset[1]+endHeight){
            end.y = endOfset[1]+endHeight
        }
 */
        if(startArrowCenter){
            start = {
                x: divi(startOfset[0], scale) + startWidth / 2 + startArrowOffset[0],
                y: divi(startOfset[1], scale) + startHeight / 2  + startArrowOffset[1]
            }
        }
        if(endArrowCenter){
            end = {
                x: divi(endOfset[0], scale) + endWidth / 2 + endArrowOffset[0],
                y: divi(endOfset[1], scale) + endHeight / 2 + endArrowOffset[0] 
            }
        }

        return {
            start,
            end
        }
    }

    getArrowPath(leftPoint, rightPoint, radius) {
        var area = Math.atan2(leftPoint.y - rightPoint.y, rightPoint.x - leftPoint.x) * (180 / Math.PI);
        var x = rightPoint.x - radius * Math.cos(area * (Math.PI / 180)),
            y = rightPoint.y + radius * Math.sin(area * (Math.PI / 180));

        var x1 = x + radius * Math.cos((area + 120) * (Math.PI / 180)),
            y1 = y - radius * Math.sin((area + 120) * (Math.PI / 180)),
            x2 = x + radius * Math.cos((area + 240) * (Math.PI / 180)),
            y2 = y - radius * Math.sin((area + 240) * (Math.PI / 180));
        return 'M ' + rightPoint.x + ' ' + rightPoint.y + ' L ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' L ' + (rightPoint.x2) + ' ' + (rightPoint.y2) + ' Z'
    }

    findNodesLikeName(name){
        let nodes = []
        let data = this._data
        let keys = Object.keys(data)
        for(let i =0,len=keys.length;i<len;i++){
            let title = data[keys[i]].title || ''
            if(title.indexOf(name) != -1){
                nodes.push(this.nodes[keys[i]])
               // break; 
            }
        }
        return nodes
    }

    findNodeByName(name){
        let node = false
        let data = this._data
        let keys = Object.keys(data)
        for(let i =0,len=keys.length;i<len;i++){
            if(data[keys[i]].title === name){
                node = this.nodes[keys[i]]
                break; 
            }
        }
        return node
    }




    //设置聚焦节点
    setActiveNode(node) {
        if(this.status.locked){
            return 
        }
        let { activeGroup, minIndex, maxIndex } = this.status
        if (activeGroup && this.data(activeGroup)['type'] == 'node' && activeGroup.id!=node.id) {
            activeGroup.childAt(0).style.shadowBlur = 0
           // this.setGroupZLevel(activeGroup, activeGroup._zlevel ||  minIndex)
         //   delete node._zlevel
        }


        if (this.data(node)['type'] == 'node' && (activeGroup&&activeGroup.id)!=node.id ) {
            
           // node._zlevel = node.zlevel
            node.childAt(0).style.shadowBlur = 10
          //  this.setGroupZLevel(node, maxIndex)
        }

        this.status.hoverGroup = node
        this.status.activeGroup = node
    }

    //设置连线目标节点
    setArrowTargetNode(node) {
        if (node.id != this.status.activeGroup.id) {
            node.childAt(0).style.shadowBlur = 10
            node.childAt(0).dirty(true)
            this.status.arrowTargetNode = node
        }
    }

    //清空连线目标节点
    resetArrowTargetNode() {
        if (this.status.arrowTargetNode && this.status.arrowTargetNode.id != this.status.activeGroup.id) {
            this.status.arrowTargetNode.childAt(0).style.shadowBlur = 0
            this.status.arrowTargetNode.childAt(0).dirty(true)
            this.status.arrowTargetNode = null
        }
    }

    addNode(type, position, option = {}, parent) {
        let { scale } = this.status
        let rootPosition = this.rootGroup.position
        let { NODE_TYPES, NODE_INFO } = this.state.config
        let zlevel = NODE_TYPES[type].zlevel || 2
        var group = this.addGroup(Object.assign({
            id: option.id || new Date().getTime(),
            position: [divi(position[0] - rootPosition[0], scale), divi(position[1] - rootPosition[1], scale)],
            zlevel,
            onclick: (e) => {
               // group.zlevel = 11
            },
            onmousedown: (e) => {
                if (this.status.arrowTargetNode && this.status.arrowTargetNode.id == group.id) {
                    //连线时候，当作目标节点，只连线，不设为焦点
                    return this.stopEvent(e)
                }
                this.setActiveNode(group)
                return this.stopEvent(e)
            },
            onmouseover: (e) => {
                this.status.hoverGroup = group

                if (this.status.activeArrow) {

                    this.setArrowTargetNode(group)
                }
                if(this.onMouseOver){
                    this.onMouseOver(option, e)
                }
                return this.stopEvent(e)

            },
            onmouseout: (e) => {
                if (this.status.hoverGroup && (this.status.hoverGroup.id = group.id)) {
                    this.status.hoverGroup = null
                }
                this.resetArrowTargetNode()
                if(this.onMouseOut){
                    this.onMouseOut(option, e)
                }
                return this.stopEvent(e)
            }
        }, option), parent)

        let nodeData = this.data(group, Object.assign({}, option, {
            type: 'node',
            nodeType: type,
            title: option['title'] != null ? option['title'] : NODE_TYPES[type]['title'],
        }))
        if(NODE_TYPES[type].render){
            NODE_TYPES[type].render.call(this, group,NODE_TYPES[type],nodeData)
        }else{
            let nodeWidth =NODE_TYPES[type]['width'] || NODE_INFO['width'], nodeHeight=NODE_TYPES[type]['height'] || NODE_INFO['height']
            var node = new ImageShape({
                zlevel,
                position: [0, 0],
                scale: [1, 1],
                style: {
                    x: 0,
                    y: 0,
                    image: option.icon || NODE_TYPES[type]['icon'],
                    width: nodeWidth,
                    height: nodeHeight,
                    color: '#9F9F9F',
                    strokeColor: 'blue',
                    lineWidth: 5,
                    shadowBlur: 0,
                    shadowColor: 'yellow'
                },
                draggable: false,
                hoverable: false,
                clickable: false,
                silent: false
            })
    
            let titleNode = new TextShape({
                zlevel,
                style: {
                    x: nodeWidth / 2,
                    y: nodeHeight + 15,
                    text: nodeData['title'],
                    textAlign: 'center',
                    textFill: NODE_INFO['color'] || '#fff'
                }
            })
    
            group.add(node);
            group.add(titleNode);
        }
        
        this.nodes[group['id']] = group
        return group
    }

    addContainer(type, position, option = {}) {
        let { scale } = this.status
        let { GROUP_TYPES } = this.state.config
        let {titleAlign, titleBgColor}  = GROUP_TYPES[type]
        let rootPosition = this.rootGroup.position
        let containerGroup = this.addGroup(Object.assign({
            position: [divi(position[0] - rootPosition[0], scale), divi(position[1] - rootPosition[1], scale)],
            zlevel: 0,
            onmousedown: (e) => {
                if (this.status.arrowTargetNode && this.status.arrowTargetNode.id == containerGroup.id) {
                    //连线时候，当作目标节点，只连线，不设为焦点
                    return this.stopEvent(e)
                }
                this.setActiveNode(containerGroup)
                return this.stopEvent(e)
            },
            onmouseover: (e) => {
                this.status.hoverGroup = containerGroup
                if (this.status.activeArrow) {
                    this.setArrowTargetNode(containerGroup)
                }
                if(this.onMouseOver){
                    this.onMouseOver(option, e)
                }
                return this.stopEvent(e)
            },
            onmouseout: (e) => {
                if (this.status.hoverGroup && (this.status.hoverGroup.id = containerGroup.id)) {
                    this.status.hoverGroup = null
                }
                this.resetArrowTargetNode()
                if(this.onMouseOut){
                    this.onMouseOut(option, e)
                }
                return this.stopEvent(e)
            }
        }, option))

        let containerData = this.data(containerGroup, Object.assign(option, {
            type: 'container',
            containerType: type,
            title: option.title != null ? option.title : GROUP_TYPES[type]['title']
        }))

        let containerRect
        if (GROUP_TYPES[type]['shape'] == 'image') {
            containerRect = new ImageShape({
                id: containerGroup.id + "_r",
                position: [0, 0],
                style: Object.assign({
                    x: 0,
                    y: 0,
                    width: GROUP_TYPES[type]['width'],
                    height: GROUP_TYPES[type]['height'],
                    image: GROUP_TYPES[type]['image']
                }, GROUP_TYPES[type]['style']),
                zlevel: 0
            })

            this.data(containerRect, {
                type: "image"
            })

        } else {
            containerRect = new RectShape({
                id: containerGroup.id + "_r",
                shape: {
                    x: 0,
                    y: 0,
                    width: GROUP_TYPES[type]['width'],
                    height: GROUP_TYPES[type]['height']
                },
                style: Object.assign({
                    fill: 'rgba(255, 0, 0, 0)',
                    stroke: 'red'
                }, GROUP_TYPES[type]['style']),
                zlevel: 0
            })
            if (GROUP_TYPES[type]['animateTime']) {
                containerRect.animate('style', true)
                    .when(GROUP_TYPES[type]['animateTime'], GROUP_TYPES[type]['animateOption'])
                    .start();
            }

        }


        let contentGroup = this.addGroup({
            id: containerGroup.id + "_c",
            position: [0, 0]
        })

        this.data(contentGroup, {
            type: "containerContent"
        })

        let titleContainer = new TextShape({
            style: {
                x: GROUP_TYPES[type]['width'] / 2,
                y: titleAlign=='top'?10:(GROUP_TYPES[type]['height'] - 22), //
                text: option.title,
                textAlign: 'center',
                font: 'bolder 14px sans-serif',
                textFill: 'white',
                textRect: {
                    x: 0,
                    y: 0,
                    width: 300,
                    height: 200

                }
            }
        })

        let titleBk =  new RectShape({
          
            shape: {
                x: 0,
                y:  titleAlign=='top'?0:(GROUP_TYPES[type]['height'] - 30),  //
                width: GROUP_TYPES[type]['width'],
                height: 30
            },
            style: Object.assign({
                fill: titleBgColor || '#185069',
                //stroke: 'red'
            }),
            zlevel: -1
        })

        containerGroup.add(containerRect)
        containerGroup.add(contentGroup)
        containerGroup.add(titleContainer)
        containerGroup.add(titleBk)
        this.containers[containerGroup.id] = containerGroup
        return containerGroup;
    }

    connectActiveArrow() {
        if (this.status.arrowTargetNode) {
            this.clearData(this.status.activeArrow)
            this.addRelation(this.status.activeGroup, this.status.arrowTargetNode, this.status.activeArrow)
            this.status.activeArrow = null
            // this.setActiveNode(this.status.arrowTargetNode)
            this.resetArrowTargetNode()

        } else {
            this.clearData(this.status.activeArrow)
            this.rootGroup.remove(this.status.activeArrow)
            delete this.arrows[this.status.activeArrow.id]
            this.status.activeArrow = null
        }
    }

    addRelation(startNode, endNode, arrow) {
        let newId = "_" + startNode.id + "_" + endNode.id + "_"
        this.arrows[newId] = this.arrows[arrow.id]
        delete this.arrows[arrow.id]
        arrow['id'] = newId
        this.refreshArrow(arrow)
    }

    //拖拽节点 容器布局使用的方法，有待优化
    resetContainerContent(container){
        let content = container.childAt(1)
        //   container.position[0]+=content.position[0]
        //   container.position[1] +=content.position[1]
        content.children().map((c)=>{
            c.position[0] +=content.position[0]
            c.position[1] +=content.position[1]
            c.dirty(true)
        })
        content.position=[0,0]
        content.dirty(true)
    }

    refreshContainerReact(container,cleft=false,cright=false) {
        let { GROUP_TYPES } = this.state.config
        let {titleAlign, titleBgColor}  = GROUP_TYPES[this.data(container).containerType]
        let rect = container.childAt(0),
            content = container.childAt(1),
            title = container.childAt(2),
            titleBk =  container.childAt(3);
        //空的容器，不作处理，保持默认形状
        if (content.children().length == 0) {
            return
        }
 
        let brect = content.getBoundingRect()
       
        /* let testshape= new RectShape({
            shape:brect,
            style:{
                stroke:'red',
                fill:'transparent'
            }
        })
        container.add(testshape)  */
        //return 
        let rx = brect.x - 40 ,
            ry = brect.y - 40  ,
            rwidth = brect.width + 80,
            rheight = brect.height + 80

        if(cleft!==false && cright!==false){
            rx = rx + cleft
            ry = ry + cright
        }
        container.position = [rx,ry]
        container.dirty(true)

        content.position[0] = -brect.x +40
        content.position[1] = -brect.y + 40
        content.dirty(true)

        if (this.data(rect)['type'] == 'image') {
            rect.style = Object.assign(rect.style, {
                x: 0,
                y: 0,
                width: rwidth,
                height: rheight
            })
        } else {
            rect.shape = Object.assign(brect, {
                x: 0,
                y: 0,
                width: rwidth,
                height: rheight
            })
        }

        title.style.x =rwidth / 2
        title.style.y = (titleAlign=='top'?10:(rheight -22)) //ry + 

        titleBk.shape.x = 0
        titleBk.shape.y =  (titleAlign=='top'?0:(rheight -30))
        titleBk.shape.width = rwidth
        
      //  title.dirty(true)
        titleBk.dirty(true)
        rect.dirty(true)
    }

    bindNodeToContainer(container, node) {
        let content = container.childAt(1)
        let { scale } = this.status
        content.add(node)
        let offset = this.getNodeOffset(container)
        node.position = [node.position[0] - offset[0] / scale, node.position[1] - offset[1] / scale]
        this.refreshContainerReact(container,container.position[0],container.position[1])
        //node.position=[node.position[0]-container.position[0],node.position[1]-container.position[1]]
        //node.dirty(true)
        //this.zr.refresh()
        // 
    }

    unbindNodeToContainer() {

    }

    toImage() {

    }

    data(node, map) {
        let data = this._data,
            id = node['id'] || node

        if (!data[id]) {
            data[id] = {}
        }

        if (map) {
            data[id] = Object.assign({}, data[id], map)
        }

        return data[id]
    }

    clearData(node) {
        let data = this._data,
            id = node['id'] || node

        delete data[id]
    }

    //序列化
    serialize() {
        let nodes = this.nodes,
            arrows = this.arrows,
            containers = this.containers

        let data = {
            position: this.rootGroup.position,
            scale: this.rootGroup.scale
        }

        let nodesData = {}, arrowsData = {}, containersData = {}
        for (let key in nodes) {
            let node = nodes[key]
            let nodeData = this.data(node)
            nodesData[key] = {
                id: node['id'],
                position: node['position'],
                //  title: nodeData['title'],
                //  _pid:this.data(node.parent)['type'] == "containerContent"?node.parent.parent.id:parent.id,
                //  _nodeType:nodeData['nodeType'],
                //  _data: nodeData['data']
            }
            this.data(node, {
                pid: this.data(node.parent)['type'] == "containerContent" ? node.parent.parent.id : parent.id
            })
        }

        for (let key in arrows) {
            let arrow = arrows[key]
            arrowsData[key] = {
                id: arrow['id'],
                arrowType:  arrow['arrowType']
                // _data: arrow['_data']
            }
        }

        for (let key in containers) {
            let container = containers[key]
            containersData[key] = {
                id: container.id,
                position: container.position,
            }
        }

        data['nodes'] = nodesData
        data['arrows'] = arrowsData
        data['containers'] = containersData
        data['_data'] = this._data

        return data;
    }

    //warn:这个方法是异步执行，但是没有提供回调，有待改造
    //反序列化
    deserialization(data, callback) {
        const { position, scale, containers, nodes, arrows, _data } = data

        this.resetPage({}, () => {
            for (let key in containers) {
                let container = containers[key]
                let containerData = _data[container['id']]
                this.addContainer(containerData['containerType'], container.position, Object.assign({ id: container.id }
                    , containerData))
            }

            for (let key in nodes) {
                let node = nodes[key]
                let nodeData = _data[node['id']]
                let container = this.containers[nodeData['pid']]
                this.addNode(nodeData['nodeType'], node['position'], Object.assign(
                    { id: node.id }
                    , nodeData), container && container.childAt(1))
            }

            for (let key in this.containers) {

                this.refreshContainerReact(this.containers[key],this.containers[key].position[0],this.containers[key].position[1])

            }

            for (let key in arrows) {
                let arrow = arrows[key]
                let arrowData = {} ||_data[arrow['id']]
                let ids = arrow.id.split('_')
                let startNode = ids[1].length == 4 ? this.containers[ids[1]] : this.nodes[ids[1]],
                    endNode =  ids[2].length == 4 ? this.containers[ids[2]] : this.nodes[ids[2]]
                let arrowGroup = this.addArrow({
                    x: startNode.position[0],
                    y: startNode.position[1]
                }, {
                        x: endNode.position[0],
                        y: endNode.position[1]
                    }, Object.assign({
                        id: arrow['id'],
                        arrowType: arrow['arrowType']
                    }, arrowData))

                this.refreshArrow(arrowGroup)
            }

            this.rootGroup.position = position
            this.rootGroup.scale = scale || [1, 1]
            this.status.scale = scale[0]
            callback && callback()
        })
    }


    //######################所有工具栏点击操作################################
    //工具栏，清空页面
    resetPage(option = {}, callback) {
        this.zr.clear()
        this.nodes = {}
        this.arrows = {}
        this.containers = {}
        this._data = {
            
                    }
        this.clearData(this.rootGroup)
        this.rootGroup = null

        this.status = {
            hoverGroup: null,
            maxIndex: 99,
            minIndex: 1,
            scale: 1,
            maxScale: 5,
            minScale: 0.2,
            locked: false,
            searchIndex: 0
            , dataStr: '' //整张图序列化之后的字符串
            , dataStrValid: true
        }


        this._initRootGroup()
        callback && callback()


    }

    _initRootGroup(option = {}) {
        this.rootGroup = new Group(Object.assign({
            position: [0, 0]
            , id: new Date().getTime()
        }))

        this.data(this.rootGroup, {
            type: 'rootGroup'
        })

        this.zr.add(this.rootGroup)
    }

    //比例操作
    zoom(scale) {
        let { maxScale, minScale } = this.status
        if (scale < minScale || scale > maxScale) {
            return
        }
        this.rootGroup.scale = [scale, scale]
        this.rootGroup.dirty(true)
        this.status.scale = scale
        //this.rootGroup.refresh()
    }
    //工具栏，放大
    zoomIn() {
        let scale = add(this.status.scale, 0.05)
        this.zoom(scale)
    }

    //工具栏，缩小
    zoomOut() {
        let scale = sub(this.status.scale, 0.05)
        this.zoom(scale)
    }

    //工具栏，正常大小
    zoomReset() {
        let scale = this.status.scale = 1
        this.zoom(scale)
        /* if(this.status.activeGroup){
             this.lookupNode(this.status.activeGroup)
         }*/
    }

    //设置搜索关键字
    setKeyWord(e) {
        this.setState({
            keyword: e.target.value,
            searchIndex: 0
        })
    }


    //工具栏，搜索节点
    searchNode() {
        let nodes = this.nodes
        let { keyword, searchIndex } = this.state
        let index = 0
        if (keyword == '') {
            return
        }

        for (let key in nodes) {
            if (index++ < searchIndex) {
                continue
            }
            let node = nodes[key]
            let nodeTitle = this.data(node)['title']
            if (nodeTitle && nodeTitle.indexOf(keyword) != -1 && (this.status.activeGroup == null || this.status.activeGroup.id != node.id)) {
                this.setActiveNode(node)
                this.setState({
                    searchIndex: index
                })
                this.lookupNode(node)
                break;
            }
        }

        if (this.getMapLength(nodes) == index) {
            this.setState({
                searchIndex: 0
            })
        }
    }

    lookupNode(node) {
        let offset = this.getNodeOffset(node)
        let rootPosition = this.rootGroup.position
        const { mapWidth, mapHeight } = this.state
        const { scale } = this.status
        let xMove = sub(divi(mapWidth, 2), add(offset[0] + rootPosition[0], node.childAt(0).style.width * scale)),
            yMove = sub(divi(mapHeight, 2), add(offset[1] + rootPosition[1], node.childAt(0).style.height * scale))

        this.rootGroup.position = [add(this.rootGroup.position[0], xMove), add(this.rootGroup.position[1], yMove)]
        this.rootGroup.dirty(true)
    }

    //工具栏，搜索文本框回车搜索
    enterSearch(e) {
        if (e.keyCode == 13) {//按下了enter键
            this.searchNode()
        }
    }


    //工具栏，显示json
    setTxtData(option) {
        ///alert(option.checked)
        if(!option.checked && !this.$txt){
            let data = this.serialize()
            this.$txt = document.createElement("textarea")
            this.$txt.className="json"
            this.paper.appendChild(this.$txt)
            this.$txt.value = JSON.stringify(data,'',2)
        }else{
            let data=JSON.parse(this.$txt.value)
            this.deserialization(data)
            this.$txt.remove()
            this.$txt = null
        }
        
        //console.log(JSON.stringify(data, null, 10))
        /* this.setState({
            dataStr: JSON.stringify(data, null, 10),
            dataStrValid: true
        }) */
    }

    //######################所有右键菜单操作################################
    //右键菜单栏，创建节点操作
    createNode(type, position) {
        // this.refs.rightmenu.hideMenu()
        setTimeout(() => {
            let title = window.prompt("请输入节点名称:", "新建节点")
            if (title == null) {
                return;
            }
            let node = this.addNode(type, position, {
                title
            })
            let { activeGroup } = this.status
            if (activeGroup && this.data(activeGroup)['type'] == 'container') {
                this.bindNodeToContainer(activeGroup, node)
            }
        }, 100)
    }

    //创建组操作
    createContainer(type, position) {
        // this.refs.rightmenu.hideMenu()
        setTimeout(() => {
            let title = window.prompt("请输入组名称:", "新建组")
            if (title == null) {
                return;
            }
            let group = this.addContainer(type, position, {
                title
            })
            let { activeGroup } = this.status
            if (activeGroup && this.data(activeGroup)['type'] == 'container') {
                this.bindNodeToContainer(activeGroup, group)
            }
        }, 100)
    }

    //右键菜单 连接
    addActiveArrow(e) {
        let arrowPosition = this.getActiveArrowPosition(e)
        this.status.activeArrow = this.addArrow(arrowPosition.start, arrowPosition.end, {
            arrowType: e.type
        })
        return this.status.activeArrow
    }

    //右键菜单，删除
    deleteHandle(e) {
        let { activeGroup } = this.status
        if (this.data(activeGroup)['type'] == 'node') {
            this.deleteNode(activeGroup)
        } else if (this.data(activeGroup)['type'] == 'container') {
            this.deleteContainer(activeGroup)
        }
    }

    deleteNode(node) {
        if (typeof (node) == 'string') {
            node = this.nodes[node]
        }
        if (!node) {
            return
        }
        let arrowIds = this.findArrowIdsByNode(node),
            arrows = this.arrows

        arrowIds.map((id, index) => {
            let arrow = arrows[id]
            arrow.parent.remove(arrow)
            this.clearData(arrow)
            delete arrows[id]
        })

        delete this.nodes[node['id']]
        this.clearData(node)
        node.parent.remove(node)
    }

    deleteContainer(container) {
        let content = container.childAt(1)
        let childs = content.children()
        childs.map((child, index) => {
            this.deleteNode(child)
        })
        delete this.containers[container['id']]
        this.clearData(container)
        container.parent.remove(container)
    }

    getActiveArrowPosition(e) {
        let { NODE_INFO, NODE_TYPES } = this.state.config
        let activeGroup = this.status.activeGroup
        let { width, height } = activeGroup.getBoundingRect()
        let paperOffset = this.getOffset(this.paper)
        let rootPosition = this.rootGroup.position
        let startPosition = this.getNodeOffset(activeGroup)
        let endPosition = [e.clientX - paperOffset.left - rootPosition[0], e.clientY - paperOffset.top - rootPosition[1]]

        let scale = this.status.scale
        let startArrowOffset = activeGroup.nodeType&&NODE_TYPES[activeGroup.nodeType].arrowOffset||[0,0]
        
       // let startArrowCenter =activeGroup.nodeType&&  NODE_TYPES[activeGroup.nodeType].arrowCenter
        return {
            start: {
                x: divi(startPosition[0], scale)  + startArrowOffset[0],
                y: divi(startPosition[1], scale)  + startArrowOffset[1]
            },
            end: {
                x: divi(endPosition[0], scale) + (endPosition[0] > startPosition[0] ? -5 : 5),
                y: divi(endPosition[1], scale) + (endPosition[1] > startPosition[1] ? -5 : 5),
            }
        }
    }

    //工具栏方法 重命名
    renameHandle(e) {
        this.refs.rightmenu.hideMenu()
        setTimeout(() => {
            let activeGroup = this.status.activeGroup
            let activeGroupData = this.data(activeGroup)
            let title = window.prompt("请输入新的名字", activeGroupData['title'])
            if (title == null) {
                return
            }
            if (activeGroupData['type'] == 'container') {
                this.renameContainer(activeGroup, title)
            } else if (activeGroupData['type'] == 'node') {
                this.renameNode(activeGroup, title)
            }
        }, 100)
    }

    //给组重命名
    renameContainer(container, title) {
        let titleNode = container.childAt(2)
        titleNode.style.text = title
        this.data(container, {
            title
        })
        titleNode.dirty(true)
    }

    //给节点重命名
    renameNode(node, title) {
        let titleNode = node.childAt(1)
        titleNode.style.text = title
        this.data(node, {
            title
        })
        titleNode.dirty(true)
    }

    //#######################所有监听事件#######################

    //拖拽结束监听事件
    onDragEnd(dragTarget) {
        //有待实现
    }
}