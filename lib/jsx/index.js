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

var _rightmenu = require('../rightmenu');

var _rightmenu2 = _interopRequireDefault(_rightmenu);

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
    var config = _state.config;
    var activeBtn = _state.activeBtn;
    var dataStr = _state.dataStr;
    var dataStrValid = _state.dataStrValid;


    return _react2.default.createElement(
        'div',
        { ref: 'flowmap', className: 'flowmap', onClick: this.onFlowMapClickHandle.bind(this) },
        config['TOOLBAR_TYPES'] && _toolbar2.default.call(this),
        _react2.default.createElement('div', { ref: 'paper', className: (0, _classnames2.default)({ "paper": true, "active": activeBtn !== 'json' }), style: { width: mapWidth, height: mapHeight }, onContextMenu: this.rightMenuHandle.bind(this) }),
        _react2.default.createElement('textarea', { value: dataStr, onChange: this.dataStrChangeHandle.bind(this), className: (0, _classnames2.default)({ "json": true, "active": activeBtn == 'json', error: dataStrValid == false }), style: { width: mapWidth, height: mapHeight } }),
        _react2.default.createElement(_rightmenu2.default, { ref: 'rightmenu', menuHandle: this.rightMenuClickHandle.bind(this), menuTypes: config.MENU_TYPES, groupTypes: config.GROUP_TYPES, nodeTypes: config.NODE_TYPES })
    );
}