'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _toolbar = require('../toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _rightMenu = require('../rightMenu');

var _rightMenu2 = _interopRequireDefault(_rightMenu);

require('../../styles/flowMap.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render() {
    var _state = this.state,
        mapWidth = _state.mapWidth,
        mapHeight = _state.mapHeight,
        nodeMenuHandle = _state.nodeMenuHandle,
        toolItemTipX = _state.toolItemTipX,
        toolItemTipY = _state.toolItemTipY,
        toolItemTipShow = _state.toolItemTipShow,
        toolItemTipText = _state.toolItemTipText,
        config = _state.config,
        activeBtn = _state.activeBtn,
        dataStr = _state.dataStr,
        dataStrValid = _state.dataStrValid;


    return _react2.default.createElement(
        'div',
        { ref: 'flowmap', className: 'flowmap', onClick: this.onFlowMapClickHandle.bind(this) },
        config['TOOLBAR_TYPES'] && _toolbar2.default.call(this),
        _react2.default.createElement('div', { ref: 'paper', className: (0, _classnames2.default)({ "paper": true, "active": activeBtn !== 'json' }), style: { width: mapWidth, height: mapHeight }, onContextMenu: this.rightMenuHandle.bind(this) }),
        _react2.default.createElement('textarea', { value: dataStr, onChange: this.dataStrChangeHandle.bind(this), className: (0, _classnames2.default)({ "json": true, "active": activeBtn == 'json', error: dataStrValid == false }), style: { width: mapWidth, height: mapHeight } }),
        _react2.default.createElement(_rightMenu2.default, { ref: 'rightmenu', menuHandle: this.rightMenuClickHandle.bind(this), menuTypes: config.MENU_TYPES, groupTypes: config.GROUP_TYPES, nodeTypes: config.NODE_TYPES })
    );
}