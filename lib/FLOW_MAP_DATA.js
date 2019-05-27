'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ARROW_INFO = exports.NODE_INFO = exports.NODE_TYPES_LENGTH = exports.TOOLBAR_TYPES = exports.MENU_TYPES = exports.NODE_TYPES = exports.GROUP_TYPES = exports.ARROW_TYPES = undefined;

var _cloud_bk = require('./images/cloud_bk.png');

var _cloud_bk2 = _interopRequireDefault(_cloud_bk);

var _star = require('./nodes/star');

var _star2 = _interopRequireDefault(_star);

var _square = require('./nodes/square');

var _square2 = _interopRequireDefault(_square);

var _imageBk = require('./nodes/imageBk');

var _imageBk2 = _interopRequireDefault(_imageBk);

var _alertBox = require('./nodes/alertBox');

var _alertBox2 = _interopRequireDefault(_alertBox);

var _line = require('./nodes/line');

var _line2 = _interopRequireDefault(_line);

var _unit = require('./nodes/unit');

var _unit2 = _interopRequireDefault(_unit);

var _dashArrow = require('./arrows/dashArrow');

var _dashArrow2 = _interopRequireDefault(_dashArrow);

var _rightAngleArrow = require('./arrows/rightAngleArrow');

var _rightAngleArrow2 = _interopRequireDefault(_rightAngleArrow);

var _icon = require('./images/\u544A\u8B66icon.png');

var _icon2 = _interopRequireDefault(_icon);

var _shanghai_bk = require('./images/shanghai_bk.png');

var _shanghai_bk2 = _interopRequireDefault(_shanghai_bk);

var _bj_bk = require('./images/bj_bk.png');

var _bj_bk2 = _interopRequireDefault(_bj_bk);

var _my_bk = require('./images/my_bk.png');

var _my_bk2 = _interopRequireDefault(_my_bk);

var _squareNormal = require('./images/square-normal.png');

var _squareNormal2 = _interopRequireDefault(_squareNormal);

var _ = require('./images/\u7EA2\u8272\u6846.png');

var _2 = _interopRequireDefault(_);

var _unit_bk = require('./images/unit_bk.png');

var _unit_bk2 = _interopRequireDefault(_unit_bk);

var _ruqin_node = require('./images/ruqin_node.png');

var _ruqin_node2 = _interopRequireDefault(_ruqin_node);

var _safe_node = require('./images/safe_node.png');

var _safe_node2 = _interopRequireDefault(_safe_node);

var _server_node = require('./images/server_node.png');

var _server_node2 = _interopRequireDefault(_server_node);

var _jiaohuaji = require('./images/jiaohuaji.png');

var _jiaohuaji2 = _interopRequireDefault(_jiaohuaji);

var _switches_node = require('./images/switches_node.png');

var _switches_node2 = _interopRequireDefault(_switches_node);

var _unit_node = require('./images/unit_node.png');

var _unit_node2 = _interopRequireDefault(_unit_node);

var _unit_node3 = require('./images/unit_node2.png');

var _unit_node4 = _interopRequireDefault(_unit_node3);

var _virus_node = require('./images/virus_node.png');

var _virus_node2 = _interopRequireDefault(_virus_node);

var _wall_node = require('./images/wall_node.png');

var _wall_node2 = _interopRequireDefault(_wall_node);

var _blueNode = require('./images/blueNode.png');

var _blueNode2 = _interopRequireDefault(_blueNode);

var _redNode = require('./images/redNode.png');

var _redNode2 = _interopRequireDefault(_redNode);

var _yellowNode = require('./images/yellowNode.png');

var _yellowNode2 = _interopRequireDefault(_yellowNode);

var _greenNode = require('./images/greenNode.png');

var _greenNode2 = _interopRequireDefault(_greenNode);

var _blueSquare = require('./images/blueSquare.png');

var _blueSquare2 = _interopRequireDefault(_blueSquare);

var _greenSquare = require('./images/greenSquare.png');

var _greenSquare2 = _interopRequireDefault(_greenSquare);

var _redSquare = require('./images/redSquare.png');

var _redSquare2 = _interopRequireDefault(_redSquare);

var _yellowSquare = require('./images/yellowSquare.png');

var _yellowSquare2 = _interopRequireDefault(_yellowSquare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARROW_TYPES = exports.ARROW_TYPES = [{ key: "normal", title: "直线", arrow: false }, { key: "vertical", title: "垂直线", arrow: false }, { key: "bessel", title: "正弧线" }, { key: "unbessel", title: "反弧线" }, { key: 'arrow1', title: "动态正弧线", render: _dashArrow2.default }, { key: 'arrow2', title: "动态反弧线", render: _dashArrow2.default, way: -1 }, { key: 'raarrow', title: "直角箭头", render: _rightAngleArrow2.default }]; /* import para from './images/para.png'
                                                                                                                                                                                                                                                                                                                                                                                                                            import fwql from './images/fwql.png'
                                                                                                                                                                                                                                                                                                                                                                                                                            import jcfwl from './images/jcfwl.png'
                                                                                                                                                                                                                                                                                                                                                                                                                            import xnpzx from './images/xnpzx.png'
                                                                                                                                                                                                                                                                                                                                                                                                                            import wljhj from './images/wljhj.png'
                                                                                                                                                                                                                                                                                                                                                                                                                            import zydd from './images/zydd.png' */
var GROUP_TYPES = exports.GROUP_TYPES = {
    group1: {
        title: '用户组',
        // titleAlign:'top',  //top bottom
        width: 200,
        height: 100,
        style: {
            lineWidth: 1,
            stroke: '#206D7D'
        }
    },
    group2: {
        title: '云平台',
        shape: 'image',
        image: _cloud_bk2.default,
        width: 300,
        height: 150
    },
    group3: {
        title: '基站',
        titleAlign: 'top',
        titleBgColor: 'orange',
        width: 150,
        height: 200,
        style: {
            lineWidth: 5,
            lineDash: [10, 10],
            stroke: "orange"
        },
        animateTime: 1000,
        animateOption: {
            lineDashOffset: -20
        }
    }
};

var NODE_TYPES = exports.NODE_TYPES = { /* 
                                        fwql:{icon:fwql,level:1,title:'机柜'},
                                        jcfwl:{icon:jcfwl,level:2,title:'数据库',width:10,height:10},
                                        xnpzx:{icon:xnpzx,level:1,title:'基站服务器'},
                                        wljhj:{icon:wljhj,level:2,title:'网络交换机'},
                                        zydd:{icon:zydd,level:1,title:'路由器'}, */

    alertBox:{render:alertRender,zlevel:100,title:"告警消息",width:80,height:60,icon:warnBk,warnicon:warnIcon,color:'red',arrowCenter:true},
    unitNode1: { title: "单位节点一", width: 40, height: 50, icon: _unit_node2.default, color: '#ff106e', arrowCenter: true },
    unitNode2: { title: "单位节点二", width: 40, height: 50, icon: _unit_node4.default, color: '#D3D6D9', arrowCenter: true },

    safeNode: { title: "安全监测", width: 40, height: 50, icon: _safe_node2.default, color: '#D3D6D9', arrowCenter: true },
    serverNode: { title: "服务器", width: 40, height: 50, icon: _server_node2.default, color: '#D3D6D9', arrowCenter: true },
    jiaohuanNode: { title: "交换机", width: 70, height: 50, icon: _jiaohuaji2.default, color: '#D3D6D9', arrowCenter: true },
    wangguanNode: { title: "网关", width: 70, height: 50, icon: _switches_node2.default, color: '#D3D6D9', arrowCenter: true },
    ruqinNode: { title: "入侵检测", width: 70, height: 50, icon: _ruqin_node2.default, color: '#D3D6D9', arrowCenter: true },
    wallNode: { title: "防火墙", width: 50, height: 80, icon: _wall_node2.default, color: '#D3D6D9' },
    jiankongNode: { title: "主机监控", width: 40, height: 50, icon: _unit_bk2.default, color: '#D3D6D9', arrowCenter: true },
    bdNode: { title: "防病毒", width: 40, height: 50, icon: _virus_node2.default, color: '#D3D6D9', arrowCenter: true },

    unit1: { render: _unit2.default, title: "单位", width: 40, height: 50, icon: _unit_bk2.default, color: '#D3D6D9', arrowCenter: true },
    suo1: { render: _imageBk2.default, title: "所-正常", titleX: 40, titleY: 15, content: '100', contentX: 40, contentY: 35, width: 80, height: 60, icon: _squareNormal2.default, color: '#27A5D9' },
    suo2: { render: _imageBk2.default, title: "所-告警", titleX: 40, titleY: 15, content: '100', contentX: 40, contentY: 35, width: 80, height: 60, icon: _2.default, color: '#CF7475' },
    mianyang: { render: _imageBk2.default, title: "绵阳", zlevel: 0, titleX: 200, titleY: 35, width: 500, height: 500, icon: _my_bk2.default, color: '#4ED5F3' },
    beijing: { render: _imageBk2.default, title: "北京", zlevel: 0, titleX: 80, titleY: 30, width: 160, height: 140, icon: _bj_bk2.default, color: '#4ED5F3' },
    shanghai: { render: _imageBk2.default, title: "上海", zlevel: 0, titleX: 80, titleY: 40, width: 120, height: 90, icon: _shanghai_bk2.default, color: '#4ED5F3' },
    // square:{render:squareRender,title:"数据中心",width:30,height:30,color:'rgba(1,242,200)',arrowOffset:[24,3]},
    errorSquare: { render: _square2.default, zlevel: 20, title: "红色数据中心", width: 30, height: 45, color: _redSquare2.default, arrowOffset: [21, 30] },
    warnSquare: { render: _square2.default, zlevel: 20, title: "黄色数据中心", width: 30, height: 45, color: _yellowSquare2.default, arrowOffset: [21, 30] },
    safeSquare: { render: _square2.default, zlevel: 20, title: "蓝色数据中心", width: 30, height: 45, color: _greenSquare2.default, arrowOffset: [21, 30] },
    normalSquare: { render: _square2.default, zlevel: 20, title: "白色数据中心", width: 30, height: 45, color: _blueSquare2.default, arrowOffset: [21, 30] },

    errorStar: { render: _star2.default, title: "红色节点", width: 20, height: 25, color: _redNode2.default, arrowOffset: [5, 5], animateRandom: true },
    warnStar: { render: _star2.default, title: "黄色节点", width: 20, height: 25, color: _yellowNode2.default, arrowOffset: [5, 5], animateRandom: true },
    safeStar: { render: _star2.default, title: "蓝色节点", width: 20, height: 25, color: _greenNode2.default, arrowOffset: [5, 5], animateRandom: true },
    normalStar: { render: _star2.default, title: "白色节点", width: 20, height: 25, color: _blueNode2.default, arrowOffset: [5, 5], animate: false },
    whiteStar: { render: _star2.default, title: "白色节点", width: 20, height: 25, color: _blueNode2.default, arrowOffset: [5, 5], animateRandom: true },

    helpLine: { render: _line2.default }

};

var MENU_TYPES = exports.MENU_TYPES = [{
    key: "addGroup-group1", title: "新建组", targets: { node: false, rootGroup: true, container: false }
},
/* {key:"addNode", title:"新建节点", targets:{node:false,rootGroup:true,container:true},
    childs:Object.keys(NODE_TYPES).map((key)=>{
        let node =NODE_TYPES[key]
        return {
            key, 
            title:node.title
        }
    })
}, */
{ key: "addNode", title: "大屏一", targets: { node: false, rootGroup: true, container: true },
    childs: [{ key: 'beijing', title: '北京' }, { key: 'shanghai', title: '上海' }, { key: 'mianyang', title: '绵阳' }, { key: 'safeStar', title: '单位' }, { key: 'safeSquare', title: '数据中心' }, { key: 'helpLine', title: '辅助线' }]
}, { key: "addNode", title: "大屏三", targets: { node: false, rootGroup: true, container: true },
    childs: [{ key: 'unitNode1', title: '单位节点一' }, { key: 'unitNode2', title: '单位节点二' }, { key: 'safeNode', title: '安全监测' }, { key: 'serverNode', title: '服务器' }, { key: 'jiaohuanNode', title: '交换机' }, { key: 'wangguanNode', title: '网关' }, { key: 'ruqinNode', title: '入侵检测' }, { key: 'wallNode', title: '防火墙' }, { key: 'jiankongNode', title: '主机监控' }, { key: 'bdNode', title: '防病毒' }, { key: 'unit1', title: '数据单位' }]
}, { key: "addArrow", title: "连接", targets: { node: true, rootGroup: false, container: true },
    childs: ARROW_TYPES.map(function (node) {
        return {
            key: node.key,
            title: node.title
        };
    })
}, { key: "rename", title: "重命名", targets: { node: true, rootGroup: false, container: true } }, { key: "delete", title: "删除", targets: { node: true, rootGroup: false, container: true } }, { key: "reset", title: "清空画布" }, { key: "zoomin", title: "放大" }, { key: "zoomout", title: "缩小" }, { key: "zoomreset", title: "1:1" }];

var TOOLBAR_TYPES = exports.TOOLBAR_TYPES = [[{ name: 'default', checkBtn: true
    //    ,{name:'rectangle_selection',checkBtn:true} //框选
}, { name: 'pan', checkBtn: true }], [{ name: 'zoomin' }, { name: 'zoomout' }, { name: 'zoomreset' }, { name: 'overview' }]
/*,[
     {name:'edge',checkBtn:true}
    ,{name:'edge_VH',checkBtn:true}
    ,{name:'polygon',checkBtn:true}
    ,{name:'line',checkBtn:true}
]*/
, [{ name: 'search' }], [{ name: 'print' }], [{ name: 'json', checkBtn: true }], [{ name: 'max' }, { name: 'reset' }], [{ name: 'skin' }], [{ name: 'demos' }]];

var NODE_TYPES_LENGTH = exports.NODE_TYPES_LENGTH = 4;

var NODE_INFO = exports.NODE_INFO = {
    width: 100,
    height: 100,
    fontColor: 'red'
};

var ARROW_INFO = exports.ARROW_INFO = {
    color: '#666'
};