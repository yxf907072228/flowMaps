'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nodemenu = require('./jsx/nodemenu.jsx');

var _nodemenu2 = _interopRequireDefault(_nodemenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeMenu = function (_React$Component) {
    _inherits(NodeMenu, _React$Component);

    function NodeMenu(props) {
        _classCallCheck(this, NodeMenu);

        var _this = _possibleConstructorReturn(this, (NodeMenu.__proto__ || Object.getPrototypeOf(NodeMenu)).call(this, props));

        _this.state = {
            show: false,
            top: 0,
            left: 0,
            menus: {
                0: true, 1: true, 2: true, 3: true, 4: true, 5: true
            }
        };
        return _this;
    }

    _createClass(NodeMenu, [{
        key: 'show',
        value: function show(opts) {
            var o = Object.assign({
                show: true,
                top: 0,
                left: 0
            }, opts);
            o.menus = Object.assign({
                0: true, 1: true, 2: true, 3: true, 4: true, 5: true
            }, opts.menus);
            if (JSON.stringify(o.menus) == '{"0":false,"1":true,"2":false,"3":false,"4":false,"5":false}') {
                o.left += 10;
            }
            this.setState(o);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({
                show: false,
                menus: {
                    0: true, 2: true, 3: true, 4: true, 5: true
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _nodemenu2.default.bind(this)();
        }
    }]);

    return NodeMenu;
}(_react2.default.Component);

exports.default = NodeMenu;