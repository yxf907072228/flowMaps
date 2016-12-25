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

function getNodeTypes(nodeTypes) {
    var menuHandle = this.props.menuHandle;

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

function getGroupTypes(groupTypes) {
    var menuHandle = this.props.menuHandle;

    var groupTypeMenu = [];
    for (var t in groupTypes) {
        var node = groupTypes[t];
        node.type = t;
        groupTypeMenu.push(_react2.default.createElement(
            'li',
            { key: t, onClick: menuHandle.bind(this, 'addGroup', node) },
            node['title']
        ));
    }
    return groupTypeMenu;
}

function render() {
    var _this = this;

    var _state = this.state;
    var show = _state.show;
    var top = _state.top;
    var left = _state.left;
    var indexItem = _state.indexItem;
    var target = _state.target;
    var _props = this.props;
    var nodeTypes = _props.nodeTypes;
    var menuTypes = _props.menuTypes;
    var groupTypes = _props.groupTypes;
    var menuHandle = _props.menuHandle;


    return show ? _react2.default.createElement(
        'ul',
        { ref: 'rightmenu', className: (0, _classnames2.default)({ 'rightMenu': true, 'active': show }), style: { left: left, top: top }, onContextMenu: this.rightMenuHandle.bind(this) },
        menuTypes.map(function (item, i) {
            if (item.targets && (item.targets[target] == null || item.targets[target] == false)) {
                return;
            }
            if (item.key == 'addGroup') {
                return _react2.default.createElement(
                    'li',
                    { key: i, className: (0, _classnames2.default)({ active: indexItem == item.key }), onClick: menuHandle.bind(_this), onMouseOver: _this.menuItemActiveHandle.bind(_this, item.key) },
                    '新建组',
                    _react2.default.createElement(
                        'ul',
                        { className: (0, _classnames2.default)({ 'rightMenu': true, 'rightMenuChild': true }) },
                        getGroupTypes.call(_this, groupTypes)
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
    ) : _react2.default.createElement('div', { ref: 'rightmenu', style: { left: left, top: top }, className: (0, _classnames2.default)({ 'rightMenu': true, 'active': show }) });
}