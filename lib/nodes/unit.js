'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _zrender = require('zrender/lib/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Text = require('zrender/lib/graphic/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Image = require('zrender/lib/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Ellipse = require('zrender/lib/graphic/shape/Ellipse');

var _Ellipse2 = _interopRequireDefault(_Ellipse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(group, option, nodeData) {
    var _nodeData$ = nodeData.上,
        upTitle = _nodeData$ === undefined ? 0 : _nodeData$,
        _nodeData$2 = nodeData.下,
        downTitle = _nodeData$2 === undefined ? 0 : _nodeData$2;

    var titleNode = new _Text2.default({
        style: {
            x: option.width / 2,
            y: option.height + 10,
            text: nodeData.title,
            textAlign: 'center',
            textFill: option.color,
            fontWeight: 'bolder',
            fontSize: 11,
            opacity: 0.8
        }
    });

    var titleBK = new _Image2.default({
        position: [0, 0],
        scale: [1, 1],
        style: {
            x: 0,
            y: 0,
            image: option.icon,
            width: option.width,
            height: option.height
        }

    });

    var icon1 = new _Text2.default({
        style: {
            textFill: '#fff',
            textBackgroundColor: 'rgb(21,122,88)',
            x: 2,
            y: 0,
            text: upTitle,
            fontSize: 8,
            fontWeight: 'bolder',
            textAlign: 'center',
            textBorderRadius: 10,
            textPadding: [0, 2]
        }
    });

    var icon2 = new _Text2.default({
        style: {
            textFill: '#fff',
            textBackgroundColor: 'rgb(250,63,72)',
            x: option.width - 3,
            y: 12,
            text: downTitle,
            textPadding: [0, 2],
            fontSize: 8,
            fontWeight: 'bolder',
            textAlign: 'center',
            textBorderRadius: 10
        }
    });

    group.add(titleBK);
    group.add(titleNode);
    group.add(icon1);
    group.add(icon2);
}