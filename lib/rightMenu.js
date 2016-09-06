'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rightmenu = require('./jsx/rightmenu.js');

var _rightmenu2 = _interopRequireDefault(_rightmenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RightMenu = function (_React$Component) {
	_inherits(RightMenu, _React$Component);

	function RightMenu(props) {
		_classCallCheck(this, RightMenu);

		var _this = _possibleConstructorReturn(this, (RightMenu.__proto__ || Object.getPrototypeOf(RightMenu)).call(this, props));

		_this.state = {
			show: false,
			left: 0,
			top: 0,
			indexItem: 0
		};
		return _this;
	}

	_createClass(RightMenu, [{
		key: 'render',
		value: function render() {
			return _rightmenu2.default.bind(this)();
		}
	}, {
		key: 'rightMenuHandle',
		value: function rightMenuHandle(e) {
			e.preventDefault();
		}
	}, {
		key: 'menuItemActiveHandle',
		value: function menuItemActiveHandle(indexItem) {
			this.setState({
				indexItem: indexItem
			});
		}
	}, {
		key: 'showMenu',
		value: function showMenu(opts) {
			this.setState(Object.assign({
				show: true,
				indexItem: 0
			}, opts));
		}
	}, {
		key: 'hideMenu',
		value: function hideMenu() {
			this.setState({
				show: false
			});
		}
		/*
  	menuHandle(index,o,e){
  		const {left,top}=this.state
  		switch(index){
  			case 1:
  				//创建组相关操作
  			;break
  			case 2:
  				//创建节点相关操作
  				if(e){
  					this.props.createNodeHandle(o.type,left-25,top-25)
  				}
  			;break;
  
  			default:;
  		}
  		
  		//this.hideMenu()
  	}
  */

	}]);

	return RightMenu;
}(_react2.default.Component);

exports.default = RightMenu;