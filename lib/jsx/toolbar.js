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
	var _this = this;

	var _state = this.state;
	var activeBtn = _state.activeBtn;
	var config = _state.config;

	var toolbarTypes = config['TOOLBAR_TYPES'];
	return _react2.default.createElement(
		'div',
		{ className: 'toolbar', ref: 'toolbar' },
		toolbarTypes.map(function (group, i) {
			return _react2.default.createElement(
				'ul',
				{ key: i, className: 'btns-group' },
				group.map(function (item, j) {
					if (item.name == 'search') {
						return _react2.default.createElement(
							'div',
							{ key: j },
							_react2.default.createElement('input', { className: 'btn', placeholder: '搜索关键字', onChange: _this.setKeyWord.bind(_this), onKeyDown: _this.enterSearch.bind(_this) }),
							_react2.default.createElement(
								'li',
								{ className: 'btn', onClick: _this.clickToolbarBtnHandle.bind(_this, item) },
								_react2.default.createElement('i', { className: 'ico toolbar-search', onClick: _this.searchNode.bind(_this) })
							)
						);
					} else if (item.checkBtn) {
						return _react2.default.createElement(
							'li',
							{ key: j, className: (0, _classnames2.default)({ btn: true, active: activeBtn == item.name }), onClick: _this.clickToolbarBtnHandle.bind(_this, item) },
							_react2.default.createElement('i', { className: "ico toolbar-" + item.name })
						);
					} else {
						return _react2.default.createElement(
							'li',
							{ key: j, className: 'btn', onClick: _this.clickToolbarBtnHandle.bind(_this, item) },
							_react2.default.createElement('i', { className: "ico toolbar-" + item.name })
						);
					}
				})
			);
		})
	);
}