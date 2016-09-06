'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _zrender = require('zrender/src/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Image = require('zrender/src/shape/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Path = require('zrender/src/shape/Path');

var _Path2 = _interopRequireDefault(_Path);

var _Line = require('zrender/src/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

var _Rectangle = require('zrender/src/shape/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _index = require('./jsx/index.js');

var _index2 = _interopRequireDefault(_index);

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

            , config: _this2.props.config
        };
        _this2.status = {
            activeNode: null,
            arrowTargetNode: null,
            activeArrow: null,
            dragging: false
        };

        _this2.nodes = {};
        _this2.arrows = {};
        return _this2;
    }

    _createClass(FlowMap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            window.addEventListener("resize", this.refreshFillStyle.bind(this));
            this._initPaper();
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
        key: 'rightMenuHandle',
        value: function rightMenuHandle(e) {
            e.preventDefault();
            var flowmap = this.refs.flowmap,
                rightmenu = this.refs.rightmenu.refs.rightmenu;
            var left = e.clientX,
                top = e.clientY;
            if (left > this.refs.flowmap.offsetWidth + this.refs.flowmap.offsetLeft - rightmenu.offsetWidth) {
                left = this.refs.flowmap.offsetWidth + this.refs.flowmap.offsetLeft - rightmenu.offsetWidth;
            }
            if (top > this.refs.flowmap.offsetHeight + this.refs.flowmap.offsetTop - rightmenu.offsetHeight) {
                top = this.refs.flowmap.offsetHeight + this.refs.flowmap.offsetTop - rightmenu.offsetHeight;
            }
            this.refs.rightmenu.showMenu({
                left: left,
                top: top
            });
            //console.log(e.clientX,e.clientY)
        }
    }, {
        key: 'disableDrag',
        value: function disableDrag(node) {
            if (node) {
                node.draggable = false;
            } else {
                var nodes = this.nodes;
                for (var key in nodes) {
                    nodes[key].draggable = false;
                }
            }
        }
    }, {
        key: 'enableDrag',
        value: function enableDrag(node) {
            if (node) {
                node.draggable = true;
            } else {
                var nodes = this.nodes;
                for (var key in nodes) {
                    nodes[key].draggable = true;
                }
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
        key: 'rightMenuClickHandle',
        value: function rightMenuClickHandle(index, o, e) {
            var _refs$rightmenu$state = this.refs.rightmenu.state;
            var left = _refs$rightmenu$state.left;
            var top = _refs$rightmenu$state.top;

            switch (index) {
                case 'addGroup':
                    //创建组相关操作
                    ;break;
                case 'addNode':
                    //创建节点相关操作
                    if (e) {
                        this.createNode(o.type, left - 25, top - 25);
                    }
                    ;break;
                case 'addArrow':
                    this.addActiveArrow(o);break;
                default:
                    ;
            }
        }
    }, {
        key: 'onFlowMapClickHandle',
        value: function onFlowMapClickHandle() {
            this.refs.rightmenu.hideMenu();
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
            /*  this.refs.nodemenu.setState({
                          show:false
              })*/
        }
        /*
        nodeMenuHandle(i,event){
            if(i==0){
                this.addActiveArrow(event)
                
            }else if(i==1){
                this.deleteNode()
            }
            this.refs.nodemenu.setState({
                        show:false
            })
        }*/

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
        key: 'createArrow',
        value: function createArrow() {
            return this.doArrow();
        }
    }, {
        key: 'doArrow',
        value: function doArrow(s, t) {
            var activeNode = s || this.status.activeNode,
                arrowTargetNode = t || this.status.arrowTargetNode;
            if (activeNode.id == arrowTargetNode.id) {
                return;
            }
            var arrow = this.addArrow(activeNode, arrowTargetNode);
            this.arrows[arrow['id']] = {
                arrow: arrow,
                source: activeNode.id,
                target: arrowTargetNode.id
            };
            activeNode['_sourceArrows'][arrow.id] = true;
            arrowTargetNode['_targetArrows'][arrow.id] = true;
            activeNode['_targetNodes'][arrowTargetNode.id] = true;
            arrowTargetNode['_sourceNodes'][activeNode.id] = true;

            // this.status.arrowTargetNode.style.shadowBlur=0
            this.setActiveNode(null);
            this.zr.refresh();
            return this.arrows[arrow['id']];
        }
    }, {
        key: '_initPaper',
        value: function _initPaper() {
            var _this = this;
            this.zr = _zrender2.default.init(this.refs.paper);
            this.zr.on("mouseup", function (e) {
                if (this.status.activeArrow) {
                    this.delActiveArrow();
                    if (this.status.arrowTargetNode) {
                        this.createArrow();
                    }
                }
            }.bind(this));
            /* this.zr.on("click",function(e){
                 this.refs.nodemenu.setState({
                      show:false
                 })
             }.bind(this))*/
            this.zr.on("mousemove", function (e) {
                if (this.status.activeArrow) {
                    this.refreshArrowPosition(this.status.activeArrow, this.status.activeNode, {
                        position: [e['event'].clientX - this.paperLeft, e['event'].clientY - this.paperTop],
                        style: {
                            width: 0,
                            height: 0
                        }
                    });
                    this.zr.render();
                } else if (this.status.dragging) {
                    var sarrows = this.status.activeNode._sourceArrows;
                    var tarrows = this.status.activeNode._targetArrows;
                    for (var key in sarrows) {
                        var arrow = this.arrows[key];
                        this.refreshArrowPosition(arrow['arrow'], this.nodes[arrow['source']], this.nodes[arrow['target']]);
                    }
                    for (var _key in tarrows) {
                        var _arrow = this.arrows[_key];
                        this.refreshArrowPosition(_arrow['arrow'], this.nodes[_arrow['source']], this.nodes[_arrow['target']]);
                    }
                    this.zr.render();
                }
            }.bind(this));
        }
    }, {
        key: 'addActiveArrow',
        value: function addActiveArrow(event) {
            this.status.activeArrow = this.addArrow(this.status.activeNode, {
                position: [event.clientX - 25, event.clientY],
                style: {
                    width: 0,
                    height: 0
                }
            });
            this.zr.render();
        }
    }, {
        key: 'delActiveArrow',
        value: function delActiveArrow() {
            this.zr.delShape(this.status.activeArrow['line']);
            this.zr.delShape(this.status.activeArrow['arrow']);
            this.status.activeArrow = null;
            this.zr.refresh();
        }
    }, {
        key: '_initMap',
        value: function _initMap() {
            this.house = this.addHouse();

            this.people = this.addPeople();
            this.computer = this.addComputer();
            this.zr.render();
        }
    }, {
        key: 'deleteNode',
        value: function deleteNode(delNode) {
            if (this.status.activeNode || delNode) {
                var node = delNode || this.status.activeNode;
                /**
                 * 
                 *  _sourceArrows:{},
                        _targetArrows:{},
                        _sourceNodes:{},
                        _targetNodes:{},
                 */

                for (var key in node['_sourceNodes']) {
                    delete this.nodes[key]['_targetNodes'][node.id];
                }
                for (var _key2 in node['_targetNodes']) {
                    delete this.nodes[_key2]['_sourceNodes'][node.id];
                }
                for (var _key3 in node['_sourceArrows']) {
                    //delete this.arrows[key]
                    this.deleteArrow(_key3);
                }
                for (var _key4 in node['_targetArrows']) {
                    //delete this.arrows[key]
                    this.deleteArrow(_key4);
                }

                this.zr.delShape(node.id);
                this.zr.refresh();
                delete this.nodes[node['id']];
                if (delNode == null) {
                    this.status.activeNode.style.shadowBlur = 0;
                    this.status.activeNode = null;
                }
                /*this.refs.nodemenu.setState({
                        show:false
                })*/
            }
        }
    }, {
        key: 'createNode',
        value: function createNode(type, x, y) {
            return this.addNode(type, x - this.refs.paper.offsetLeft, y - this.refs.paper.offsetTop);
        }
    }, {
        key: 'mouseOverActiveNode',
        value: function mouseOverActiveNode(node) {
            if (this.status.dragging) {
                return;
            }

            if (this.status.activeArrow) {
                if (this.isAddConnection(node)) {
                    this.status.arrowTargetNode = node;
                    node.style.shadowBlur = 10;
                    this.zr.refresh();
                }
                return;
            }
            /*
            this.refs.nodemenu.setState({
                show:true
                ,top:node['position'][1]+node.style.height
                ,left:node['position'][0]
            })*/
            this.setActiveNode(node);
        }
    }, {
        key: 'addNode',
        value: function addNode(type, x, y) {
            var _state$config = this.state.config;
            var NODE_TYPES = _state$config.NODE_TYPES;
            var NODE_INFO = _state$config.NODE_INFO;

            var node = new _Image2.default({
                position: [x, y],
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
                    shadowColor: 'yellow',
                    text: NODE_TYPES[type]['title'],
                    textColor: '#666',
                    textPosition: 'bottom',
                    textFont: 'bold 10px verdana'
                },
                draggable: true,
                hoverable: true,
                clickable: true,
                _type: type,
                _sourceArrows: {},
                _targetArrows: {},
                _sourceNodes: {},
                _targetNodes: {},

                onclick: function (e) {}.bind(this),
                onmouseover: function () {
                    this.mouseOverActiveNode(node);
                }.bind(this),
                ondragstart: function () {
                    /* this.refs.nodemenu.setState({
                           show:false
                       })*/
                    this.status.dragging = true;
                }.bind(this),
                ondragend: function () {
                    this.status.dragging = false;
                }.bind(this),
                onmouseout: function () {
                    if (this.status.activeArrow && this.status.activeNode.id !== node.id) {
                        this.status.arrowTargetNode = null;
                        node.style.shadowBlur = 0;
                        this.zr.refresh();
                        return;
                    }
                    /*
                    node.style.shadowBlur=0
                    this.zr.refresh()*/
                }.bind(this)

            });
            this.nodes[node['id']] = node;
            this.zr.addShape(node);
            this.setActiveNode(node);
            return node;
        }
    }, {
        key: 'setActiveNode',
        value: function setActiveNode(node) {
            if (node == null) {
                this.status.activeNode.style.shadowBlur = 0;
                this.status.activeNode = null;
                this.zr.render();
                return;
            } else if (this.status.activeNode && this.status.activeNode.id != node.id) {
                this.status.activeNode.style.shadowBlur = 0;
            } else if (this.status.activeNode && this.status.activeNode.id == node.id) {
                return;
            }
            node.style.shadowBlur = 10;
            this.status.activeNode = node;
            this.zr.render();
        }
    }, {
        key: 'isAddConnection',
        value: function isAddConnection(node) {
            return this.status.activeNode.id !== node.id && this.status.activeNode._targetNodes[node.id] != true;
        }
    }, {
        key: 'getArrowPath',
        value: function getArrowPath(source, target) {
            var x1 = source['position'][0],
                y1 = source['position'][1],
                x2 = target['position'][0],
                y2 = target['position'][1];
            var arrowPath = this.arrowPoint({ x: x1, y: y1 }, { x: x2, y: y2 }, 6);
            return 'M ' + x2 + ' ' + y2 + ' L ' + arrowPath[1]['x'] + ' ' + arrowPath[1]['y'] + ' L ' + arrowPath[2]['x'] + ' ' + arrowPath[2]['y'] + ' L ' + x2 + ' ' + y2 + ' Z';
        }
    }, {
        key: 'refreshArrowPosition',
        value: function refreshArrowPosition(arrowObj, source, target) {
            var x1 = source['position'][0],
                y1 = source['position'][1],
                x2 = target['position'][0],
                y2 = target['position'][1];
            var w1 = source.style.width,
                h1 = source.style.height;
            var w2 = target.style.width,
                h2 = target.style.height;

            var xl = x1 - x2,
                yl = y1 - y2;
            xl = xl > 0 ? xl : -xl;
            yl = yl > 0 ? yl : -yl;

            if (xl > yl) {
                if (x1 > x2) {
                    x2 += w2;
                    y2 += w2 / 2;
                    y1 += w1 / 2;
                } else {
                    x1 += w1;
                    y1 += w1 / 2;
                    y2 += w2 / 2;
                }
            } else {
                if (y1 > y2) {
                    y2 += h2;
                    x2 += h2 / 2;
                    x1 += h1 / 2;
                } else {
                    y1 += h1;
                    x1 += h1 / 2;
                    x2 += h2 / 2;
                }
            }

            var arrowPath = this.arrowPoint({ x: x1, y: y1 }, { x: x2, y: y2 }, 6);
            arrowObj['line'].style = Object.assign(arrowObj['line'].style, {
                xStart: x1,
                yStart: y1,
                xEnd: x2,
                yEnd: y2
            });
            arrowObj['arrow'].style = Object.assign(arrowObj['arrow'].style, {
                path: 'M ' + x2 + ' ' + y2 + ' L ' + arrowPath[1]['x'] + ' ' + arrowPath[1]['y'] + ' L ' + arrowPath[2]['x'] + ' ' + arrowPath[2]['y'] + ' L ' + x2 + ' ' + y2 + ' Z'
            });
        }
    }, {
        key: 'deleteArrow',
        value: function deleteArrow(arrowId) {
            /**
                 * 
                 *  _sourceArrows:{},
                        _targetArrows:{},
                        _sourceNodes:{},
                        _targetNodes:{},
                 */
            var arrow = this.arrows[arrowId];
            delete this.nodes[arrow['source']]['_sourceArrows'][arrowId];
            delete this.nodes[arrow['source']]['_targetNodes'][arrow['target']];

            delete this.nodes[arrow['target']]['_targetArrows'][arrowId];
            delete this.nodes[arrow['target']]['_sourceNodes'][arrow['source']];

            this.zr.delShape(arrow['arrow']['line']);
            this.zr.delShape(arrow['arrow']['arrow']);
            delete this.arrows[arrowId];
            this.zr.refresh();
        }
    }, {
        key: 'addArrow',
        value: function addArrow(source, target) {

            var line = new _Line2.default({
                style: {
                    strokeColor: '#9F9F9F',
                    lineWidth: 2
                }
            });
            var arrow = new _Path2.default({
                style: {
                    x: 0,
                    y: 0,
                    color: '#9F9F9F'
                },
                draggable: true
            });
            this.refreshArrowPosition({
                line: line,
                arrow: arrow

            }, source, target);
            this.zr.addShape(arrow);
            this.zr.addShape(line);
            return {
                line: line,
                arrow: arrow,
                id: line.id + "-" + arrow.id
            };
        }
    }, {
        key: 'drawArrowLine',
        value: function drawArrowLine(source, target) {
            var l = new _Line2.default({
                style: {
                    xStart: source['position'][0],
                    yStart: source['position'][1],
                    xEnd: target['position'][0],
                    yEnd: target['position'][1],
                    strokeColor: 'red',
                    lineWidth: 2
                }
            });
            this.zr.addShape(l);
            return l;
        }
    }, {
        key: 'arrowPoint',
        value: function arrowPoint(leftPoint, rightPoint, radius) {
            var area = Math.atan2(leftPoint.y - rightPoint.y, rightPoint.x - leftPoint.x) * (180 / Math.PI);

            var x = rightPoint.x - radius * Math.cos(area * (Math.PI / 180));
            var y = rightPoint.y + radius * Math.sin(area * (Math.PI / 180));

            var x1 = x + radius * Math.cos((area + 120) * (Math.PI / 180));
            var y1 = y - radius * Math.sin((area + 120) * (Math.PI / 180));
            var x2 = x + radius * Math.cos((area + 240) * (Math.PI / 180));
            var y2 = y - radius * Math.sin((area + 240) * (Math.PI / 180));

            return [rightPoint, {
                x: x1,
                y: y1
            }, {
                x: x2,
                y: y2
            }];
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
    }]);

    return FlowMap;
}(_react2.default.Component);

exports.default = FlowMap;