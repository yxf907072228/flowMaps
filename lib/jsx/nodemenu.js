'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render() {
    var _state = this.state;
    var show = _state.show;
    var more = _state.more;
    var top = _state.top;
    var left = _state.left;
    var menus = _state.menus;
    var menuClickHandle = this.props.menuClickHandle;

    var _menuClickHandle = function _menuClickHandle(index, event) {
        menuClickHandle(index, event);
    };
    return _react2.default.createElement(
        'ul',
        { className: (0, _classnames2.default)({ 'nodeMenu': true, 'active': show, 'more': more }), style: { top: top, left: left } },
        _react2.default.createElement('li', { title: '增加链接', style: { display: menus[0] == true ? 'block' : 'none' }, onClick: _menuClickHandle.bind(this, 0) }),
        _react2.default.createElement('li', { title: '删除节点', style: { display: menus[1] == true ? 'block' : 'none' }, onClick: _menuClickHandle.bind(this, 1) }),
        _react2.default.createElement('li', { title: '增加管理员权限', style: { display: menus[2] == true ? 'block' : 'none' }, onClick: _menuClickHandle.bind(this, 2) }),
        _react2.default.createElement('li', { title: '删除管理员权限', style: { display: menus[3] == true ? 'block' : 'none' }, onClick: _menuClickHandle.bind(this, 3) }),
        _react2.default.createElement('li', { title: '设为支付账户', style: { display: menus[4] == true ? 'block' : 'none' }, onClick: _menuClickHandle.bind(this, 4) }),
        _react2.default.createElement('li', { title: '取消支付账户', style: { display: menus[5] == true ? 'block' : 'none' }, onClick: _menuClickHandle.bind(this, 5) })
    );
}