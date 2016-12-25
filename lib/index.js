'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _zrender = require('zrender/src/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Group = require('zrender/src/container/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Path = require('zrender/src/graphic/Path');

var _Path2 = _interopRequireDefault(_Path);

var _Line = require('zrender/src/graphic/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

var _Rect = require('zrender/src/graphic/shape/Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _Image = require('zrender/src/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Text = require('zrender/src/graphic/Text');

var _Text2 = _interopRequireDefault(_Text);

var _event = require('zrender/src/core/event');

var _event2 = _interopRequireDefault(_event);

var _math = require('./math');

var _index = require('./jsx/index.js');

var _index2 = _interopRequireDefault(_index);

var _path = require('zrender/src/tool/path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowMap = function (_React$Component) {
    _inherits(FlowMap, _React$Component);

    function FlowMap(props) {
        _classCallCheck(this, FlowMap);

        var _this2 = _possibleConstructorReturn(this, (FlowMap.__proto__ || Object.getPrototypeOf(FlowMap)).call(this, props));

        _this2.state = {
            mapWidth: 1000,
            mapHeight: 1000
            //   ,nodeMenuHandle:this.nodeMenuHandle

            , config: _this2.props.config,
            checkBtn: "",
            keyword: "" //搜索关键字
            , searchIndex: 0
        };

        _this2.status = {
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

        _this2.rootGroup = null;

        _this2.nodes = {};

        _this2.arrows = {};

        _this2.containors = {};
        return _this2;
    }

    _createClass(FlowMap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            this._initPaper();
            this._initEvents();
            //this._initRootGroup()
            // this._initMap()
            this.paperTop = this.getTop(this.refs.paper);
            this.paperLeft = this.getLeft(this.refs.paper);
            setTimeout(function () {
                this.refreshFillStyle();
            }.bind(this), 100);
        }
    }, {
        key: 'render',
        value: function render() {
            return _index2.default.bind(this)();
        }
    }, {
        key: '_initPaper',
        value: function _initPaper() {
            var _this = this;
            this.zr = _zrender2.default.init(this.refs.paper);
            this.rootGroup = new _Group2.default({
                position: [0, 0],
                _type: "rootGroup"

            });
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
            this.zr.add(this.rootGroup);
            this.test();
        }
    }, {
        key: 'test',
        value: function test() {
            var a = this.addArrow({ x: 110, y: 40 }, { x: 200, y: 300 });
            var node1 = this.addNode('zuzhi', 299, 200);
            var node2 = this.addNode('zzuzhi', 499, 200);
            var node3 = this.addNode('zzuzhi', 199, 100);

            var container1 = this.addContainer(0, 100, 200);

            this.bindNodeToContainor(container1, node1);
            this.bindNodeToContainor(container1, node2);
            this.bindNodeToContainor(container1, node3);

            // this.bindNodeToContainor(container1,node1)
        }
    }, {
        key: '_initEvents',
        value: function _initEvents() {
            var _this3 = this;

            var dStartX = void 0,
                dStartY = void 0,
                dragTarget = void 0;
            var startX = void 0,
                startY = void 0;
            window.addEventListener("resize", this.refreshFillStyle.bind(this));
            document.body.addEventListener("click", function () {
                console.log("click");
            });
            document.body.addEventListener("mousedown", function (e) {
                if (_this3.status.hoverGroup && _this3.status.locked == false) {
                    dragTarget = _this3.status.hoverGroup;
                } else {
                    dragTarget = _this3.rootGroup;
                    // this.status.activeGroup = this.rootGroup
                }

                if (_this3.status.activeArrow) {
                    if (_this3.status.arrowTargetNode) {
                        var newId = "_" + _this3.status.activeGroup.id + "_" + _this3.status.arrowTargetNode.id + "_";
                        var arrow = _this3.arrows[newId] = _this3.arrows[_this3.status.activeArrow.id];
                        delete _this3.arrows[_this3.status.activeArrow.id];
                        arrow['id'] = newId;
                        _this3.refreshArrow(_this3.status.activeArrow);

                        _this3.status.activeArrow = null;
                        _this3.setActiveNode(_this3.status.arrowTargetNode);
                        _this3.resetArrowTargetNode();
                    } else {
                        _this3.rootGroup.remove(_this3.status.activeArrow);
                        delete _this3.arrows[_this3.status.activeArrow.id];
                        _this3.status.activeArrow = null;
                    }
                }

                dStartX = e.pageX;
                dStartY = e.pageY;
                startX = dragTarget['position'][0];
                startY = dragTarget['position'][1];
            });
            document.body.addEventListener("mouseup", function () {
                if (dragTarget) {
                    dragTarget = null;
                }
            });

            document.body.addEventListener("mousemove", function (e) {
                if (dragTarget) {
                    var scale = _this3.status.scale;

                    if (dragTarget['_type'] == 'rootGroup') {
                        dragTarget.position = [startX + e.pageX - dStartX, startY + e.pageY - dStartY];
                    } else {
                        dragTarget.position = [startX + (0, _math.divi)(e.pageX - dStartX, scale), startY + (0, _math.divi)(e.pageY - dStartY, scale)];

                        var arrows = _this3.arrows;
                        var targetId = dragTarget.id;
                        //刷新所有的箭头，性能不好，有待优化
                        for (var key in arrows) {
                            var arrow = arrows[key];
                            if ((arrow['id'] + "").indexOf("_" + targetId + "_") != -1) {
                                _this3.refreshArrow(arrow);
                            }
                        }
                    }

                    dragTarget.dirty(true);
                    if (dragTarget.parent && dragTarget.parent._type == 'containerContent') {
                        _this3.refreshContainorReact(dragTarget.parent.parent);
                    }
                    // this.testRootGroupReact()
                    _this3.zr.refresh();
                } else if (_this3.status.activeArrow) {
                    var target = _this3.status.activeGroup;
                    var activeArrowPosition = _this3.getActiveArrowPosition(e);
                    _this3.refreshArrow(_this3.status.activeArrow, activeArrowPosition.start, activeArrowPosition.end);
                    //console.log(this.status.activeArrow)
                    //refreshArrow
                }
            });

            document.body.addEventListener("mouseleave", function () {
                if (dragTarget) {
                    dragTarget = null;
                }
            });

            this.zr.on("mousedown", function () {

                _this3.setActiveNode(_this3.rootGroup);
            });

            this.refs.flowmap.addEventListener("mousewheel", function (e) {
                if (e.wheelDelta > 0) {
                    _this3.zoomIn();
                } else if (e.wheelDelta < 0) {
                    _this3.zoomOut();
                }

                e.preventDefault();
            });
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

    }, {
        key: 'add',
        value: function add(node) {
            this.rootGroup.add(node);
        }
    }, {
        key: 'refreshFillStyle',
        value: function refreshFillStyle() {
            this.setState({
                mapWidth: window.innerWidth,
                mapHeight: window.innerHeight - 46
            });

            this.paperTop = this.getTop(this.refs.paper);
            this.paperLeft = this.getLeft(this.refs.paper);
            this.zr && this.zr.resize();
        }
    }, {
        key: 'getNodeOffset',
        value: function getNodeOffset(node, position) {
            if (!position) {
                position = [0, 0];
            }

            if (node['_type'] == 'rootGroup') {
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
            return this.getOffset(node.parentNode, offset); //向上累加offset里的值
        }
    }, {
        key: 'getPaperOffset',
        value: function getPaperOffset() {
            var poffset = this.getOffset(this.refs.paper);
            var pleft = poffset.left,
                ptop = poffset.top - 36;
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
            //e.event.preventDefault();
            //e.event.stopPropagation();
            return e;
        }
    }, {
        key: 'getMapLength',
        value: function getMapLength(map) {
            var index = 0;
            for (var key in map) {
                index++;
            }
            return index;
        }
    }, {
        key: 'clickToolbarBtnHandle',
        value: function clickToolbarBtnHandle(option) {
            var name = option.name;
            switch (name) {
                case 'zoomin':
                    this.zoomIn();break;
                case 'zoomout':
                    this.zoomOut();break;
                case 'zoomreset':
                    this.zoomReset();break;
                case 'reset':
                    this.resetPage();break;
                //case 'pan':this.pan();break;
            }

            if (option.checkBtn) {
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
            if (this.status.locked) {
                return;
            }

            var _getPaperOffset = this.getPaperOffset();

            var pleft = _getPaperOffset.pleft;
            var ptop = _getPaperOffset.ptop;

            var paper = this.refs.paper,
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
                target: this.status.hoverGroup && this.status.hoverGroup._type || "rootGroup"
            });
        }
    }, {
        key: 'rightMenuClickHandle',
        value: function rightMenuClickHandle(index, o, e) {
            var _refs$rightmenu$state = this.refs.rightmenu.state;
            var left = _refs$rightmenu$state.left;
            var top = _refs$rightmenu$state.top;

            console.log(index);
            switch (index) {
                case 'addGroup':
                    //创建组相关操作
                    this.createContainer(o.type, left - 25, top - 25);break;
                case 'addNode':
                    //创建节点相关操作
                    if (e) {
                        this.createNode(o.type, left - 25, top - 25);
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
                default:
                    ;
            }

            this.zr.handler._lastDownButton = null; //右键菜单已经被重写了，防止源码里面对右键的锁定措施
        }
    }, {
        key: 'clearPaper',
        value: function clearPaper() {
            this.zr.clear();

            this.status = {
                activeNode: null,
                arrowTargetNode: null,
                activeArrow: null,
                dragging: false
            };
            this.nodes = {};
            this.arrows = {};
        }
    }, {
        key: 'addGroup',
        value: function addGroup(opt) {
            var group = new _Group2.default(Object.assign({
                position: [0, 0],
                style: {}
            }, opt));
            this.rootGroup.add(group);
            return group;
        }
    }, {
        key: 'setGroupZLevel',
        value: function setGroupZLevel(group, zlevel) {
            group.children().map(function (c, i) {
                c.zlevel = zlevel;
                c.dirty(0);
            });
            this.zr.refresh();
        }
    }, {
        key: 'addArrow',
        value: function addArrow(start, end) {
            var line = new _Line2.default({
                shape: {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y
                },
                style: {
                    // text:123321,
                    //textRotation:0.5
                }
            });
            var arrowPath = this.getArrowPath(start, end, 6);
            var path = _path2.default.createFromString(arrowPath);
            var group = this.addGroup({
                zlevel: -1,
                _type: 'arrow'
            });
            group.add(line);
            group.add(path);
            this.arrows[group.id] = group;
            this.rootGroup.add(group);
            return group;
        }
    }, {
        key: 'refreshArrow',
        value: function refreshArrow(group, start, end) {
            var line = group.childAt(0);
            var arrow = group.childAt(1);
            var scale = this.status.scale;

            if (start == null || end == null) {
                var ids = group['id'].split("_");
                var startOfset = this.getNodeOffset(this.nodes[ids[1]]);
                var endOfset = this.getNodeOffset(this.nodes[ids[2]]);
                var NODE_INFO = this.state.config.NODE_INFO;

                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + NODE_INFO['width'] / 2,
                    y: (0, _math.divi)(startOfset[1], scale) + NODE_INFO['height'] / 2
                };

                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + NODE_INFO['width'] / 2,
                    y: (0, _math.divi)(endOfset[1], scale) + NODE_INFO['height'] / 2
                };

                console.log(start, end, ids);
            }

            line.shape = Object.assign(line.shape, {
                x1: start.x,
                y1: start.y,
                x2: end.x,
                y2: end.y
            });

            var arrowPath = this.getArrowPath(start, end, 6);
            var path = _path2.default.createFromString(arrowPath);
            arrow['buildPath'] = path['buildPath'];
            arrow.dirty(true);
            line.dirty(true);
            this.zr.refresh();
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
        key: 'addNode',
        value: function addNode(type, x, y, title) {
            var _this4 = this;

            var scale = this.status.scale;

            var rootPosition = this.rootGroup.position;
            var _state$config = this.state.config;
            var NODE_TYPES = _state$config.NODE_TYPES;
            var NODE_INFO = _state$config.NODE_INFO;


            var group = this.addGroup({
                position: [(0, _math.divi)(x - rootPosition[0], scale), (0, _math.divi)(y - rootPosition[1], scale)],
                _type: 'node',
                _title: title || NODE_TYPES[type]['title'],
                zlevel: 1,
                onclick: function onclick(e) {
                    /* group.zlevel = 2
                     
                     group.dirty(true)
                     this.zr.refresh()*/
                    group.zlevel = 11;
                    // console.log(group)
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
                    return _this4.stopEvent(e);
                },
                onmouseout: function onmouseout(e) {
                    if (_this4.status.hoverGroup && (_this4.status.hoverGroup.id = group.id)) {
                        _this4.status.hoverGroup = null;
                    }
                    _this4.resetArrowTargetNode();
                    return _this4.stopEvent(e);
                }
            });
            var node = new _Image2.default({
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
                    shadowColor: 'yellow'
                    //  ,text: NODE_TYPES[type]['title']
                    //  ,textColor:'#666'
                    //  ,textPosition:'bottom'
                    //  ,textFont:'bold 10px verdana'
                },
                draggable: false,
                hoverable: false,
                clickable: false,
                silent: false

            });

            var titleNode = new _Text2.default({
                style: {
                    x: NODE_INFO['width'] / 2,
                    y: NODE_INFO['height'] + 15,
                    text: title || NODE_TYPES[type]['title'],
                    width: NODE_INFO['width'],
                    height: NODE_INFO['height'],
                    textAlign: 'center'

                }
            });

            group.add(node);
            group.add(titleNode);
            this.nodes[group['id']] = group;
            // this.rootGroup.addChild(node)
            //this.setActiveNode(node)
            return group;
        }

        //设置聚焦节点

    }, {
        key: 'setActiveNode',
        value: function setActiveNode(node) {
            var _status = this.status;
            var activeGroup = _status.activeGroup;
            var minIndex = _status.minIndex;
            var maxIndex = _status.maxIndex;


            if (activeGroup && activeGroup['_type'] == 'node') {
                activeGroup.childAt(0).style.shadowBlur = 0;
                this.setGroupZLevel(activeGroup, minIndex);
            }

            if (node['_type'] == 'node') {
                node.childAt(0).style.shadowBlur = 10;
                this.setGroupZLevel(node, maxIndex);
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
        key: 'addContainer',
        value: function addContainer(type) {
            var _this5 = this;

            var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
            var scale = this.status.scale;

            var rootPosition = this.rootGroup.position;
            var containerGroup = this.addGroup({
                position: [(0, _math.divi)(x - rootPosition[0], scale), (0, _math.divi)(y - rootPosition[1], scale)],
                zlevel: 0,
                _type: 'container',
                onmousedown: function onmousedown(e) {
                    _this5.setActiveNode(containerGroup);
                    return _this5.stopEvent(e);
                },
                onmouseover: function onmouseover(e) {
                    _this5.status.hoverGroup = containerGroup;
                },
                onmouseout: function onmouseout(e) {
                    if (_this5.status.hoverGroup && (_this5.status.hoverGroup.id = containerGroup.id)) {
                        _this5.status.hoverGroup = null;
                    }
                }
            });

            var containerRect = new _Rect2.default({
                shape: {
                    x: 0,
                    y: 0,
                    width: 200,
                    height: 100
                },
                style: {
                    fill: 'rgba(255, 0, 0, 0)',
                    stroke: 'red'
                },
                zlevel: 0
            });

            var contentGroup = this.addGroup({
                position: [0, 0],
                _type: "containerContent"
            });

            containerGroup.add(containerRect);
            containerGroup.add(contentGroup);
            this.containors[containerGroup.id] = containerGroup;
            return containerGroup;
        }
    }, {
        key: 'refreshContainorReact',
        value: function refreshContainorReact(container) {
            var content = container.childAt(1);
            var brect = content.getBoundingRect();
            var rect = container.childAt(0);

            rect.shape = Object.assign(brect, {
                x: brect.x - 10,
                y: brect.y - 10,
                width: brect.width + 20,
                height: brect.height + 20

            });
            rect.dirty(true);
            //console.log(brect)
            //this.zr.refresh()
        }
    }, {
        key: 'bindNodeToContainor',
        value: function bindNodeToContainor(container, node) {
            var content = container.childAt(1);
            var scale = this.status.scale;

            content.add(node);
            var offset = this.getNodeOffset(container);
            node.position = [node.position[0] - offset[0] / scale, node.position[1] - offset[1] / scale];
            this.refreshContainorReact(container);
            //node.position=[node.position[0]-container.position[0],node.position[1]-container.position[1]]
            //node.dirty(true)
            //this.zr.refresh()
            // 
        }
    }, {
        key: 'unbindNodeToContainor',
        value: function unbindNodeToContainor() {}

        //######################所有工具栏点击操作################################
        //工具栏，清空页面

    }, {
        key: 'resetPage',
        value: function resetPage() {
            this.zr.clear();
            this.nodes = {};
            this.arrows = {};
            this.containors = {};
            this.rootGroup = new _Group2.default({
                position: [0, 0]
            });
            this.zr.add(this.rootGroup);
        }

        //比例操作

    }, {
        key: 'zoom',
        value: function zoom(scale) {
            var _status2 = this.status;
            var maxScale = _status2.maxScale;
            var minScale = _status2.minScale;

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
            if (this.status.activeGroup) {
                this.lookupNode(this.status.activeGroup);
            }
        }

        //设置搜索关键字

    }, {
        key: 'setKeyWord',
        value: function setKeyWord(e) {
            this.setState({
                keyword: e.target.value
            });
        }

        //工具栏，搜索节点

    }, {
        key: 'searchNode',
        value: function searchNode() {
            var nodes = this.nodes;
            var _state = this.state;
            var keyword = _state.keyword;
            var searchIndex = _state.searchIndex;

            var index = 0;
            if (keyword == '') {
                return;
            }

            for (var key in nodes) {
                if (index++ < searchIndex) {
                    continue;
                }
                var node = nodes[key];
                if (node['_title'] && node['_title'].indexOf(keyword) != -1 && (this.status.activeGroup == null || this.status.activeGroup.id != node.id)) {
                    this.setActiveNode(node);
                    this.setState({
                        searchIndex: index
                    });
                    this.lookupNode(node);
                    break;
                }
            }

            if (this.getMapLength(nodes) == searchIndex + 1) {
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
            var _state2 = this.state;
            var mapWidth = _state2.mapWidth;
            var mapHeight = _state2.mapHeight;
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

        //######################所有右键菜单操作################################
        //右键菜单栏，创建节点操作

    }, {
        key: 'createNode',
        value: function createNode(type, x, y) {
            var node = this.addNode(type, x, y);
            var activeGroup = this.status.activeGroup;

            if (activeGroup && activeGroup['_type'] == 'container') {
                this.bindNodeToContainor(activeGroup, node);
            }
        }

        //创建组操作

    }, {
        key: 'createContainer',
        value: function createContainer(type, x, y) {
            var group = this.addContainer(type, x, y);
            var activeGroup = this.status.activeGroup;

            if (activeGroup && activeGroup['_type'] == 'container') {
                this.bindNodeToContainor(activeGroup, group);
            }
        }

        //右键菜单 连接

    }, {
        key: 'addActiveArrow',
        value: function addActiveArrow(e) {
            var arrowPosition = this.getActiveArrowPosition(e);
            this.status.activeArrow = this.addArrow(arrowPosition.start, arrowPosition.end);
            return this.status.activeArrow;
        }
    }, {
        key: 'getActiveArrowPosition',
        value: function getActiveArrowPosition(e) {
            var NODE_INFO = this.state.config.NODE_INFO;

            var activeGroup = this.status.activeGroup;

            var paperOffset = this.getOffset(this.refs.paper);
            var rootPosition = this.rootGroup.position;

            var startPosition = this.getNodeOffset(activeGroup);
            var endPosition = [e.clientX - paperOffset.left - rootPosition[0], e.clientY - paperOffset.top - rootPosition[1]];

            var scale = this.status.scale;

            return {
                start: {
                    x: (0, _math.divi)(startPosition[0], scale) + NODE_INFO['width'] / 2,
                    y: (0, _math.divi)(startPosition[1], scale) + NODE_INFO['height'] / 2
                },
                end: {
                    x: (0, _math.divi)(endPosition[0], scale) + (endPosition[0] > startPosition[0] ? -5 : 5),
                    y: (0, _math.divi)(endPosition[1], scale) + (endPosition[1] > startPosition[1] ? -5 : 5)
                }
            };
        }
    }]);

    return FlowMap;
}(_react2.default.Component);

exports.default = FlowMap;