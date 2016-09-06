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
    var show = _state.show;
    var top = _state.top;
    var left = _state.left;
    var indexItem = _state.indexItem;
    var _props = this.props;
    var nodeTypes = _props.nodeTypes;
    var menuTypes = _props.menuTypes;
    var menuHandle = _props.menuHandle;


    function getNodeTypes(nodeTypes) {
        var nodeTypeMenu = [];
        for (var t in nodeTypes) {
            var node = nodeTypes[t];
            node.type = t;
            nodeTypeMenu.push(_react2.default.createElement(
                'li',
                { key: t, onClick: menuHandle.bind(this, 'addNode', node) },
                node['title']
            ));
        }
        return nodeTypeMenu;
    }

    return _react2.default.createElement(
        'ul',
        { ref: 'rightmenu', className: (0, _classnames2.default)({ 'rightMenu': true, 'active': show }), style: { left: left, top: top }, onContextMenu: this.rightMenuHandle.bind(this) },
        menuTypes.map(function (item, i) {
            if (item.key == 'addGroup') {
                return _react2.default.createElement(
                    'li',
                    { key: i, className: (0, _classnames2.default)({ active: indexItem == item.key }), onClick: menuHandle.bind(_this, item.key), onMouseOver: _this.menuItemActiveHandle.bind(_this, item.key) },
                    '新建组',
                    _react2.default.createElement(
                        'ul',
                        { className: (0, _classnames2.default)({ 'rightMenu': true, 'rightMenuChild': true }) },
                        _react2.default.createElement(
                            'li',
                            null,
                            '组一'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            '组二'
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            '组三'
                        )
                    )
                );
            } else if (item.key == 'addNode') {
                return _react2.default.createElement(
                    'li',
                    { key: i, className: (0, _classnames2.default)({ active: indexItem == item.key }), onClick: menuHandle.bind(_this), onMouseOver: _this.menuItemActiveHandle.bind(_this, item.key) },
                    '新建节点',
                    _react2.default.createElement(
                        'ul',
                        { className: (0, _classnames2.default)({ 'rightMenu': true, 'rightMenuChild': true }) },
                        getNodeTypes.call(_this, nodeTypes)
                    )
                );
            } else {
                return _react2.default.createElement(
                    'li',
                    { key: i, onClick: menuHandle.bind(_this, item.key), onMouseOver: _this.menuItemActiveHandle.bind(_this, item.key) },
                    item.title
                );
            }
        })
    );
}