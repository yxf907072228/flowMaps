'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fuck;

var _Path = require('zrender/lib/graphic/Path');

var _Path2 = _interopRequireDefault(_Path);

var _path = require('zrender/lib/tool/path');

var _path2 = _interopRequireDefault(_path);

var _LinearGradient = require('zrender/lib/graphic/LinearGradient');

var _LinearGradient2 = _interopRequireDefault(_LinearGradient);

var _BezierCurve = require('zrender/lib/graphic/shape/BezierCurve');

var _BezierCurve2 = _interopRequireDefault(_BezierCurve);

var _coordinates = require('./coordinates');

var _animator = require('./animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLinearColor(index, start, end) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    /*  let start = index-1
     let end = index
    // console.log(start,end)
     start = start<0?0:start
     end =end>1?1:end */
    var p = index * 2;
    var colorList = [{
        offset: 0,
        color: option.color.replace(")", ",0)")
    }, {
        offset: p > 1 ? p - 1 : 0,
        color: option.color.replace(")", ",0)")
    }, {
        offset: index,
        color: option.color.replace(")", ",1)")
    }, {
        offset: p > 1 ? 1 : p,
        color: option.color.replace(")", ",0)")
    }, {
        offset: 1,
        color: option.color.replace(")", ",0)")
    }];
    var linearGradient = new _LinearGradient2.default(start.x, start.y, end.x, end.y, colorList, true);
    return linearGradient;

    // return `rgba(56,222,56,${index})`
}
function fuck(tapu, start, end) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


    // let points = getCurvePath([start.x,start.y],[end.x, end.y],0.4)
    var fcolor = option.color || 'rgba(56,222,56)';

    var cpoint = (0, _coordinates.getCPoint)([start.x, start.y], [end.x, end.y], 0.4);
    var line1 = new _BezierCurve2.default({
        zlevel: 1,
        shape: {
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            cpx1: cpoint[0],
            cpy1: cpoint[1]
        },
        style: {
            stroke: 'transparent',
            lineWidth: 5,
            opacity: 0.8
        },
        level: 1
    });
    tapu.rootGroup.add(line1);

    var animator = new _animator.Animator({});
    for (var x = 0; x < 100; x++) {
        animator.when(20 * x, function (i, p) {
            line1.style.stroke = getLinearColor((i + p) / 100, start, end, { color: fcolor });
            line1.dirty();
        });
    }
    animator.start().done(function () {
        tapu.rootGroup.remove(line1);
    });
}