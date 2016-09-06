'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _toolbar = require('./jsx/toolbar.js');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolBar = function (_React$Component) {
	_inherits(ToolBar, _React$Component);

	function ToolBar(props) {
		_classCallCheck(this, ToolBar);

		var _this = _possibleConstructorReturn(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).call(this, props));

		_this.state = {
			activeBtn: 'default'
		};
		return _this;
	}

	_createClass(ToolBar, [{
		key: 'render',
		value: function render() {
			return _toolbar2.default.bind(this)();
		}
	}, {
		key: 'onSelectBtnHandle',
		value: function onSelectBtnHandle(activeBtn) {
			var selectBtnHandle = this.props.selectBtnHandle;

			this.setState({
				activeBtn: activeBtn
			});
			selectBtnHandle && selectBtnHandle(activeBtn);
			this.onBtnClickHandle(activeBtn);
		}
	}, {
		key: 'onBtnClickHandle',
		value: function onBtnClickHandle(btn) {
			console.log(btn);
		}
	}]);

	return ToolBar;
}(_react2.default.Component);

exports.default = ToolBar;