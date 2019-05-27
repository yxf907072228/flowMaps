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

var _RadialGradient = require('zrender/lib/graphic/RadialGradient');

var _RadialGradient2 = _interopRequireDefault(_RadialGradient);

var _BezierCurve = require('zrender/lib/graphic/shape/BezierCurve');

var _BezierCurve2 = _interopRequireDefault(_BezierCurve);

var _Circle = require('zrender/lib/graphic/shape/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _coordinates = require('./coordinates');

var _animator = require('./animator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLinearColor(p, start, end) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var s1 = 0;
    var e1 = p;
    s1 = e1 - 0.6;
    s1 = s1 >= 0 ? s1 : 0;
    e1 = e1 >= 1 ? 1 : e1;

    var colorList = [{
        offset: 0,
        color: option.color.replace(")", ",0)")
    }, {
        offset: s1,
        color: option.color.replace(")", ",0)")
    }, {
        offset: e1,
        color: option.color.replace(")", ",1)")
    }, {
        offset: e1,
        color: option.color.replace(")", ",0)")
    }, {
        offset: 1,
        color: option.color.replace(")", ",0)")
    }];
    var linearGradient = new _LinearGradient2.default(start.x, start.y, end.x, end.y, colorList, true);
    return linearGradient;
}
var path = '';
function fuck(tapu, start, end) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    //console.log(arguments,'star')
    var points = (0, _coordinates.getCurvePath)([start.x, start.y], [end.x, end.y], 0.4);
    var fcolor = option.color || 'rgba(56,222,56)';
    var colorList = [{
        offset: 0,
        color: fcolor.replace(")", ",1)")
    }, {
        offset: 1,
        color: fcolor.replace(")", ",0.2)")
        // color: fcolor.replace(")",",0)")
    }];
    var starColor = new _RadialGradient2.default(0.5, 0.5, 0.5, colorList);
    //console.log(points)
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
            lineWidth: 4,
            shadowColor: fcolor,
            shadowBlur: 6,
            opacity: 0.2
        },
        level: 1
    });
    var star = new _Circle2.default({

        shape: {
            //  cx:points[50].x,
            //  cy:points[50].y,
            r: 5
        },
        style: {
            fill: starColor,
            shadowColor: '#fff',
            shadowBlur: 6
        },
        zlevel: 1
    });
    tapu.rootGroup.add(line1);
    tapu.rootGroup.add(star);
    var animator = new _animator.Animator({});
    var len = points.length * (1 + 0.6);
    for (var index = 0; index < len; index++) {

        animator.when(20 * index, function (i, p) {
            var lastIndex = i - 1;
            if (i < points.length) {

                lastIndex = lastIndex < 0 ? 0 : lastIndex;
                star.shape.cx = points[lastIndex].x + (points[i].x - points[lastIndex].x) * p;
                star.shape.cy = points[lastIndex].y + (points[i].y - points[lastIndex].y) * p;
                star.dirty();

                line1.style.stroke = getLinearColor((lastIndex + p) / 100, start, end, { color: fcolor });
                line1.dirty();
            } else if (i == points.length) {
                tapu.rootGroup.remove(star);
                star = null;
                line1.style.stroke = getLinearColor((lastIndex + p) / 100, start, end, { color: fcolor });
                line1.dirty();
            } else {
                line1.style.stroke = getLinearColor((lastIndex + p) / 100, start, end, { color: fcolor });
                line1.dirty();
            }
        });
    }

    animator.start().done(function () {
        //console.log('结束了，移除!')
        tapu.rootGroup.remove(line1);
        star && tapu.rootGroup.remove(star);
    });
}