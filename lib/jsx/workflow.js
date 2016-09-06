'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nodemenu = require('../nodemenu');

var _nodemenu2 = _interopRequireDefault(_nodemenu);

var _headmenu = require('../headmenu');

var _headmenu2 = _interopRequireDefault(_headmenu);

require('../../styles/flowMap.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render() {
    var _state = this.state;
    var mapWidth = _state.mapWidth;
    var mapHeight = _state.mapHeight;
    var nodeMenuHandle = _state.nodeMenuHandle;
    var toolItemTipX = _state.toolItemTipX;
    var toolItemTipY = _state.toolItemTipY;
    var toolItemTipShow = _state.toolItemTipShow;
    var toolItemTipText = _state.toolItemTipText;

    return _react2.default.createElement(
        'div',
        { className: 'flowmap workflow' },
        _react2.default.createElement('div', { ref: 'paper', style: { width: mapWidth, height: mapHeight } }),
        _react2.default.createElement(
            'div',
            { className: 'item-tip', style: { top: toolItemTipY, left: toolItemTipX, display: toolItemTipShow ? 'block' : 'none' } },
            toolItemTipText
        ),
        _react2.default.createElement(_headmenu2.default, { ref: 'headmenu', headMenuHandle: this.headMenuHandle.bind(this) })
    );
}