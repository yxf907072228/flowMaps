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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(group, option, nodeData) {
    var zlevel = option.zlevel || 1;

    var titleNode = new _Text2.default({
        zlevel: zlevel,
        style: {
            x: option.titleX,
            y: option.titleY,
            text: nodeData.title,
            textAlign: 'center',
            textFill: option.color,
            fontSize: '14',
            fontWeight: 'bolder',
            opacity: 0.8
        }
    });

    var titleBK = new _Image2.default({
        position: [0, 0],
        scale: [1, 1],
        zlevel: zlevel,
        style: {
            x: 0,
            y: 0,
            image: option.icon,
            width: option.width,
            height: option.height
        }

    });

    //group.zlevel=zlevel
    group.add(titleBK);
    group.add(titleNode);

    if (option.content) {
        var contentNode = new _Text2.default({
            zlevel: zlevel,
            style: {
                x: option.contentX,
                y: option.contentY,
                text: option.content,
                textAlign: 'center',
                textFill: option.color,
                fontSize: '14',
                fontWeight: 'bolder',
                opacity: 0.8
            }
        });
        group.add(contentNode);
    }
}