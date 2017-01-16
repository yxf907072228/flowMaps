'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NODE_INFO = exports.NODE_TYPES_LENGTH = exports.GROUP_TYPES = exports.NODE_TYPES = exports.TOOLBAR_TYPES = exports.MENU_TYPES = undefined;

var _para = require('../images/para.png');

var _para2 = _interopRequireDefault(_para);

var _fwql = require('../images/fwql.png');

var _fwql2 = _interopRequireDefault(_fwql);

var _jcfwl = require('../images/jcfwl.png');

var _jcfwl2 = _interopRequireDefault(_jcfwl);

var _xnpzx = require('../images/xnpzx.png');

var _xnpzx2 = _interopRequireDefault(_xnpzx);

var _wljhj = require('../images/wljhj.png');

var _wljhj2 = _interopRequireDefault(_wljhj);

var _zydd = require('../images/zydd.png');

var _zydd2 = _interopRequireDefault(_zydd);

var _cloud_bk = require('../images/cloud_bk.png');

var _cloud_bk2 = _interopRequireDefault(_cloud_bk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MENU_TYPES = exports.MENU_TYPES = [{ key: "addGroup", title: "新建组", targets: { node: false, rootGroup: true, container: false } }, { key: "addNode", title: "新建节点", targets: { node: false, rootGroup: true, container: true } }, { key: "addArrow", title: "连接", targets: { node: true, rootGroup: false, container: false } }, { key: "rename", title: "重命名", targets: { node: true, rootGroup: false, container: true } }, { key: "delete", title: "删除", targets: { node: true, rootGroup: false, container: true } }, { key: "reset", title: "清空画布" }, { key: "zoomin", title: "放大" }, { key: "zoomout", title: "缩小" }, { key: "zoomreset", title: "1:1" }];

var TOOLBAR_TYPES = exports.TOOLBAR_TYPES = [[{ name: 'default', checkBtn: true }
//    ,{name:'rectangle_selection',checkBtn:true} //框选
, { name: 'pan', checkBtn: true }], [{ name: 'zoomin' }, { name: 'zoomout' }, { name: 'zoomreset' }, { name: 'overview' }]
/*,[
     {name:'edge',checkBtn:true}
    ,{name:'edge_VH',checkBtn:true}
    ,{name:'polygon',checkBtn:true}
    ,{name:'line',checkBtn:true}
]*/
, [{ name: 'search' }], [{ name: 'print' }], [{ name: 'json', checkBtn: true }], [{ name: 'max' }, { name: 'reset' }]];

var NODE_TYPES = exports.NODE_TYPES = {
    fwql: { icon: _fwql2.default, level: 1, title: '机柜' },
    jcfwl: { icon: _jcfwl2.default, level: 2, title: '数据库' },
    xnpzx: { icon: _xnpzx2.default, level: 1, title: '基站服务器' },
    wljhj: { icon: _wljhj2.default, level: 2, title: '网络交换机' },
    zydd: { icon: _zydd2.default, level: 1, title: '路由器' }
};

var GROUP_TYPES = exports.GROUP_TYPES = {
    group1: {
        title: '用户组',
        width: 200,
        height: 100,
        style: {
            lineWidth: 3
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

var NODE_TYPES_LENGTH = exports.NODE_TYPES_LENGTH = 4;

var NODE_INFO = exports.NODE_INFO = {
    width: 45,
    height: 50
};