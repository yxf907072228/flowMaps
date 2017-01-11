'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NODE_INFO = exports.NODE_TYPES_LENGTH = exports.GROUP_TYPES = exports.NODE_TYPES = exports.TOOLBAR_TYPES = exports.MENU_TYPES = undefined;

var _zuzhi = require('../images/zuzhi.png');

var _zuzhi2 = _interopRequireDefault(_zuzhi);

var _zuzhi_no = require('../images/zuzhi_no.png');

var _zuzhi_no2 = _interopRequireDefault(_zuzhi_no);

var _zizuzhi = require('../images/zizuzhi.png');

var _zizuzhi2 = _interopRequireDefault(_zizuzhi);

var _zizuzhi_no = require('../images/zizuzhi_no.png');

var _zizuzhi_no2 = _interopRequireDefault(_zizuzhi_no);

var _para = require('../images/para.png');

var _para2 = _interopRequireDefault(_para);

var _para_no = require('../images/para_no.png');

var _para_no2 = _interopRequireDefault(_para_no);

var _guanli = require('../images/guanli.png');

var _guanli2 = _interopRequireDefault(_guanli);

var _money = require('../images/money.png');

var _money2 = _interopRequireDefault(_money);

var _user = require('../images/user.png');

var _user2 = _interopRequireDefault(_user);

var _chaosuan = require('../images/chaosuan.png');

var _chaosuan2 = _interopRequireDefault(_chaosuan);

var _chaosuan_false = require('../images/chaosuan_false.png');

var _chaosuan_false2 = _interopRequireDefault(_chaosuan_false);

var _chaosuan_no = require('../images/chaosuan_no.png');

var _chaosuan_no2 = _interopRequireDefault(_chaosuan_no);

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
    zuzhi: { icon: _zuzhi2.default, level: 1, title: '节点一' },
    zzuzhi: { icon: _zizuzhi2.default, level: 2, title: '节点二' },
    bx: { icon: _para2.default, level: 3, title: '节点三' },
    cs: {
        icon: _chaosuan2.default,
        icon_false: _chaosuan_false2.default,
        icon_no: _chaosuan_no2.default, level: 4, title: '节点四' }
};

var GROUP_TYPES = exports.GROUP_TYPES = {
    group1: {
        title: '组一',
        width: 200,
        height: 100,
        style: {
            lineWidth: 3
        }
    },
    group2: {
        title: '组二',
        shape: 'image',
        image: _cloud_bk2.default,
        width: 300,
        height: 150
    },
    group3: {
        title: '组三',
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