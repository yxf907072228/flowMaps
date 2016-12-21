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

var _Image = require('zrender/src/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

var _PathProxy = require('zrender/src/core/PathProxy');

var _PathProxy2 = _interopRequireDefault(_PathProxy);

var _Path = require('zrender/src/graphic/Path');

var _Path2 = _interopRequireDefault(_Path);

var _Line = require('zrender/src/graphic/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

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
            //  this._initRootGroup()
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
            /*
                    var line = new LineShape({
                            shape: {
                                x1: 10,
                                y1: 10,
                                x2: 380,
                                y2: 590
                            }
                    });*/
            var a = this.createArrow({ x: 10, y: 10 }, { x: 200, y: 300 });

            console.log(a);
            this.zr.on("click", function (e) {
                // this.refreshArrow(a,{x:10,y:10},{x:e.offsetX,y:e.offsetY})
            });
            /*
                     var path1 = pathTool.createFromString('M237.541,328.897c25.128,0,46.632-8.946,64.523-26.83c17.888-17.884,26.833-39.399,26.833-64.525V91.365c0-25.126-8.938-46.632-26.833-64.525C284.173,8.951,262.669,0,237.541,0c-25.125,0-46.632,8.951-64.524,26.84c-17.893,17.89-26.838,39.399-26.838,64.525v146.177c0,25.125,8.949,46.641,26.838,64.525C190.906,319.951,212.416,328.897,237.541,328.897zM396.563,188.15c-3.606-3.617-7.898-5.426-12.847-5.426c-4.944,0-9.226,1.809-12.847,5.426c-3.613,3.616-5.421,7.898-5.421,12.845v36.547c0,35.214-12.518,65.333-37.548,90.362c-25.022,25.03-55.145,37.545-90.36,37.545c-35.214,0-65.334-12.515-90.365-37.545c-25.028-25.022-37.541-55.147-37.541-90.362v-36.547c0-4.947-1.809-9.229-5.424-12.845c-3.617-3.617-7.895-5.426-12.847-5.426c-4.952,0-9.235,1.809-12.85,5.426c-3.618,3.616-5.426,7.898-5.426,12.845v36.547c0,42.065,14.04,78.659,42.112,109.776c28.073,31.118,62.762,48.961,104.068,53.526v37.691h-73.089c-4.949,0-9.231,1.811-12.847,5.428c-3.617,3.614-5.426,7.898-5.426,12.847c0,4.941,1.809,9.233,5.426,12.847c3.616,3.614,7.898,5.428,12.847,5.428h182.719c4.948,0,9.236-1.813,12.847-5.428c3.621-3.613,5.431-7.905,5.431-12.847c0-4.948-1.81-9.232-5.431-12.847c-3.61-3.617-7.898-5.428-12.847-5.428h-73.08v-37.691c41.299-4.565,75.985-22.408,104.061-53.526c28.076-31.117,42.12-67.711,42.12-109.776v-36.547C401.998,196.049,400.185,191.77,396.563,188.15z',
                    {
                        style: {
                            brushType: 'both',
                            lineWidth: 10,
                            strokeColor: 'blue'
                        }
                    });
            */
            /*
                    var path =  pathTool.createFromString('M237.541,328.897c25.128,0,46.632-8.946,64.523-26.83c17.888-17.884,26.833-39.399,26.833-64.525V91.365c0-25.126-8.938-46.632-26.833-64.525C284.173,8.951,262.669,0,237.541,0c-25.125,0-46.632,8.951-64.524,26.84c-17.893,17.89-26.838,39.399-26.838,64.525v146.177c0,25.125,8.949,46.641,26.838,64.525C190.906,319.951,212.416,328.897,237.541,328.897zM396.563,188.15c-3.606-3.617-7.898-5.426-12.847-5.426c-4.944,0-9.226,1.809-12.847,5.426c-3.613,3.616-5.421,7.898-5.421,12.845v36.547c0,35.214-12.518,65.333-37.548,90.362c-25.022,25.03-55.145,37.545-90.36,37.545c-35.214,0-65.334-12.515-90.365-37.545c-25.028-25.022-37.541-55.147-37.541-90.362v-36.547c0-4.947-1.809-9.229-5.424-12.845c-3.617-3.617-7.895-5.426-12.847-5.426c-4.952,0-9.235,1.809-12.85,5.426c-3.618,3.616-5.426,7.898-5.426,12.845v36.547c0,42.065,14.04,78.659,42.112,109.776c28.073,31.118,62.762,48.961,104.068,53.526v37.691h-73.089c-4.949,0-9.231,1.811-12.847,5.428c-3.617,3.614-5.426,7.898-5.426,12.847c0,4.941,1.809,9.233,5.426,12.847c3.616,3.614,7.898,5.428,12.847,5.428h182.719c4.948,0,9.236-1.813,12.847-5.428c3.621-3.613,5.431-7.905,5.431-12.847c0-4.948-1.81-9.232-5.431-12.847c-3.61-3.617-7.898-5.428-12.847-5.428h-73.08v-37.691c41.299-4.565,75.985-22.408,104.061-53.526c28.076-31.117,42.12-67.711,42.12-109.776v-36.547C401.998,196.049,400.185,191.77,396.563,188.15z')
                   
                    console.log(path)
                    this.zr.add(path)
            
                  //  this.zr.add(path1)
                    */
            //this.zr.add(line)
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

        //公共方法

    }, {
        key: 'getOffset',
        value: function getOffset(Node, offset) {
            if (!offset) {
                offset = {};
                offset.top = 0;
                offset.left = 0;
            }
            if (Node == document.body) {
                //当该节点为body节点时，结束递归
                return offset;
            }
            offset.top += Node.offsetTop;
            offset.left += Node.offsetLeft;
            return this.getOffset(Node.parentNode, offset); //向上累加offset里的值
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
        key: 'clickToolbarBtnHandle',
        value: function clickToolbarBtnHandle(key) {
            switch (key) {
                case 'zoomin':
                    this.zoomIn();break;
                case 'zoomout':
                    this.zoomOut();break;
                case 'zoomreset':
                    this.zoomReset();break;
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
                left: left - pleft,
                top: top - ptop
            });
            //console.log(e.clientX,e.clientY)
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
            /*  this.refs.nodemenu.setState({
                          show:false
              })*/
        }
    }, {
        key: 'createArrow',
        value: function createArrow(start, end) {
            var line = new _Line2.default({
                shape: {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y
                }
            });
            var arrowPath = this.getArrowPath(start, end, 6);
            var path = _path2.default.createFromString(arrowPath);
            var group = new _Group2.default({
                position: [0, 0],
                onclick: function onclick() {
                    alert();
                }
            });
            group.add(line);
            group.add(path);
            this.zr.add(group);
            return group;
        }
    }, {
        key: 'refreshArrow',
        value: function refreshArrow(group, start, end) {
            var line = group.childAt(0);
            var arrow = group.childAt(1);

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
            //  this.zr.add(path)
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
            /*
            return [rightPoint, {
            		x : x1,
            		y : y1
            	}, {
            		x : x2,
            		y : y2
            	}]*/
            return 'M ' + rightPoint.x + ' ' + rightPoint.y + ' L ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' L ' + rightPoint.x2 + ' ' + rightPoint.y2 + ' Z';
        }
    }]);

    return FlowMap;
}(_react2.default.Component);

exports.default = FlowMap;