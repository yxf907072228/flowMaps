'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MAP_DATA = exports.NODE_INFO = exports.NODE_TYPES_LENGTH = exports.NODE_TYPES = exports.TOOLBAR_TYPES = exports.MENU_TYPES = undefined;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MENU_TYPES = exports.MENU_TYPES = [{ key: "addGroup", title: "新建组" }, { key: "addNode", title: "新建节点" }, { key: "addArrow", title: "连接" }, { key: 3, title: "清空画布" }, { key: 4, title: "放大" }, { key: 5, title: "缩小" }, { key: 6, title: "1:1" }];

var TOOLBAR_TYPES = exports.TOOLBAR_TYPES = [[{ name: 'default', checkBtn: true }, { name: 'rectangle_selection', checkBtn: true }, { name: 'pan', checkBtn: true }], [{ name: 'zoomin' }, { name: 'zoomout' }, { name: 'zoomreset' }, { name: 'overview' }], [{ name: 'edge', checkBtn: true }, { name: 'edge_VH', checkBtn: true }, { name: 'polygon', checkBtn: true }, { name: 'line', checkBtn: true }], [{ name: 'search' }], [{ name: 'print' }], [{ name: 'json' }], [{ name: 'max' }]];
var NODE_TYPES = exports.NODE_TYPES = {
    zuzhi: { icon: _zuzhi2.default, level: 1, title: '节点一' },
    zzuzhi: { icon: _zizuzhi2.default, level: 2, title: '节点二' },
    bx: { icon: _para2.default, level: 3, title: '节点三' },
    cs: {
        icon: _chaosuan2.default,
        icon_false: _chaosuan_false2.default,
        icon_no: _chaosuan_no2.default, level: 4, title: '节点四' }
};
var NODE_TYPES_LENGTH = exports.NODE_TYPES_LENGTH = 4;

var NODE_INFO = exports.NODE_INFO = {
    width: 45,
    height: 52
};

var MAP_DATA = exports.MAP_DATA = {
    nodes: {},
    arrow: {}
};