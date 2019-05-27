'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _path = require('zrender/lib/tool/path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
    var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0 };
    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var that = arguments[3];


    var group, line;
    var config = that.arrayMap[option.arrowType];

    // var {color='#666',way=1} = config
    if (option.type == "group" && option.arrowType) {
        group = option;
        line = group.childAt(0);
        line.dirty(true);
    } else {

        group = that.addGroup(Object.assign({}, option));
        that.data(group, {
            type: 'arrow',
            arrowType: option.arrowType || 'normal'
        });

        //bessel
        line = _path2.default.createFromString("");

        line.style.fill = 'transparent';
        line.style.stroke = 'rgba(1,242,200)';
        line.style.lineWidth = 5;
        line.style.lineDash = [8, 8];
        line.animate('style', true).when(1000, {
            lineDashOffset: 16
        }).start();
        //let arrowPath = that.getArrowPath(start, end, 6)
        group.add(line);
        that.arrows[group.id] = group;
        that.rootGroup.add(group);
    }

    /*   let len=50 
      let xlen = end.x-start.x, ylen=end.y-start.y;
      let clen = Math.sqrt(xlen*xlen+ylen*ylen);
      line.shape = Object.assign(line.shape, {
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y,
          cpx1:start.x+xlen/2+len/clen*ylen,
          cpy1:start.y+ylen/2-len/clen*xlen,
      })
    */
    var t1 = 10,
        t2 = 2,
        vx = 1,
        vy = 1;
    if (start.x > end.x) {
        vx = -1;
    }
    if (start.y > end.y) {
        vy = -1;
    }
    var path = _path2.default.createFromString('\n    M' + start.x + ' ' + start.y + ' L' + start.x + ' ' + (end.y - 8 * vy) + ' S' + (start.x - 2 * vx) + ' ' + (end.y - 2 * vy) + ' ' + (start.x + 8 * vx) + ' ' + end.y + ' L' + end.x + ' ' + end.y + '\n    ');

    line['buildPath'] = path['buildPath'];

    return group;
} //import BezierCurveShape from 'zrender/lib/graphic/shape/BezierCurve'