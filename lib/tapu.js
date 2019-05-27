'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//import tplRender from './jsx/index.js'

var _zrender = require('zrender/lib/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _util = require('zrender/lib/core/util');

var _util2 = _interopRequireDefault(_util);

var _Group = require('zrender/lib/container/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Path = require('zrender/lib/graphic/Path');

var _Path2 = _interopRequireDefault(_Path);

var _path2 = require('zrender/lib/tool/path');

var _path3 = _interopRequireDefault(_path2);

var _Line = require('zrender/lib/graphic/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

var _BezierCurve = require('zrender/lib/graphic/shape/BezierCurve');

var _BezierCurve2 = _interopRequireDefault(_BezierCurve);

var _Rect = require('zrender/lib/graphic/shape/Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _Image = require('zrender/lib/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Text = require('zrender/lib/graphic/Text');

var _Text2 = _interopRequireDefault(_Text);

var _event = require('zrender/lib/core/event');

var _event2 = _interopRequireDefault(_event);

var _FLOW_MAP_DATA = require('./FLOW_MAP_DATA');

var mapConfig = _interopRequireWildcard(_FLOW_MAP_DATA);

var _math = require('./math');

var _RadialGradient = require('zrender/lib/graphic/RadialGradient');

var _RadialGradient2 = _interopRequireDefault(_RadialGradient);

var _LinearGradient = require('zrender/lib/graphic/LinearGradient');

var _LinearGradient2 = _interopRequireDefault(_LinearGradient);

var _coordinates = require('./fucks/coordinates');

require('./styles/flowMap.less');

var _path4 = require('zrender/lib/contain/path');

var _fucks = require('./fucks');

var _fucks2 = _interopRequireDefault(_fucks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlowMap = function () {
    function FlowMap(props) {
        _classCallCheck(this, FlowMap);

        //super(props)
        this.state = {
            mapWidth: 1000,
            mapHeight: 1000
            //   ,nodeMenuHandle:this.nodeMenuHandle

            , config: mapConfig,
            checkBtn: "",
            keyword: "" //搜索关键字
            , searchIndex: 0,
            dataStr: '' //整张图序列化之后的字符串
            , dataStrValid: true
        };

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
        };

        var ARROW_TYPES = mapConfig.ARROW_TYPES;


        var arrayMap = {};

        ARROW_TYPES.map(function (item) {
            arrayMap[item.key] = item;
        });

        this.rootGroup = null;

        this.arrayMap = arrayMap;

        this.nodes = {};

        this.arrows = {};

        this.containers = {};

        this._data = {};
    }

    _createClass(FlowMap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._initPaper();
            this._initEvents();

            this.paperTop = this.getTop(this.paper);
            this.paperLeft = this.getLeft(this.paper);
            /*  setTimeout(function () {
                 this.refreshFillStyle()
             }.bind(this), 100) */
        }
    }, {
        key: 'render',
        value: function render(paper, config) {
            this.paper = paper;

            this.componentDidMount();
        }
    }, {
        key: 'setState',
        value: function setState() {
            console.log('setState', arguments);
        }
    }, {
        key: '_initPaper',
        value: function _initPaper() {
            var _this = this;
            this.zr = _zrender2.default.init(this.paper);
            this.rootGroup = new _Group2.default({
                position: [0, 0]
            });

            this.data(this.rootGroup, {
                type: "rootGroup"
            });

            this.zr.add(this.rootGroup);
        }
    }, {
        key: '_initEvents',
        value: function _initEvents() {
            var _this2 = this;

            var dStartX = void 0,
                dStartY = void 0,
                dragTarget = void 0;
            var startX = void 0,
                startY = void 0,
                cStartX = 0,
                cStartY = 0;

            window.addEventListener("resize", function () {
                _this2.zr.resize();
            });

            this.paper.addEventListener("mousedown", function (e) {
                if (_this2.status.hoverGroup && _this2.status.locked == false) {
                    dragTarget = _this2.status.hoverGroup;
                } else {
                    dragTarget = _this2.rootGroup;
                }

                if (_this2.status.activeArrow) {
                    _this2.connectActiveArrow();
                }

                if (dragTarget.parent && _this2.data(dragTarget.parent)['type'] == 'containerContent') {
                    var container = dragTarget.parent.parent;
                    cStartX = container.position[0];
                    cStartY = container.position[1];
                    _this2.resetContainerContent(container);
                }
                dStartX = e.pageX;
                dStartY = e.pageY;
                startX = dragTarget['position'][0];
                startY = dragTarget['position'][1];
            });

            document.body.addEventListener("mousemove", function (e) {
                if (dragTarget) {
                    var scale = _this2.status.scale;

                    var toLeft = (0, _math.divi)(e.pageX - dStartX, scale),
                        toTop = (0, _math.divi)(e.pageY - dStartY, scale);
                    if (_this2.data(dragTarget)['type'] == 'rootGroup') {
                        dragTarget.position = [startX + e.pageX - dStartX, startY + e.pageY - dStartY];
                    } else {
                        dragTarget.position = [startX + toLeft, startY + toTop];
                        if (_this2.data(dragTarget)['type'] == 'container') {
                            _this2.refreshArrowsByNode(dragTarget);
                            dragTarget.childAt(1).eachChild(function (child) {
                                _this2.refreshArrowsByNode(child);
                            });
                        } else {
                            _this2.refreshArrowsByNode(dragTarget);
                        }
                    }

                    dragTarget.dirty(true);
                    if (dragTarget.parent && _this2.data(dragTarget.parent)['type'] == 'containerContent') {
                        var container = dragTarget.parent.parent;
                        /*  let left = cStartX+toLeft,top=cStartY+toTop;
                         if(toLeft>0){
                          left = cStartX
                         }
                         if(toTop){
                          top = cStartY
                         } */
                        _this2.refreshContainerReact(container, cStartX, cStartY);
                        _this2.refreshArrowsByNode(container);
                    }
                    // this.testRootGroupReact()
                    _this2.zr.refresh();
                } else if (_this2.status.activeArrow) {
                    var target = _this2.status.activeGroup;
                    var activeArrowPosition = _this2.getActiveArrowPosition(e);
                    _this2.refreshArrow(_this2.status.activeArrow, activeArrowPosition.start, activeArrowPosition.end);
                    //console.log(this.status.activeArrow)
                    //refreshArrow
                }
            });

            document.body.addEventListener("mouseup", function () {

                if (dragTarget) {
                    if (dragTarget.parent && _this2.data(dragTarget.parent)['type'] == 'containerContent') {

                        var container = dragTarget.parent.parent;
                        _this2.resetContainerContent(container);
                    }
                    _this2.onDragEnd(dragTarget);
                    dragTarget = null;
                }
            });

            document.body.addEventListener("mouseleave", function () {
                if (dragTarget) {
                    _this2.onDragEnd(dragTarget);
                    dragTarget = null;
                }
            });

            this.zr.on("mousedown", function () {

                _this2.setActiveNode(_this2.rootGroup);
            });

            this.paper.addEventListener("mousewheel", function (e) {
                if (e.wheelDelta > 0) {
                    _this2.zoomIn();
                } else if (e.wheelDelta < 0) {
                    _this2.zoomOut();
                }

                e.preventDefault();
            });
        }
    }, {
        key: 'add',
        value: function add(node) {
            this.rootGroup.add(node);
        }
    }, {
        key: 'refreshFillStyle',
        value: function refreshFillStyle() {

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

            var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        }
    }, {
        key: 'getNodeOffset',
        value: function getNodeOffset(node, position) {
            if (!position) {
                position = [0, 0];
            }

            if (this.data(node)['type'] == 'rootGroup') {
                // position[0] += node.position[0]
                // position[1] += node.position[1]
                return position;
            } else {
                position[0] += node.position[0] * this.status.scale;
                position[1] += node.position[1] * this.status.scale;
            }

            return this.getNodeOffset(node.parent, position);
        }

        //公共方法

    }, {
        key: 'getOffset',
        value: function getOffset(node, offset) {
            if (!offset) {
                offset = {};
                offset.top = 0;
                offset.left = 0;
            }
            if (node == document.body) {
                //当该节点为body节点时，结束递归
                return offset;
            }
            offset.top += node.offsetTop;
            offset.left += node.offsetLeft;
            return this.getOffset(node.offsetParent, offset); //向上累加offset里的值
        }
    }, {
        key: 'getPaperOffset',
        value: function getPaperOffset() {
            var toolbarHeight = this.refs.toolbar ? this.refs.toolbar.offsetHeight : 0;
            var poffset = this.getOffset(this.paper);
            var pleft = poffset.left,
                ptop = poffset.top - toolbarHeight;
            return {
                pleft: pleft, ptop: ptop
            };
        }

        //获取元素的纵坐标 

    }, {
        key: 'getTop',
        value: function getTop(e) {
            var offset = e.offsetTop;
            if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
            return offset;
        }

        //获取元素的横坐标 

    }, {
        key: 'getLeft',
        value: function getLeft(e) {
            var offset = e.offsetLeft;
            if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
            return offset;
        }
    }, {
        key: 'stopEvent',
        value: function stopEvent(e) {
            e.returnValue = false;
            e.cancelBubble = true;
            return e;
        }

        //获取对象长度

    }, {
        key: 'getMapLength',
        value: function getMapLength(map) {
            return Object.keys(map).length;
        }

        //获取所有跟节点有关联的箭头的id

    }, {
        key: 'findArrowIdsByNode',
        value: function findArrowIdsByNode(node) {
            var id = node.id;

            var reg = new RegExp("[^\|]*" + id + "[^\|]*", "ig"),
                keysStr = Object.keys(this.arrows).join("|");
            return keysStr.match(reg) || [];
        }
    }, {
        key: 'texsst',
        value: function texsst() {
            this.fuck(this.findNodeByName('1'), this.findNodeByName('2'));
            this.fuck(this.findNodeByName('1'), this.findNodeByName('2'), {
                radian: 150,
                speed: 300
            });
            this.fuck(this.findNodeByName('1'), this.findNodeByName('2'), {
                radian: 200,
                speed: 350
            });
            this.fuck(this.findNodeByName('1'), this.findNodeByName('2'), {
                radian: 250,
                speed: 500
            });

            this.fuck(this.fineNodeByName('1'), this.fineNodeByName('3'), {
                radian: 150,
                speed: 500
            });

            console.log(this.fineNodeByName('111'));
            return;
        }
    }, {
        key: 'fuck',
        value: function fuck(startNode, endNode) {
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!(startNode && endNode)) {
                return;
            }
            var NODE_TYPES = this.state.config.NODE_TYPES;
            var scale = this.status.scale;

            var startOfset = this.getNodeOffset(startNode);
            var endOfset = this.getNodeOffset(endNode);
            var startArrowOffset = startNode.nodeType && NODE_TYPES[startNode.nodeType].arrowOffset || [0, 0],
                endArrowOffset = endNode.nodeType && NODE_TYPES[endNode.nodeType].arrowOffset || [0, 0];

            var _startNode$getBoundin = startNode.getBoundingRect(),
                startWidth = _startNode$getBoundin.width,
                startHeight = _startNode$getBoundin.height;

            var _endNode$getBoundingR = endNode.getBoundingRect(),
                endWidth = _endNode$getBoundingR.width,
                endHeight = _endNode$getBoundingR.height;

            var start = void 0,
                end = void 0;
            if (startArrowOffset[0] || startArrowOffset[1]) {
                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + startArrowOffset[0],
                    y: (0, _math.divi)(startOfset[1], scale) + startArrowOffset[1]
                };
            } else {
                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + startWidth / 2,
                    y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2
                };
            }

            if (endArrowOffset[0] || endArrowOffset[1]) {
                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + endArrowOffset[0],
                    y: (0, _math.divi)(endOfset[1], scale) + endArrowOffset[1]
                };
            } else {
                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + endWidth / 2,
                    y: (0, _math.divi)(endOfset[1], scale) + endHeight / 2
                };
            }

            (0, _fucks2.default)(this, start, end, Object.assign({ type: 'fire' }, option));

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
    }, {
        key: 'test',
        value: function test() {

            var node1 = this.findNodeByName('单位一');
            var node2 = this.findNodeByName('单位二');
            var start = [100, 100],
                end = [500, 500];
            var points = (0, _coordinates.getCurvePath)(start, end, 0.4);

            function getLinearColor(index) {
                index /= 100;
                var start = index - 0.6;
                var end = index;
                if (end > 1) {
                    end = 1;
                }
                // console.log(start,end)
                start = start < 0 ? 0 : start;
                var colorList = [{
                    offset: 0,
                    color: 'rgba(56,222,56,0)'
                }, {
                    offset: start,
                    color: 'rgba(56,222,56,0)'
                }, {
                    offset: end,
                    color: 'rgba(56,222,56,1)'
                }, {
                    offset: end,
                    color: 'rgba(56,222,56,0)'
                }];
                var linearGradient = new _LinearGradient2.default(0, 0, 1, 1, colorList, false);
                return linearGradient;

                // return `rgba(56,222,56,${index})`
            }

            var node = new _Rect2.default({
                zlevel: 10,
                shape: {
                    x: 0,
                    y: 0,
                    width: 10,
                    height: 10
                },
                style: Object.assign({
                    fill: 'blue',
                    stroke: 'red'
                })
            });

            /*var cp = [
                 ( start[ 0 ] + end[ 0 ] ) / 2 - ( start[ 1 ] - end[ 1 ] ) * 0.5,
                 ( start[ 1 ] + end[ 1 ] ) / 2 - ( end[ 0 ] - start[ 0 ] ) * 0.5
             ];*/
            var line = _path3.default.createFromString(points.map(function (p, i) {
                if (i == 0) {
                    return 'M' + p.x + ' ' + p.y;
                } else {
                    return 'L' + p.x + ' ' + p.y;
                }
            }).join(' '));

            line.style.fill = 'transparent';
            line.style.stroke = 'orange';
            line.style.lineWidth = 5;

            this.rootGroup.add(line);
            console.log(line);

            this.rootGroup.add(node);

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
            var animObj = node.animate('shape', false);

            points.map(function (p, index) {
                animObj.when(2000 * index, {
                    x: index,
                    y: index
                });
            });
            // console.log(animObj,'animObj')
            //  animObj.start()
            console.log(animObj);

            /*  let animObjL = line.animate('style', false)
             points.map((p,index)=>{
                 animObjL.when(20*index, {
                  //   stroke:getLinearColor(index)
                 })
             })
             animObjL.start() */

            var _i = 0;
            /*  window.setInterval(()=>{
                 line.style.stroke = getLinearColor(_i++)
                 line.dirty()
             },1000) */
            // animObjL.start() 
            //this.fuck(node1,node2, {speed:500})
        }
    }, {
        key: 'clickToolbarBtnHandle',
        value: function clickToolbarBtnHandle(option) {
            var name = option.name;
            var activeBtn = this.state.activeBtn;

            switch (name) {
                case 'zoomin':
                    this.zoomIn();break;
                case 'zoomout':
                    this.zoomOut();break;
                case 'zoomreset':
                    this.zoomReset();break;
                case 'reset':
                    this.test();break;
                case 'json':
                    this.setTxtData(option);break;
                case 'print':
                    this.texsst();
                //case 'pan':this.pan();break;
            }

            if (option.name != activeBtn) {
                if (activeBtn == 'json' && this.validJson(this.state.dataStr)) {
                    this.deserialization(JSON.parse(this.state.dataStr));
                }

                if (option.name == 'pan') {
                    this.status.locked = true;
                } else {
                    this.status.locked = false;
                }

                this.setState({
                    activeBtn: option.name
                });
            }
        }
    }, {
        key: 'selectToolbarBtnHandle',
        value: function selectToolbarBtnHandle(key) {
            var activeBtn = this.refs.toolbar.state.activeBtn;

            switch (key) {
                case 'default':
                    if (activeBtn == key) {
                        return;
                    } else {
                        this.enableDrag();
                    }
                    ;break;
                default:
                    this.disableDrag();break;
            }
        }
    }, {
        key: 'onFlowMapClickHandle',
        value: function onFlowMapClickHandle() {
            this.refs.rightmenu.hideMenu();
        }
    }, {
        key: 'rightMenuHandle',
        value: function rightMenuHandle(e, event) {

            e.preventDefault();
            if (!this.state.config['MENU_TYPES']) {
                return;
            }
            if (this.status.locked) {
                return;
            }

            var _getPaperOffset = this.getPaperOffset(),
                pleft = _getPaperOffset.pleft,
                ptop = _getPaperOffset.ptop;

            var paper = this.paper,
                rightmenu = this.refs.rightmenu.refs.rightmenu;
            var left = e.clientX,
                top = e.clientY;
            if (left > paper.offsetWidth + paper.offsetLeft - rightmenu.offsetWidth) {
                left = paper.offsetWidth + paper.offsetLeft - rightmenu.offsetWidth;
            }
            if (top > paper.offsetHeight + paper.offsetTop - rightmenu.offsetHeight) {
                top = paper.offsetHeight + paper.offsetTop - rightmenu.offsetHeight;
            }
            this.refs.rightmenu.showMenu({
                left: left - pleft + window.scrollX,
                top: top - ptop + window.scrollY,
                target: this.status.hoverGroup && this.data(this.status.hoverGroup)['type'] || "rootGroup"
            });
        }
    }, {
        key: 'rightMenuClickHandle',
        value: function rightMenuClickHandle(index, o, e) {
            var left = o.left,
                top = o.top,
                type = o.type;

            switch (index) {
                case 'addGroup':
                    //创建组相关操作
                    this.createContainer(type, [left - 25, top - 25]);break;
                case 'addNode':
                    //创建节点相关操作
                    if (e) {
                        this.createNode(type, [left - 25, top - 25]);
                    }
                    ;break;
                case 'addArrow':
                    this.addActiveArrow(o);break;
                case 'reset':
                    this.resetPage();break;
                case 'zoomin':
                    this.zoomIn();break;
                case 'zoomout':
                    this.zoomOut();break;
                case 'zoomreset':
                    this.zoomReset();break;
                case 'delete':
                    this.deleteHandle();break;
                case 'rename':
                    this.renameHandle(e);break;
                default:
                    ;

            }

            this.zr.handler._lastDownButton = null; //右键菜单已经被重写了，防止源码里面对右键的锁定措施
        }
    }, {
        key: 'dataStrChangeHandle',
        value: function dataStrChangeHandle(e) {
            var dataStr = e.target.value;
            var dataStrValid = this.state.dataStrValid;

            if (this.validJson(dataStr) == false) {
                if (dataStr == "") {
                    this.resetPage();
                } else {
                    dataStrValid = false;
                }
            } else {
                dataStrValid = true;
            }

            this.setState({
                dataStr: dataStr,
                dataStrValid: dataStrValid
            });
        }
    }, {
        key: 'validJson',
        value: function validJson(jsonStr) {
            try {
                JSON.parse(jsonStr);
            } catch (e) {
                console.error(e);
                return false;
            }
            return true;
        }
    }, {
        key: 'addGroup',
        value: function addGroup(opt, parent) {
            var group = new _Group2.default(Object.assign({
                position: [0, 0],
                style: {}
            }, opt));
            if (parent) {
                parent.add(group);
            } else {
                this.rootGroup.add(group);
            }

            return group;
        }
    }, {
        key: 'setGroupZLevel',
        value: function setGroupZLevel(group, zlevel) {
            group.zlevel = zlevel;
            /* group.children().map((c, i) => {
                c.zlevel = zlevel
                c.dirty(0)
            }) */
            this.zr.refresh();
        }
    }, {
        key: 'addArrow',
        value: function addArrow() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            // let { ARROW_INFO } = this.state.config

            if (this.arrayMap[option.arrowType].render) {
                return this.arrayMap[option.arrowType].render(start, end, option, this);
            }

            var group, line, arrow;
            var isArrow = this.arrayMap[option.arrowType].arrow ? true : false;
            var color = this.arrayMap[option.arrowType].color || '#666';
            // var arrowOffset = this.arrayMap[option.arrowType].arrowOffset || [0,0]
            if (option.type == "group" && option.arrowType) {
                group = option;
                line = group.childAt(0);
                line.dirty(true);
                if (isArrow) {
                    arrow = group.childAt(1);
                    arrow.dirty(true);
                }
            } else {
                var zlevel = 1;
                group = this.addGroup(Object.assign({
                    zlevel: zlevel,
                    //    type: 'arrow',
                    arrowType: option.arrowType || 'normal'
                }, option));
                /* 
                this.data(group, {
                    type: 'arrow',
                    arrowType: option.arrowType || 'normal'
                }) */

                //bessel
                line = new (['unbessel', 'bessel'].indexOf(option.arrowType) != -1 ? _BezierCurve2.default : _Line2.default)({
                    zlevel: zlevel,
                    shape: {},
                    style: {
                        // text:123321,
                        //textRotation:0.5
                        //  lineDash: [2, 2],
                        //  [ARROW_INFO.color && 'stroke']: ARROW_INFO.color
                        stroke: color
                    }
                });
                /*  line.animate('style', true)
                 .when(300,{
                     lineDashOffset: -4
                 }) 
                 .start();*/
                //let arrowPath = this.getArrowPath(start, end, 6)
                group.add(line);
                if (isArrow) {
                    var path = _path3.default.createFromString("");

                    path.style.fill = color;

                    arrow = path;

                    group.add(path);
                }
            }

            if (option.arrowType == 'bessel' || option.arrowType == 'unbessel') {
                var un = option.arrowType == 'unbessel' ? true : false;
                var len = 100;
                var xlen = end.x - start.x,
                    ylen = end.y - start.y;
                var clen = Math.sqrt(xlen * xlen + ylen * ylen);
                line.shape = Object.assign(line.shape, {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y,
                    cpx1: start.x + xlen / 2 + len / clen * ylen * (un ? -1 : 1),
                    cpy1: start.y + ylen / 2 - len / clen * xlen * (un ? -1 : 1)
                });
            } else {
                line.shape = Object.assign(line.shape, {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y
                });
            }

            if (isArrow) {
                var arrowPath = this.getArrowPath(start, end, 6);
                var _path = _path3.default.createFromString(arrowPath);
                arrow['buildPath'] = _path['buildPath'];
            }

            this.arrows[group.id] = group;
            this.rootGroup.add(group);
            return group;
        }
    }, {
        key: 'refreshArrowsByNode',
        value: function refreshArrowsByNode(node) {
            var _this3 = this;

            var arrows = this.arrows;
            var targetId = node.id;

            var arrowIds = this.findArrowIdsByNode(node);
            arrowIds.map(function (id, index) {
                _this3.refreshArrow(arrows[id]);
            });
        }
    }, {
        key: 'refreshArrow',
        value: function refreshArrow(group, start, end) {
            if (start == null || end == null) {
                var ids = group['id'].split("_");
                var startNode = ids[1].length == 4 ? this.containers[ids[1]] : this.nodes[ids[1]];
                var endNode = ids[2].length == 4 ? this.containers[ids[2]] : this.nodes[ids[2]];
                var arrowResult = void 0;

                if (group.arrowType == 'vertical') {
                    arrowResult = this.refreshVerticalArrow(startNode, endNode);
                } else {
                    arrowResult = this.refreshNormalArrow(startNode, endNode);
                }

                start = arrowResult.start;
                end = arrowResult.end;
            }

            this.addArrow(start, end, group);

            this.zr.refresh();
        }

        //普通直线交点算法

    }, {
        key: 'refreshNormalArrow',
        value: function refreshNormalArrow(startNode, endNode) {
            var scale = this.status.scale;
            var NODE_TYPES = this.state.config.NODE_TYPES;

            var startOfset = this.getNodeOffset(startNode);
            var endOfset = this.getNodeOffset(endNode);

            var _startNode$getBoundin2 = startNode.getBoundingRect(),
                startWidth = _startNode$getBoundin2.width,
                startHeight = _startNode$getBoundin2.height;

            var _endNode$getBoundingR2 = endNode.getBoundingRect(),
                endWidth = _endNode$getBoundingR2.width,
                endHeight = _endNode$getBoundingR2.height;

            var startArrowCenter = startNode.nodeType && NODE_TYPES[startNode.nodeType].arrowCenter,
                endArrowCenter = endNode.nodeType && NODE_TYPES[endNode.nodeType].arrowCenter;
            var startArrowOffset = startNode.nodeType && NODE_TYPES[startNode.nodeType].arrowOffset || [0, 0],
                endArrowOffset = endNode.nodeType && NODE_TYPES[endNode.nodeType].arrowOffset || [0, 0];
            var xLen = endOfset[0] - startOfset[0];
            var yLen = endOfset[1] - startOfset[1];
            var zLen = Math.sqrt(Math.pow(yLen, 2) + Math.pow(xLen, 2));

            var xLowStart = 0;
            var yLowStart = 0;

            var xLowEnd = 0;
            var yLowEnd = 0;
            if (Math.abs(xLen) > Math.abs(yLen)) {
                xLowStart = startWidth / 2;
                xLowEnd = endWidth / 2;
            } else if (Math.abs(xLen) < Math.abs(yLen)) {
                yLowStart = startHeight / 2;
                yLowEnd = endHeight / 2;
            } else {
                xLowStart = startWidth / 2;
                xLowStart = startWidth / 2;

                xLowStart = startWidth / 2;
                yLowEnd = endHeight / 2;
            }

            if (xLen < 0) {
                xLowStart *= -1;
                xLowEnd *= -1;
            }

            if (yLen < 0) {
                yLowStart *= -1;
                yLowEnd *= -1;
            }

            var start = {
                x: (0, _math.divi)(startOfset[0], scale) + startWidth / 2 + xLowStart,
                y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2 + yLowStart
            };

            var end = {
                x: (0, _math.divi)(endOfset[0], scale) + endWidth / 2 - xLowEnd,
                y: (0, _math.divi)(endOfset[1], scale) + endHeight / 2 - yLowEnd
            };

            if (startArrowCenter) {
                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + startWidth / 2,
                    y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2
                };
            }

            if (endArrowCenter) {
                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + endWidth / 2,
                    y: (0, _math.divi)(endOfset[1], scale) + endHeight / 2
                };
            }

            if (startArrowOffset[0] || startArrowOffset[1]) {
                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + startArrowOffset[0],
                    y: (0, _math.divi)(startOfset[1], scale) + startArrowOffset[1]
                };
            }

            if (endArrowOffset[0] || endArrowOffset[1]) {
                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + endArrowOffset[0],
                    y: (0, _math.divi)(endOfset[1], scale) + endArrowOffset[1]
                };
            }

            return {
                start: start,
                end: end
            };
        }

        //垂直线交点算法

    }, {
        key: 'refreshVerticalArrow',
        value: function refreshVerticalArrow(startNode, endNode) {
            var scale = this.status.scale;
            var NODE_TYPES = this.state.config.NODE_TYPES;

            var _startNode$getBoundin3 = startNode.getBoundingRect(),
                startWidth = _startNode$getBoundin3.width,
                startHeight = _startNode$getBoundin3.height;

            var _endNode$getBoundingR3 = endNode.getBoundingRect(),
                endWidth = _endNode$getBoundingR3.width,
                endHeight = _endNode$getBoundingR3.height;

            console.log(endWidth, endHeight);
            endHeight = 1;
            var startOfset = this.getNodeOffset(startNode);
            var endOfset = this.getNodeOffset(endNode);

            var startArrowCenter = startNode.nodeType && NODE_TYPES[startNode.nodeType].arrowCenter,
                endArrowCenter = endNode.nodeType && NODE_TYPES[endNode.nodeType].arrowCenter;
            var startArrowOffset = startNode.nodeType && NODE_TYPES[startNode.nodeType].arrowOffset || [0, 0],
                endArrowOffset = endNode.nodeType && NODE_TYPES[endNode.nodeType].arrowOffset || [0, 0];
            var xLen = endOfset[0] - startOfset[0];
            var yLen = endOfset[1] - startOfset[1];
            var zLen = Math.sqrt(Math.pow(yLen, 2) + Math.pow(xLen, 2));

            var xLowStart = 0;
            var yLowStart = 0;

            var xLowEnd = 0;
            var yLowEnd = 0;
            var start = void 0,
                end = void 0;

            /*   startOfset[0] = divi(startOfset[0], scale)
              startOfset[1] = divi(startOfset[1], scale)
              endOfset[0] = divi(endOfset[0], scale)
              endOfset[1] = divi(endOfset[1], scale) */
            if (startOfset[1] + startHeight / 2 >= endOfset[1] && startOfset[1] <= endOfset[1] + endHeight - startHeight / 2) {
                //左右两边
                if (startOfset[0] + startWidth / 2 < endOfset[0] + endWidth / 2) {
                    //左边
                    if (startOfset[0] + startWidth / 2 > endOfset[0]) {
                        //在左边内部
                        start = {
                            x: (0, _math.divi)(startOfset[0], scale),
                            y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2
                        };
                    } else {
                        start = {
                            x: (0, _math.divi)(startOfset[0], scale) + startWidth,
                            y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2
                        };
                    }

                    end = {
                        x: (0, _math.divi)(endOfset[0], scale),
                        y: start.y
                    };
                } else {
                    if (startOfset[0] + startWidth / 2 < endOfset[0] + endWidth) {
                        //在右边内部
                        start = {
                            x: (0, _math.divi)(startOfset[0], scale) + startWidth,
                            y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2
                        };
                    } else {
                        start = {
                            x: (0, _math.divi)(startOfset[0], scale),
                            y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2
                        };
                    }

                    end = {
                        x: (0, _math.divi)(endOfset[0], scale) + endWidth,
                        y: start.y
                    };
                }
            } else if (startOfset[0] + startWidth / 2 >= endOfset[0] && startOfset[0] <= endOfset[0] + endWidth - startWidth / 2) {
                //上下两边
                if (startOfset[1] < endOfset[1] + endHeight / 2) {
                    //上边
                    start = {
                        x: (0, _math.divi)(startOfset[0], scale) + startWidth / 2,
                        y: (0, _math.divi)(startOfset[1], scale) + startHeight
                    };
                    end = {
                        x: start.x,
                        y: (0, _math.divi)(endOfset[1], scale)
                    };
                } else {
                    //
                    start = {
                        x: (0, _math.divi)(startOfset[0], scale) + startWidth / 2,
                        y: (0, _math.divi)(startOfset[1], scale)
                    };
                    end = {
                        x: start.x,
                        y: (0, _math.divi)(endOfset[1], scale) + endHeight
                    };
                }
            } else {
                start = {
                    x: (0, _math.divi)(startOfset[0], scale),
                    y: (0, _math.divi)(startOfset[1], scale)
                };
                end = {
                    x: (0, _math.divi)(endOfset[0], scale),
                    y: (0, _math.divi)(endOfset[1], scale)
                };
                if (startOfset[1] < endOfset[1] + endHeight / 2) {
                    start.y += startHeight;
                } else {
                    end.y += endHeight;
                }

                if (startOfset[0] < endOfset[0] + endWidth / 2) {
                    start.x += startWidth;
                } else {
                    end.x += endWidth;
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
            if (startArrowCenter) {
                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + startWidth / 2 + startArrowOffset[0],
                    y: (0, _math.divi)(startOfset[1], scale) + startHeight / 2 + startArrowOffset[1]
                };
            }
            if (endArrowCenter) {
                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + endWidth / 2 + endArrowOffset[0],
                    y: (0, _math.divi)(endOfset[1], scale) + endHeight / 2 + endArrowOffset[0]
                };
            }

            return {
                start: start,
                end: end
            };
        }
    }, {
        key: 'getArrowPath',
        value: function getArrowPath(leftPoint, rightPoint, radius) {
            var area = Math.atan2(leftPoint.y - rightPoint.y, rightPoint.x - leftPoint.x) * (180 / Math.PI);
            var x = rightPoint.x - radius * Math.cos(area * (Math.PI / 180)),
                y = rightPoint.y + radius * Math.sin(area * (Math.PI / 180));

            var x1 = x + radius * Math.cos((area + 120) * (Math.PI / 180)),
                y1 = y - radius * Math.sin((area + 120) * (Math.PI / 180)),
                x2 = x + radius * Math.cos((area + 240) * (Math.PI / 180)),
                y2 = y - radius * Math.sin((area + 240) * (Math.PI / 180));
            return 'M ' + rightPoint.x + ' ' + rightPoint.y + ' L ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' L ' + rightPoint.x2 + ' ' + rightPoint.y2 + ' Z';
        }
    }, {
        key: 'findNodesLikeName',
        value: function findNodesLikeName(name) {
            var nodes = [];
            var data = this._data;
            var keys = Object.keys(data);
            for (var i = 0, len = keys.length; i < len; i++) {
                var title = data[keys[i]].title || '';
                if (title.indexOf(name) != -1) {
                    nodes.push(this.nodes[keys[i]]);
                    // break; 
                }
            }
            return nodes;
        }
    }, {
        key: 'findNodeByName',
        value: function findNodeByName(name) {
            var node = false;
            var data = this._data;
            var keys = Object.keys(data);
            for (var i = 0, len = keys.length; i < len; i++) {
                if (data[keys[i]].title === name) {
                    node = this.nodes[keys[i]];
                    break;
                }
            }
            return node;
        }

        //设置聚焦节点

    }, {
        key: 'setActiveNode',
        value: function setActiveNode(node) {
            if (this.status.locked) {
                return;
            }
            var _status = this.status,
                activeGroup = _status.activeGroup,
                minIndex = _status.minIndex,
                maxIndex = _status.maxIndex;

            if (activeGroup && this.data(activeGroup)['type'] == 'node' && activeGroup.id != node.id) {
                activeGroup.childAt(0).style.shadowBlur = 0;
                // this.setGroupZLevel(activeGroup, activeGroup._zlevel ||  minIndex)
                //   delete node._zlevel
            }

            if (this.data(node)['type'] == 'node' && (activeGroup && activeGroup.id) != node.id) {

                // node._zlevel = node.zlevel
                node.childAt(0).style.shadowBlur = 10;
                //  this.setGroupZLevel(node, maxIndex)
            }

            this.status.hoverGroup = node;
            this.status.activeGroup = node;
        }

        //设置连线目标节点

    }, {
        key: 'setArrowTargetNode',
        value: function setArrowTargetNode(node) {
            if (node.id != this.status.activeGroup.id) {
                node.childAt(0).style.shadowBlur = 10;
                node.childAt(0).dirty(true);
                this.status.arrowTargetNode = node;
            }
        }

        //清空连线目标节点

    }, {
        key: 'resetArrowTargetNode',
        value: function resetArrowTargetNode() {
            if (this.status.arrowTargetNode && this.status.arrowTargetNode.id != this.status.activeGroup.id) {
                this.status.arrowTargetNode.childAt(0).style.shadowBlur = 0;
                this.status.arrowTargetNode.childAt(0).dirty(true);
                this.status.arrowTargetNode = null;
            }
        }
    }, {
        key: 'addNode',
        value: function addNode(type, position) {
            var _this4 = this;

            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var parent = arguments[3];
            var scale = this.status.scale;

            var rootPosition = this.rootGroup.position;
            var _state$config = this.state.config,
                NODE_TYPES = _state$config.NODE_TYPES,
                NODE_INFO = _state$config.NODE_INFO;

            var zlevel = NODE_TYPES[type].zlevel || 2;
            var group = this.addGroup(Object.assign({
                id: option.id || new Date().getTime(),
                position: [(0, _math.divi)(position[0] - rootPosition[0], scale), (0, _math.divi)(position[1] - rootPosition[1], scale)],
                zlevel: zlevel,
                onclick: function onclick(e) {
                    // group.zlevel = 11
                },
                onmousedown: function onmousedown(e) {
                    if (_this4.status.arrowTargetNode && _this4.status.arrowTargetNode.id == group.id) {
                        //连线时候，当作目标节点，只连线，不设为焦点
                        return _this4.stopEvent(e);
                    }
                    _this4.setActiveNode(group);
                    return _this4.stopEvent(e);
                },
                onmouseover: function onmouseover(e) {
                    _this4.status.hoverGroup = group;

                    if (_this4.status.activeArrow) {

                        _this4.setArrowTargetNode(group);
                    }
                    if (_this4.onMouseOver) {
                        _this4.onMouseOver(option, e);
                    }
                    return _this4.stopEvent(e);
                },
                onmouseout: function onmouseout(e) {
                    if (_this4.status.hoverGroup && (_this4.status.hoverGroup.id = group.id)) {
                        _this4.status.hoverGroup = null;
                    }
                    _this4.resetArrowTargetNode();
                    if (_this4.onMouseOut) {
                        _this4.onMouseOut(option, e);
                    }
                    return _this4.stopEvent(e);
                }
            }, option), parent);

            var nodeData = this.data(group, Object.assign({}, option, {
                type: 'node',
                nodeType: type,
                title: option['title'] != null ? option['title'] : NODE_TYPES[type]['title']
            }));
            if (NODE_TYPES[type].render) {
                NODE_TYPES[type].render.call(this, group, NODE_TYPES[type], nodeData);
            } else {
                var nodeWidth = NODE_TYPES[type]['width'] || NODE_INFO['width'],
                    nodeHeight = NODE_TYPES[type]['height'] || NODE_INFO['height'];
                var node = new _Image2.default({
                    zlevel: zlevel,
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
                });

                var titleNode = new _Text2.default({
                    zlevel: zlevel,
                    style: {
                        x: nodeWidth / 2,
                        y: nodeHeight + 15,
                        text: nodeData['title'],
                        textAlign: 'center',
                        textFill: NODE_INFO['color'] || '#fff'
                    }
                });

                group.add(node);
                group.add(titleNode);
            }

            this.nodes[group['id']] = group;
            return group;
        }
    }, {
        key: 'addContainer',
        value: function addContainer(type, position) {
            var _this5 = this;

            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var scale = this.status.scale;
            var GROUP_TYPES = this.state.config.GROUP_TYPES;
            var _GROUP_TYPES$type = GROUP_TYPES[type],
                titleAlign = _GROUP_TYPES$type.titleAlign,
                titleBgColor = _GROUP_TYPES$type.titleBgColor;

            var rootPosition = this.rootGroup.position;
            var containerGroup = this.addGroup(Object.assign({
                position: [(0, _math.divi)(position[0] - rootPosition[0], scale), (0, _math.divi)(position[1] - rootPosition[1], scale)],
                zlevel: 0,
                onmousedown: function onmousedown(e) {
                    if (_this5.status.arrowTargetNode && _this5.status.arrowTargetNode.id == containerGroup.id) {
                        //连线时候，当作目标节点，只连线，不设为焦点
                        return _this5.stopEvent(e);
                    }
                    _this5.setActiveNode(containerGroup);
                    return _this5.stopEvent(e);
                },
                onmouseover: function onmouseover(e) {
                    _this5.status.hoverGroup = containerGroup;
                    if (_this5.status.activeArrow) {
                        _this5.setArrowTargetNode(containerGroup);
                    }
                    if (_this5.onMouseOver) {
                        _this5.onMouseOver(option, e);
                    }
                    return _this5.stopEvent(e);
                },
                onmouseout: function onmouseout(e) {
                    if (_this5.status.hoverGroup && (_this5.status.hoverGroup.id = containerGroup.id)) {
                        _this5.status.hoverGroup = null;
                    }
                    _this5.resetArrowTargetNode();
                    if (_this5.onMouseOut) {
                        _this5.onMouseOut(option, e);
                    }
                    return _this5.stopEvent(e);
                }
            }, option));

            var containerData = this.data(containerGroup, Object.assign(option, {
                type: 'container',
                containerType: type,
                title: option.title != null ? option.title : GROUP_TYPES[type]['title']
            }));

            var containerRect = void 0;
            if (GROUP_TYPES[type]['shape'] == 'image') {
                containerRect = new _Image2.default({
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
                });

                this.data(containerRect, {
                    type: "image"
                });
            } else {
                containerRect = new _Rect2.default({
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
                });
                if (GROUP_TYPES[type]['animateTime']) {
                    containerRect.animate('style', true).when(GROUP_TYPES[type]['animateTime'], GROUP_TYPES[type]['animateOption']).start();
                }
            }

            var contentGroup = this.addGroup({
                id: containerGroup.id + "_c",
                position: [0, 0]
            });

            this.data(contentGroup, {
                type: "containerContent"
            });

            var titleContainer = new _Text2.default({
                style: {
                    x: GROUP_TYPES[type]['width'] / 2,
                    y: titleAlign == 'top' ? 10 : GROUP_TYPES[type]['height'] - 22, //
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
            });

            var titleBk = new _Rect2.default({

                shape: {
                    x: 0,
                    y: titleAlign == 'top' ? 0 : GROUP_TYPES[type]['height'] - 30, //
                    width: GROUP_TYPES[type]['width'],
                    height: 30
                },
                style: Object.assign({
                    fill: titleBgColor || '#185069'
                    //stroke: 'red'
                }),
                zlevel: -1
            });

            containerGroup.add(containerRect);
            containerGroup.add(contentGroup);
            containerGroup.add(titleContainer);
            containerGroup.add(titleBk);
            this.containers[containerGroup.id] = containerGroup;
            return containerGroup;
        }
    }, {
        key: 'connectActiveArrow',
        value: function connectActiveArrow() {
            if (this.status.arrowTargetNode) {
                this.clearData(this.status.activeArrow);
                this.addRelation(this.status.activeGroup, this.status.arrowTargetNode, this.status.activeArrow);
                this.status.activeArrow = null;
                // this.setActiveNode(this.status.arrowTargetNode)
                this.resetArrowTargetNode();
            } else {
                this.clearData(this.status.activeArrow);
                this.rootGroup.remove(this.status.activeArrow);
                delete this.arrows[this.status.activeArrow.id];
                this.status.activeArrow = null;
            }
        }
    }, {
        key: 'addRelation',
        value: function addRelation(startNode, endNode, arrow) {
            var newId = "_" + startNode.id + "_" + endNode.id + "_";
            this.arrows[newId] = this.arrows[arrow.id];
            delete this.arrows[arrow.id];
            arrow['id'] = newId;
            this.refreshArrow(arrow);
        }

        //拖拽节点 容器布局使用的方法，有待优化

    }, {
        key: 'resetContainerContent',
        value: function resetContainerContent(container) {
            var content = container.childAt(1);
            //   container.position[0]+=content.position[0]
            //   container.position[1] +=content.position[1]
            content.children().map(function (c) {
                c.position[0] += content.position[0];
                c.position[1] += content.position[1];
                c.dirty(true);
            });
            content.position = [0, 0];
            content.dirty(true);
        }
    }, {
        key: 'refreshContainerReact',
        value: function refreshContainerReact(container) {
            var cleft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var cright = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var GROUP_TYPES = this.state.config.GROUP_TYPES;
            var _GROUP_TYPES$data$con = GROUP_TYPES[this.data(container).containerType],
                titleAlign = _GROUP_TYPES$data$con.titleAlign,
                titleBgColor = _GROUP_TYPES$data$con.titleBgColor;

            var rect = container.childAt(0),
                content = container.childAt(1),
                title = container.childAt(2),
                titleBk = container.childAt(3);
            //空的容器，不作处理，保持默认形状
            if (content.children().length == 0) {
                return;
            }

            var brect = content.getBoundingRect();

            /* let testshape= new RectShape({
                shape:brect,
                style:{
                    stroke:'red',
                    fill:'transparent'
                }
            })
            container.add(testshape)  */
            //return 
            var rx = brect.x - 40,
                ry = brect.y - 40,
                rwidth = brect.width + 80,
                rheight = brect.height + 80;

            if (cleft !== false && cright !== false) {
                rx = rx + cleft;
                ry = ry + cright;
            }
            container.position = [rx, ry];
            container.dirty(true);

            content.position[0] = -brect.x + 40;
            content.position[1] = -brect.y + 40;
            content.dirty(true);

            if (this.data(rect)['type'] == 'image') {
                rect.style = Object.assign(rect.style, {
                    x: 0,
                    y: 0,
                    width: rwidth,
                    height: rheight
                });
            } else {
                rect.shape = Object.assign(brect, {
                    x: 0,
                    y: 0,
                    width: rwidth,
                    height: rheight
                });
            }

            title.style.x = rwidth / 2;
            title.style.y = titleAlign == 'top' ? 10 : rheight - 22; //ry + 

            titleBk.shape.x = 0;
            titleBk.shape.y = titleAlign == 'top' ? 0 : rheight - 30;
            titleBk.shape.width = rwidth;

            //  title.dirty(true)
            titleBk.dirty(true);
            rect.dirty(true);
        }
    }, {
        key: 'bindNodeToContainer',
        value: function bindNodeToContainer(container, node) {
            var content = container.childAt(1);
            var scale = this.status.scale;

            content.add(node);
            var offset = this.getNodeOffset(container);
            node.position = [node.position[0] - offset[0] / scale, node.position[1] - offset[1] / scale];
            this.refreshContainerReact(container, container.position[0], container.position[1]);
            //node.position=[node.position[0]-container.position[0],node.position[1]-container.position[1]]
            //node.dirty(true)
            //this.zr.refresh()
            // 
        }
    }, {
        key: 'unbindNodeToContainer',
        value: function unbindNodeToContainer() {}
    }, {
        key: 'toImage',
        value: function toImage() {}
    }, {
        key: 'data',
        value: function data(node, map) {
            var data = this._data,
                id = node['id'] || node;

            if (!data[id]) {
                data[id] = {};
            }

            if (map) {
                data[id] = Object.assign({}, data[id], map);
            }

            return data[id];
        }
    }, {
        key: 'clearData',
        value: function clearData(node) {
            var data = this._data,
                id = node['id'] || node;

            delete data[id];
        }

        //序列化

    }, {
        key: 'serialize',
        value: function serialize() {
            var nodes = this.nodes,
                arrows = this.arrows,
                containers = this.containers;

            var data = {
                position: this.rootGroup.position,
                scale: this.rootGroup.scale
            };

            var nodesData = {},
                arrowsData = {},
                containersData = {};
            for (var key in nodes) {
                var node = nodes[key];
                var nodeData = this.data(node);
                nodesData[key] = {
                    id: node['id'],
                    position: node['position']
                    //  title: nodeData['title'],
                    //  _pid:this.data(node.parent)['type'] == "containerContent"?node.parent.parent.id:parent.id,
                    //  _nodeType:nodeData['nodeType'],
                    //  _data: nodeData['data']
                };
                this.data(node, {
                    pid: this.data(node.parent)['type'] == "containerContent" ? node.parent.parent.id : parent.id
                });
            }

            for (var _key in arrows) {
                var arrow = arrows[_key];
                arrowsData[_key] = {
                    id: arrow['id'],
                    arrowType: arrow['arrowType']
                    // _data: arrow['_data']
                };
            }

            for (var _key2 in containers) {
                var container = containers[_key2];
                containersData[_key2] = {
                    id: container.id,
                    position: container.position
                };
            }

            data['nodes'] = nodesData;
            data['arrows'] = arrowsData;
            data['containers'] = containersData;
            data['_data'] = this._data;

            return data;
        }

        //warn:这个方法是异步执行，但是没有提供回调，有待改造
        //反序列化

    }, {
        key: 'deserialization',
        value: function deserialization(data, callback) {
            var _this6 = this;

            var position = data.position,
                scale = data.scale,
                containers = data.containers,
                nodes = data.nodes,
                arrows = data.arrows,
                _data = data._data;


            this.resetPage({}, function () {
                for (var key in containers) {
                    var container = containers[key];
                    var containerData = _data[container['id']];
                    _this6.addContainer(containerData['containerType'], container.position, Object.assign({ id: container.id }, containerData));
                }

                for (var _key3 in nodes) {
                    var node = nodes[_key3];
                    var nodeData = _data[node['id']];
                    var _container = _this6.containers[nodeData['pid']];
                    _this6.addNode(nodeData['nodeType'], node['position'], Object.assign({ id: node.id }, nodeData), _container && _container.childAt(1));
                }

                for (var _key4 in _this6.containers) {

                    _this6.refreshContainerReact(_this6.containers[_key4], _this6.containers[_key4].position[0], _this6.containers[_key4].position[1]);
                }

                for (var _key5 in arrows) {
                    var arrow = arrows[_key5];
                    var arrowData = {} || _data[arrow['id']];
                    var ids = arrow.id.split('_');
                    var startNode = ids[1].length == 4 ? _this6.containers[ids[1]] : _this6.nodes[ids[1]],
                        endNode = ids[2].length == 4 ? _this6.containers[ids[2]] : _this6.nodes[ids[2]];
                    var arrowGroup = _this6.addArrow({
                        x: startNode.position[0],
                        y: startNode.position[1]
                    }, {
                        x: endNode.position[0],
                        y: endNode.position[1]
                    }, Object.assign({
                        id: arrow['id'],
                        arrowType: arrow['arrowType']
                    }, arrowData));

                    _this6.refreshArrow(arrowGroup);
                }

                _this6.rootGroup.position = position;
                _this6.rootGroup.scale = scale || [1, 1];
                _this6.status.scale = scale[0];
                callback && callback();
            });
        }

        //######################所有工具栏点击操作################################
        //工具栏，清空页面

    }, {
        key: 'resetPage',
        value: function resetPage() {
            var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];

            this.zr.clear();
            this.nodes = {};
            this.arrows = {};
            this.containers = {};
            this._data = {};
            this.clearData(this.rootGroup);
            this.rootGroup = null;

            this.status = {
                hoverGroup: null,
                maxIndex: 99,
                minIndex: 1,
                scale: 1,
                maxScale: 5,
                minScale: 0.2,
                locked: false,
                searchIndex: 0,
                dataStr: '' //整张图序列化之后的字符串
                , dataStrValid: true
            };

            this._initRootGroup();
            callback && callback();
        }
    }, {
        key: '_initRootGroup',
        value: function _initRootGroup() {
            var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.rootGroup = new _Group2.default(Object.assign({
                position: [0, 0],
                id: new Date().getTime()
            }));

            this.data(this.rootGroup, {
                type: 'rootGroup'
            });

            this.zr.add(this.rootGroup);
        }

        //比例操作

    }, {
        key: 'zoom',
        value: function zoom(scale) {
            var _status2 = this.status,
                maxScale = _status2.maxScale,
                minScale = _status2.minScale;

            if (scale < minScale || scale > maxScale) {
                return;
            }
            this.rootGroup.scale = [scale, scale];
            this.rootGroup.dirty(true);
            this.status.scale = scale;
            //this.rootGroup.refresh()
        }
        //工具栏，放大

    }, {
        key: 'zoomIn',
        value: function zoomIn() {
            var scale = (0, _math.add)(this.status.scale, 0.05);
            this.zoom(scale);
        }

        //工具栏，缩小

    }, {
        key: 'zoomOut',
        value: function zoomOut() {
            var scale = (0, _math.sub)(this.status.scale, 0.05);
            this.zoom(scale);
        }

        //工具栏，正常大小

    }, {
        key: 'zoomReset',
        value: function zoomReset() {
            var scale = this.status.scale = 1;
            this.zoom(scale);
            /* if(this.status.activeGroup){
                 this.lookupNode(this.status.activeGroup)
             }*/
        }

        //设置搜索关键字

    }, {
        key: 'setKeyWord',
        value: function setKeyWord(e) {
            this.setState({
                keyword: e.target.value,
                searchIndex: 0
            });
        }

        //工具栏，搜索节点

    }, {
        key: 'searchNode',
        value: function searchNode() {
            var nodes = this.nodes;
            var _state = this.state,
                keyword = _state.keyword,
                searchIndex = _state.searchIndex;

            var index = 0;
            if (keyword == '') {
                return;
            }

            for (var key in nodes) {
                if (index++ < searchIndex) {
                    continue;
                }
                var node = nodes[key];
                var nodeTitle = this.data(node)['title'];
                if (nodeTitle && nodeTitle.indexOf(keyword) != -1 && (this.status.activeGroup == null || this.status.activeGroup.id != node.id)) {
                    this.setActiveNode(node);
                    this.setState({
                        searchIndex: index
                    });
                    this.lookupNode(node);
                    break;
                }
            }

            if (this.getMapLength(nodes) == index) {
                this.setState({
                    searchIndex: 0
                });
            }
        }
    }, {
        key: 'lookupNode',
        value: function lookupNode(node) {
            var offset = this.getNodeOffset(node);
            var rootPosition = this.rootGroup.position;
            var _state2 = this.state,
                mapWidth = _state2.mapWidth,
                mapHeight = _state2.mapHeight;
            var scale = this.status.scale;

            var xMove = (0, _math.sub)((0, _math.divi)(mapWidth, 2), (0, _math.add)(offset[0] + rootPosition[0], node.childAt(0).style.width * scale)),
                yMove = (0, _math.sub)((0, _math.divi)(mapHeight, 2), (0, _math.add)(offset[1] + rootPosition[1], node.childAt(0).style.height * scale));

            this.rootGroup.position = [(0, _math.add)(this.rootGroup.position[0], xMove), (0, _math.add)(this.rootGroup.position[1], yMove)];
            this.rootGroup.dirty(true);
        }

        //工具栏，搜索文本框回车搜索

    }, {
        key: 'enterSearch',
        value: function enterSearch(e) {
            if (e.keyCode == 13) {
                //按下了enter键
                this.searchNode();
            }
        }

        //工具栏，显示json

    }, {
        key: 'setTxtData',
        value: function setTxtData(option) {
            ///alert(option.checked)
            if (!option.checked && !this.$txt) {
                var data = this.serialize();
                this.$txt = document.createElement("textarea");
                this.$txt.className = "json";
                this.paper.appendChild(this.$txt);
                this.$txt.value = JSON.stringify(data, '', 2);
            } else {
                var _data2 = JSON.parse(this.$txt.value);
                this.deserialization(_data2);
                this.$txt.remove();
                this.$txt = null;
            }

            //console.log(JSON.stringify(data, null, 10))
            /* this.setState({
                dataStr: JSON.stringify(data, null, 10),
                dataStrValid: true
            }) */
        }

        //######################所有右键菜单操作################################
        //右键菜单栏，创建节点操作

    }, {
        key: 'createNode',
        value: function createNode(type, position) {
            var _this7 = this;

            // this.refs.rightmenu.hideMenu()
            setTimeout(function () {
                var title = window.prompt("请输入节点名称:", "新建节点");
                if (title == null) {
                    return;
                }
                var node = _this7.addNode(type, position, {
                    title: title
                });
                var activeGroup = _this7.status.activeGroup;

                if (activeGroup && _this7.data(activeGroup)['type'] == 'container') {
                    _this7.bindNodeToContainer(activeGroup, node);
                }
            }, 100);
        }

        //创建组操作

    }, {
        key: 'createContainer',
        value: function createContainer(type, position) {
            var _this8 = this;

            // this.refs.rightmenu.hideMenu()
            setTimeout(function () {
                var title = window.prompt("请输入组名称:", "新建组");
                if (title == null) {
                    return;
                }
                var group = _this8.addContainer(type, position, {
                    title: title
                });
                var activeGroup = _this8.status.activeGroup;

                if (activeGroup && _this8.data(activeGroup)['type'] == 'container') {
                    _this8.bindNodeToContainer(activeGroup, group);
                }
            }, 100);
        }

        //右键菜单 连接

    }, {
        key: 'addActiveArrow',
        value: function addActiveArrow(e) {
            var arrowPosition = this.getActiveArrowPosition(e);
            this.status.activeArrow = this.addArrow(arrowPosition.start, arrowPosition.end, {
                arrowType: e.type
            });
            return this.status.activeArrow;
        }

        //右键菜单，删除

    }, {
        key: 'deleteHandle',
        value: function deleteHandle(e) {
            var activeGroup = this.status.activeGroup;

            if (this.data(activeGroup)['type'] == 'node') {
                this.deleteNode(activeGroup);
            } else if (this.data(activeGroup)['type'] == 'container') {
                this.deleteContainer(activeGroup);
            }
        }
    }, {
        key: 'deleteNode',
        value: function deleteNode(node) {
            var _this9 = this;

            if (typeof node == 'string') {
                node = this.nodes[node];
            }
            if (!node) {
                return;
            }
            var arrowIds = this.findArrowIdsByNode(node),
                arrows = this.arrows;

            arrowIds.map(function (id, index) {
                var arrow = arrows[id];
                arrow.parent.remove(arrow);
                _this9.clearData(arrow);
                delete arrows[id];
            });

            delete this.nodes[node['id']];
            this.clearData(node);
            node.parent.remove(node);
        }
    }, {
        key: 'deleteContainer',
        value: function deleteContainer(container) {
            var _this10 = this;

            var content = container.childAt(1);
            var childs = content.children();
            childs.map(function (child, index) {
                _this10.deleteNode(child);
            });
            delete this.containers[container['id']];
            this.clearData(container);
            container.parent.remove(container);
        }
    }, {
        key: 'getActiveArrowPosition',
        value: function getActiveArrowPosition(e) {
            var _state$config2 = this.state.config,
                NODE_INFO = _state$config2.NODE_INFO,
                NODE_TYPES = _state$config2.NODE_TYPES;

            var activeGroup = this.status.activeGroup;

            var _activeGroup$getBound = activeGroup.getBoundingRect(),
                width = _activeGroup$getBound.width,
                height = _activeGroup$getBound.height;

            var paperOffset = this.getOffset(this.paper);
            var rootPosition = this.rootGroup.position;
            var startPosition = this.getNodeOffset(activeGroup);
            var endPosition = [e.clientX - paperOffset.left - rootPosition[0], e.clientY - paperOffset.top - rootPosition[1]];

            var scale = this.status.scale;
            var startArrowOffset = activeGroup.nodeType && NODE_TYPES[activeGroup.nodeType].arrowOffset || [0, 0];

            // let startArrowCenter =activeGroup.nodeType&&  NODE_TYPES[activeGroup.nodeType].arrowCenter
            return {
                start: {
                    x: (0, _math.divi)(startPosition[0], scale) + startArrowOffset[0],
                    y: (0, _math.divi)(startPosition[1], scale) + startArrowOffset[1]
                },
                end: {
                    x: (0, _math.divi)(endPosition[0], scale) + (endPosition[0] > startPosition[0] ? -5 : 5),
                    y: (0, _math.divi)(endPosition[1], scale) + (endPosition[1] > startPosition[1] ? -5 : 5)
                }
            };
        }

        //工具栏方法 重命名

    }, {
        key: 'renameHandle',
        value: function renameHandle(e) {
            var _this11 = this;

            this.refs.rightmenu.hideMenu();
            setTimeout(function () {
                var activeGroup = _this11.status.activeGroup;
                var activeGroupData = _this11.data(activeGroup);
                var title = window.prompt("请输入新的名字", activeGroupData['title']);
                if (title == null) {
                    return;
                }
                if (activeGroupData['type'] == 'container') {
                    _this11.renameContainer(activeGroup, title);
                } else if (activeGroupData['type'] == 'node') {
                    _this11.renameNode(activeGroup, title);
                }
            }, 100);
        }

        //给组重命名

    }, {
        key: 'renameContainer',
        value: function renameContainer(container, title) {
            var titleNode = container.childAt(2);
            titleNode.style.text = title;
            this.data(container, {
                title: title
            });
            titleNode.dirty(true);
        }

        //给节点重命名

    }, {
        key: 'renameNode',
        value: function renameNode(node, title) {
            var titleNode = node.childAt(1);
            titleNode.style.text = title;
            this.data(node, {
                title: title
            });
            titleNode.dirty(true);
        }

        //#######################所有监听事件#######################

        //拖拽结束监听事件

    }, {
        key: 'onDragEnd',
        value: function onDragEnd(dragTarget) {
            //有待实现
        }
    }]);

    return FlowMap;
}();

exports.default = FlowMap;