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

	var activeBtn = this.state.activeBtn;
	var toolbarTypes = this.props.toolbarTypes;

	return _react2.default.createElement(
		'div',
		{ className: 'toolbar' },
		toolbarTypes.map(function (group, i) {
			return _react2.default.createElement(
				'ul',
				{ key: i, className: 'btns-group' },
				group.map(function (item, j) {
					if (item.name == 'search') {
						return _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('input', { className: 'btn', placeholder: 'Name' }),
							_react2.default.createElement(
								'li',
								{ className: 'btn', onClick: _this.onBtnClickHandle.bind(_this, 'search') },
								_react2.default.createElement('i', { className: 'ico toolbar-search' })
							)
						);
					} else if (item.checkBtn) {
						return _react2.default.createElement(
							'li',
							{ className: (0, _classnames2.default)({ btn: true, active: activeBtn == item.name }), onClick: _this.onSelectBtnHandle.bind(_this, item.name) },
							_react2.default.createElement('i', { className: "ico toolbar-" + item.name })
						);
					} else {
						return _react2.default.createElement(
							'li',
							{ className: 'btn', onClick: _this.onBtnClickHandle.bind(_this, item.name) },
							_react2.default.createElement('i', { className: "ico toolbar-" + item.name })
						);
					}
				})
			);
		})
	);
}