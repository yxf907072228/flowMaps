'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _zrender = require('zrender/src/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _util = require('zrender/src/core/util');

var _util2 = _interopRequireDefault(_util);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
            , searchIndex: 0,
            dataStr: '' //整张图序列化之后的字符串
            , dataStrValid: true
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

        _this2.containers = {};

        _this2._data = {};
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
                position: [0, 0]
            });

            this.data(this.rootGroup, {
                type: "rootGroup"
            });

            this.zr.add(this.rootGroup);
            //this.test();
        }
        /*
             test(){
                 let data = {"position":[40,-44],"scale":[1,1],"nodes":{"1484597313097":{"id":1484597313097,"position":[741,180]},"1484597328845":{"id":1484597328845,"position":[13,55]},"1484597336002":{"id":1484597336002,"position":[131,121]},"1484597339675":{"id":1484597339675,"position":[225,56]},"1484597371321":{"id":1484597371321,"position":[423,-45]},"1484597377575":{"id":1484597377575,"position":[372,-162]},"1484597382643":{"id":1484597382643,"position":[379,71]},"1484597393236":{"id":1484597393236,"position":[94,-34]},"1484597412771":{"id":1484597412771,"position":[127,237]},"1484597474409":{"id":1484597474409,"position":[74,81]},"1484597487377":{"id":1484597487377,"position":[168,82]},"1484597508984":{"id":1484597508984,"position":[170,153]},"1484597514533":{"id":1484597514533,"position":[169,15]},"1484597521571":{"id":1484597521571,"position":[75,153]},"1484597528135":{"id":1484597528135,"position":[73,15]},"1484597534566":{"id":1484597534566,"position":[257,83]},"1484597664895":{"id":1484597664895,"position":[521,240]},"1484597669386":{"id":1484597669386,"position":[523,63]},"1484597673117":{"id":1484597673117,"position":[895,183]},"1484597678698":{"id":1484597678698,"position":[786,72]},"1484597749014":{"id":1484597749014,"position":[676,325]}},"arrows":{"_1484597328845_1484597336002_":{"id":"_1484597328845_1484597336002_"},"_1484597336002_1484597339675_":{"id":"_1484597336002_1484597339675_"},"_1484597336002_1484597313097_":{"id":"_1484597336002_1484597313097_"},"_1484597377575_1484597393236_":{"id":"_1484597377575_1484597393236_"},"_1484597371321_1484597393236_":{"id":"_1484597371321_1484597393236_"},"_1484597382643_1484597393236_":{"id":"_1484597382643_1484597393236_"},"_1484597412771_1484597393236_":{"id":"_1484597412771_1484597393236_"},"_1484597336002_1484597412771_":{"id":"_1484597336002_1484597412771_"},"_1484597528135_1484597514533_":{"id":"_1484597528135_1484597514533_"},"_1484597514533_1484597534566_":{"id":"_1484597514533_1484597534566_"},"_1484597474409_1484597487377_":{"id":"_1484597474409_1484597487377_"},"_1484597521571_1484597508984_":{"id":"_1484597521571_1484597508984_"},"_1484597508984_1484597534566_":{"id":"_1484597508984_1484597534566_"},"_1484597487377_1484597534566_":{"id":"_1484597487377_1484597534566_"},"_1484597534566_1484597393236_":{"id":"_1484597534566_1484597393236_"},"_1484597313097_1484597664895_":{"id":"_1484597313097_1484597664895_"},"_1484597313097_1484597669386_":{"id":"_1484597313097_1484597669386_"},"_1484597313097_1484597673117_":{"id":"_1484597313097_1484597673117_"},"_1484597313097_1484597678698_":{"id":"_1484597313097_1484597678698_"},"_1484597749014_1484597313097_":{"id":"_1484597749014_1484597313097_"},"_1484597534566_1484597313097_":{"id":"_1484597534566_1484597313097_"},"_1484597393236_1484597313097_":{"id":"_1484597393236_1484597313097_"}},"containers":{"2319":{"id":2319,"position":[93,57]},"3309":{"id":3309,"position":[792,573]},"7726":{"id":7726,"position":[53,456]}},"_data":{"2319":{"title":"新建组","type":"container","containerType":"group1","id":2319},"3309":{"title":"新建组","type":"container","containerType":"group2","id":3309},"7726":{"title":"新建组","type":"container","containerType":"group3"},"1484597313097":{"title":"新建节点","type":"node","nodeType":"fwql","id":1484597313097},"2319_c":{"type":"containerContent"},"1484597328845":{"title":"新建节点","type":"node","nodeType":"fwql","pid":2319,"id":1484597328845},"2319_r":{},"1484597336002":{"title":"新建节点","type":"node","nodeType":"jcfwl","pid":2319,"id":1484597336002},"1484597339675":{"title":"新建节点","type":"node","nodeType":"xnpzx","pid":2319,"id":1484597339675},"_1484597328845_1484597336002_":{"type":"arrow"},"_1484597336002_1484597339675_":{"type":"arrow"},"_1484597336002_1484597313097_":{"type":"arrow"},"3309_r":{"type":"image"},"3309_c":{"type":"containerContent"},"1484597371321":{"title":"新建节点","type":"node","nodeType":"jcfwl","pid":3309,"id":1484597371321},"1484597377575":{"title":"新建节点","type":"node","nodeType":"jcfwl","pid":3309,"id":1484597377575},"1484597382643":{"title":"新建节点","type":"node","nodeType":"jcfwl","pid":3309,"id":1484597382643},"1484597393236":{"title":"新建节点","type":"node","nodeType":"wljhj","pid":3309,"id":1484597393236},"1484597412771":{"title":"新建节点","type":"node","nodeType":"wljhj","pid":2319,"id":1484597412771},"_1484597377575_1484597393236_":{"type":"arrow"},"_1484597371321_1484597393236_":{"type":"arrow"},"_1484597382643_1484597393236_":{"type":"arrow"},"_1484597412771_1484597393236_":{"type":"arrow"},"_1484597336002_1484597412771_":{"type":"arrow"},"1484597438841":{"type":"rootGroup"},"7726_c":{"type":"containerContent"},"1484597474409":{"title":"机柜一","type":"node","nodeType":"xnpzx","pid":7726},"7726_r":{},"1484597487377":{"title":"机柜二","type":"node","nodeType":"xnpzx","pid":7726},"1484597498417":{},"1484597508984":{"title":"机柜三","type":"node","nodeType":"xnpzx","pid":7726},"1484597514533":{"title":"机柜四","type":"node","nodeType":"xnpzx","pid":7726},"1484597521571":{"title":"机柜五","type":"node","nodeType":"xnpzx","pid":7726},"1484597528135":{"title":"机柜六","type":"node","nodeType":"xnpzx","pid":7726},"1484597534566":{"title":"机柜七","type":"node","nodeType":"xnpzx","pid":7726},"1484597664895":{"title":"新建节点","type":"node","nodeType":"jcfwl"},"1484597669386":{"title":"新建节点","type":"node","nodeType":"jcfwl"},"1484597673117":{"title":"新建节点","type":"node","nodeType":"jcfwl"},"1484597678698":{"title":"新建节点","type":"node","nodeType":"jcfwl"},"1484597749014":{"title":"新建节点","type":"node","nodeType":"jcfwl"}}}
                 this.deserialization(data)
                
        }*/

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

            this.refs.paper.addEventListener("mousedown", function (e) {
                if (_this3.status.hoverGroup && _this3.status.locked == false) {
                    dragTarget = _this3.status.hoverGroup;
                } else {
                    dragTarget = _this3.rootGroup;
                }

                if (_this3.status.activeArrow) {
                    _this3.connectActiveArrow();
                }

                dStartX = e.pageX;
                dStartY = e.pageY;
                startX = dragTarget['position'][0];
                startY = dragTarget['position'][1];
            });

            document.body.addEventListener("mousemove", function (e) {
                if (dragTarget) {
                    var scale = _this3.status.scale;

                    if (_this3.data(dragTarget)['type'] == 'rootGroup') {
                        dragTarget.position = [startX + e.pageX - dStartX, startY + e.pageY - dStartY];
                    } else {
                        dragTarget.position = [startX + (0, _math.divi)(e.pageX - dStartX, scale), startY + (0, _math.divi)(e.pageY - dStartY, scale)];
                        if (_this3.data(dragTarget)['type'] == 'container') {
                            dragTarget.childAt(1).eachChild(function (child) {
                                _this3.refreshArrowsByNode(child);
                            });
                        } else {
                            _this3.refreshArrowsByNode(dragTarget);
                        }
                    }

                    dragTarget.dirty(true);
                    if (dragTarget.parent && _this3.data(dragTarget.parent)['type'] == 'containerContent') {
                        _this3.refreshContainerReact(dragTarget.parent.parent);
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

            document.body.addEventListener("mouseup", function () {
                if (dragTarget) {
                    _this3.onDragEnd(dragTarget);
                    dragTarget = null;
                }
            });

            document.body.addEventListener("mouseleave", function () {
                if (dragTarget) {
                    _this3.onDragEnd(dragTarget);
                    dragTarget = null;
                }
            });

            this.zr.on("mousedown", function () {

                _this3.setActiveNode(_this3.rootGroup);
            });

            this.refs.paper.addEventListener("mousewheel", function (e) {
                if (e.wheelDelta > 0) {
                    _this3.zoomIn();
                } else if (e.wheelDelta < 0) {
                    _this3.zoomOut();
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
            var toolbarHeight = this.refs.toolbar ? this.refs.toolbar.offsetHeight : 0;
            this.setState({
                mapWidth: window.innerWidth,
                mapHeight: window.innerHeight - toolbarHeight
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
            var poffset = this.getOffset(this.refs.paper);
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
                    this.resetPage();break;
                case 'json':
                    this.setTxtData();break;
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
                target: this.status.hoverGroup && this.data(this.status.hoverGroup)['type'] || "rootGroup"
            });
        }
    }, {
        key: 'rightMenuClickHandle',
        value: function rightMenuClickHandle(index, o, e) {
            var _refs$rightmenu$state = this.refs.rightmenu.state,
                left = _refs$rightmenu$state.left,
                top = _refs$rightmenu$state.top;

            switch (index) {
                case 'addGroup':
                    //创建组相关操作
                    this.createContainer(o.type, [left - 25, top - 25]);break;
                case 'addNode':
                    //创建节点相关操作
                    if (e) {
                        this.createNode(o.type, [left - 25, top - 25]);
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
            group.children().map(function (c, i) {
                c.zlevel = zlevel;
                c.dirty(0);
            });
            this.zr.refresh();
        }
    }, {
        key: 'addArrow',
        value: function addArrow() {
            var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
            var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
            var option = arguments[2];
            var ARROW_INFO = this.state.config.ARROW_INFO;

            var line = new _Line2.default({
                shape: {
                    x1: start.x,
                    y1: start.y,
                    x2: end.x,
                    y2: end.y
                },
                style: _defineProperty({}, ARROW_INFO.color && 'stroke', ARROW_INFO.color)
            });
            var arrowPath = this.getArrowPath(start, end, 6);
            var path = _path2.default.createFromString(arrowPath);
            var group = this.addGroup(Object.assign({
                zlevel: -1
            }, option));
            ARROW_INFO.color && (path.style.fill = ARROW_INFO.color);
            this.data(group, {
                type: 'arrow'
            });

            group.add(line);
            group.add(path);
            this.arrows[group.id] = group;
            this.rootGroup.add(group);
            return group;
        }
    }, {
        key: 'refreshArrowsByNode',
        value: function refreshArrowsByNode(node) {
            var _this4 = this;

            var arrows = this.arrows;
            var targetId = node.id;

            var arrowIds = this.findArrowIdsByNode(node);
            arrowIds.map(function (id, index) {
                _this4.refreshArrow(arrows[id]);
            });
        }
    }, {
        key: 'refreshArrow',
        value: function refreshArrow(group, start, end) {
            var line = group.childAt(0);
            var arrow = group.childAt(1);
            var scale = this.status.scale;
            var NODE_INFO = this.state.config.NODE_INFO;

            var nodeWidth = NODE_INFO['width'],
                nodeHeight = NODE_INFO['height'];
            var r = Math.sqrt(nodeWidth * nodeWidth + nodeHeight * nodeHeight);

            if (start == null || end == null) {
                var ids = group['id'].split("_");
                var startOfset = this.getNodeOffset(this.nodes[ids[1]]);
                var endOfset = this.getNodeOffset(this.nodes[ids[2]]);

                //交点算法，目前只支持圆形
                var xLen = endOfset[0] - startOfset[0];
                var yLen = endOfset[1] - startOfset[1];
                var zLen = Math.sqrt(Math.pow(yLen, 2) + Math.pow(xLen, 2));

                var xLow = r * xLen / zLen / 2;
                var yLow = r * yLen / zLen / 2;

                start = {
                    x: (0, _math.divi)(startOfset[0], scale) + NODE_INFO['width'] / 2 + xLow,
                    y: (0, _math.divi)(startOfset[1], scale) + NODE_INFO['height'] / 2 + yLow
                };

                end = {
                    x: (0, _math.divi)(endOfset[0], scale) + NODE_INFO['width'] / 2 - xLow,
                    y: (0, _math.divi)(endOfset[1], scale) + NODE_INFO['height'] / 2 - yLow
                };
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

        //设置聚焦节点

    }, {
        key: 'setActiveNode',
        value: function setActiveNode(node) {
            var _status = this.status,
                activeGroup = _status.activeGroup,
                minIndex = _status.minIndex,
                maxIndex = _status.maxIndex;


            if (activeGroup && this.data(activeGroup)['type'] == 'node') {
                activeGroup.childAt(0).style.shadowBlur = 0;
                this.setGroupZLevel(activeGroup, minIndex);
            }

            if (this.data(node)['type'] == 'node') {
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
        key: 'addNode',
        value: function addNode(type, position) {
            var _this5 = this;

            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var parent = arguments[3];
            var scale = this.status.scale;

            var rootPosition = this.rootGroup.position;
            var _state$config = this.state.config,
                NODE_TYPES = _state$config.NODE_TYPES,
                NODE_INFO = _state$config.NODE_INFO;


            var group = this.addGroup(Object.assign({
                id: option.id || new Date().getTime(),
                position: [(0, _math.divi)(position[0] - rootPosition[0], scale), (0, _math.divi)(position[1] - rootPosition[1], scale)],
                zlevel: 1,
                onclick: function onclick(e) {
                    group.zlevel = 11;
                },
                onmousedown: function onmousedown(e) {
                    if (_this5.status.arrowTargetNode && _this5.status.arrowTargetNode.id == group.id) {
                        //连线时候，当作目标节点，只连线，不设为焦点
                        return _this5.stopEvent(e);
                    }
                    _this5.setActiveNode(group);
                    return _this5.stopEvent(e);
                },
                onmouseover: function onmouseover(e) {
                    _this5.status.hoverGroup = group;

                    if (_this5.status.activeArrow) {

                        _this5.setArrowTargetNode(group);
                    }
                    return _this5.stopEvent(e);
                },
                onmouseout: function onmouseout(e) {
                    if (_this5.status.hoverGroup && (_this5.status.hoverGroup.id = group.id)) {
                        _this5.status.hoverGroup = null;
                    }
                    _this5.resetArrowTargetNode();
                    return _this5.stopEvent(e);
                }
            }, option), parent);

            var nodeData = this.data(group, Object.assign({}, option, {
                type: 'node',
                nodeType: type,
                title: option['title'] != null ? option['title'] : NODE_TYPES[type]['title']
            }));

            var node = new _Image2.default({
                position: [0, 0],
                scale: [1, 1],
                style: {
                    x: 0,
                    y: 0,
                    image: option.icon || NODE_TYPES[type]['icon'],
                    width: NODE_INFO['width'],
                    height: NODE_INFO['height'],
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
                style: {
                    x: NODE_INFO['width'] / 2,
                    y: NODE_INFO['height'] + 15,
                    text: nodeData['title'],
                    textAlign: 'center'
                }
            });

            group.add(node);
            group.add(titleNode);
            this.nodes[group['id']] = group;
            return group;
        }
    }, {
        key: 'addContainer',
        value: function addContainer(type, position) {
            var _this6 = this;

            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var scale = this.status.scale;
            var GROUP_TYPES = this.state.config.GROUP_TYPES;

            var rootPosition = this.rootGroup.position;
            var containerGroup = this.addGroup(Object.assign({
                position: [(0, _math.divi)(position[0] - rootPosition[0], scale), (0, _math.divi)(position[1] - rootPosition[1], scale)],
                zlevel: 0,
                onmousedown: function onmousedown(e) {
                    _this6.setActiveNode(containerGroup);
                    return _this6.stopEvent(e);
                },
                onmouseover: function onmouseover(e) {
                    _this6.status.hoverGroup = containerGroup;
                },
                onmouseout: function onmouseout(e) {
                    if (_this6.status.hoverGroup && (_this6.status.hoverGroup.id = containerGroup.id)) {
                        _this6.status.hoverGroup = null;
                    }
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
                    y: GROUP_TYPES[type]['height'] + 15,
                    text: option.title,
                    textAlign: 'center',
                    font: 'bolder 14px sans-serif'
                }
            });

            containerGroup.add(containerRect);
            containerGroup.add(contentGroup);
            containerGroup.add(titleContainer);
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
                this.setActiveNode(this.status.arrowTargetNode);
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
    }, {
        key: 'refreshContainerReact',
        value: function refreshContainerReact(container) {
            var rect = container.childAt(0),
                content = container.childAt(1),
                title = container.childAt(2);

            //空的容器，不作处理，保持默认形状
            if (content.children().length == 0) {
                return;
            }

            var brect = content.getBoundingRect();
            var rx = brect.x - 10,
                ry = brect.y - 10,
                rwidth = brect.width + 20,
                rheight = brect.height + 20;

            if (this.data(rect)['type'] == 'image') {
                rect.style = Object.assign(rect.style, {
                    x: rx,
                    y: ry,
                    width: rwidth,
                    height: rheight
                });
            } else {
                rect.shape = Object.assign(brect, {
                    x: rx,
                    y: ry,
                    width: rwidth,
                    height: rheight
                });
            }

            title.style.x = rx + rwidth / 2;
            title.style.y = ry + rheight + 15;
            title.dirty(true);
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
            this.refreshContainerReact(container);
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
                };
                this.data(node, {
                    pid: this.data(node.parent)['type'] == "containerContent" ? node.parent.parent.id : parent.id
                });
            }

            for (var _key in arrows) {
                var arrow = arrows[_key];
                arrowsData[_key] = {
                    id: arrow['id']
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
            var _this7 = this;

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
                    _this7.addContainer(containerData['containerType'], container.position, Object.assign({ id: container.id }, containerData));
                }

                for (var _key3 in nodes) {
                    var node = nodes[_key3];
                    var nodeData = _data[node['id']];
                    var _container = _this7.containers[nodeData['pid']];
                    _this7.addNode(nodeData['nodeType'], node['position'], Object.assign({ id: node.id }, nodeData), _container && _container.childAt(1));
                }

                for (var _key4 in _this7.containers) {

                    _this7.refreshContainerReact(_this7.containers[_key4]);
                }

                for (var _key5 in arrows) {
                    var arrow = arrows[_key5];
                    var arrowData = _data[arrow['id']];
                    var ids = arrow.id.split('_');
                    var startNode = _this7.nodes[ids[1]],
                        endNode = _this7.nodes[ids[2]];

                    var arrowGroup = _this7.addArrow({
                        x: startNode.position[0],
                        y: startNode.position[1]
                    }, {
                        x: endNode.position[0],
                        y: endNode.position[1]
                    }, Object.assign({
                        id: arrow['id']
                    }, arrowData));

                    _this7.refreshArrow(arrowGroup);
                }

                _this7.rootGroup.position = position;
                _this7.rootGroup.scale = scale || [1, 1];
                _this7.status.scale = scale[0];
                callback && callback();
            });
        }

        //######################所有工具栏点击操作################################
        //工具栏，清空页面

    }, {
        key: 'resetPage',
        value: function resetPage() {
            var _this8 = this;

            var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];

            this.zr.clear();
            this.nodes = {};
            this.arrows = {};
            this.containers = {};
            this.clearData(this.rootGroup);
            this.rootGroup = null;

            this.status = {
                hoverGroup: null,
                maxIndex: 99,
                minIndex: 1,
                scale: 1,
                maxScale: 5,
                minScale: 0.2,
                locked: false
            };

            this.setState({
                // config:this.props.config
                //,checkBtn:""
                //,keyword:"" //搜索关键字
                searchIndex: 0,
                dataStr: '' //整张图序列化之后的字符串
                , dataStrValid: true
            }, function () {
                _this8._initRootGroup();
                callback && callback();
            });
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
        value: function setTxtData() {
            var data = this.serialize();
            this.setState({
                dataStr: JSON.stringify(data, null, 10),
                dataStrValid: true
            });
        }

        //######################所有右键菜单操作################################
        //右键菜单栏，创建节点操作

    }, {
        key: 'createNode',
        value: function createNode(type, position) {
            var _this9 = this;

            this.refs.rightmenu.hideMenu();
            setTimeout(function () {
                var title = window.prompt("请输入节点名称:", "新建节点");
                if (title == null) {
                    return;
                }
                var node = _this9.addNode(type, position, {
                    title: title
                });
                var activeGroup = _this9.status.activeGroup;

                if (activeGroup && _this9.data(activeGroup)['type'] == 'container') {
                    _this9.bindNodeToContainer(activeGroup, node);
                }
            }, 100);
        }

        //创建组操作

    }, {
        key: 'createContainer',
        value: function createContainer(type, position) {
            var _this10 = this;

            this.refs.rightmenu.hideMenu();
            setTimeout(function () {
                var title = window.prompt("请输入组名称:", "新建组");
                if (title == null) {
                    return;
                }
                var group = _this10.addContainer(type, position, {
                    title: title
                });
                var activeGroup = _this10.status.activeGroup;

                if (activeGroup && _this10.data(activeGroup)['type'] == 'container') {
                    _this10.bindNodeToContainer(activeGroup, group);
                }
            }, 100);
        }

        //右键菜单 连接

    }, {
        key: 'addActiveArrow',
        value: function addActiveArrow(e) {
            var arrowPosition = this.getActiveArrowPosition(e);
            this.status.activeArrow = this.addArrow(arrowPosition.start, arrowPosition.end);
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
            var _this11 = this;

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
                _this11.clearData(arrow);
                delete arrows[id];
            });

            delete this.nodes[node['id']];
            this.clearData(node);
            node.parent.remove(node);
        }
    }, {
        key: 'deleteContainer',
        value: function deleteContainer(container) {
            var _this12 = this;

            var content = container.childAt(1);
            var childs = content.children();
            childs.map(function (child, index) {
                _this12.deleteNode(child);
            });
            delete this.containers[container['id']];
            this.clearData(container);
            container.parent.remove(container);
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

        //工具栏方法 重命名

    }, {
        key: 'renameHandle',
        value: function renameHandle(e) {
            var _this13 = this;

            this.refs.rightmenu.hideMenu();
            setTimeout(function () {
                var activeGroup = _this13.status.activeGroup;
                var activeGroupData = _this13.data(activeGroup);
                var title = window.prompt("请输入新的名字", activeGroupData['title']);
                if (title == null) {
                    return;
                }
                if (activeGroupData['type'] == 'container') {
                    _this13.renameContainer(activeGroup, title);
                } else if (activeGroupData['type'] == 'node') {
                    _this13.renameNode(activeGroup, title);
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
}(_react2.default.Component);

exports.default = FlowMap;