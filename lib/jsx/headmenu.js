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

    return _react2.default.createElement(
        'ul',
        { className: (0, _classnames2.default)({ 'headMenu': true }) },
        _react2.default.createElement('li', { title: '新建页面', onClick: this.props.headMenuHandle.bind(this, 0) })
    );
}