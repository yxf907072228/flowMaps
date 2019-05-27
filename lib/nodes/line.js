'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _zrender = require('zrender/lib/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Line = require('zrender/lib/graphic/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(group, option, nodeData) {
    var zlevel = option.zlevel || 1;
    var lineWidth = 1;
    var line = new _Line2.default({
        zlevel: zlevel,
        shape: {
            x1: 2,
            y1: lineWidth,
            x2: 100,
            y2: lineWidth
        },
        style: {
            // text:123321,
            //textRotation:0.5
            //  lineDash: [2, 2],
            //  [ARROW_INFO.color && 'stroke']: ARROW_INFO.color
            lineWidth: lineWidth,
            stroke: '#666'
        }
    });

    //group.zlevel=zlevel
    group.add(line);
}