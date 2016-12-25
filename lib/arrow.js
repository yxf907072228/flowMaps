'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createArrow = createArrow;
exports.refreshArrow = refreshArrow;
exports.getArrowPath = getArrowPath;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createArrow(start, end) {
    var line = new LineShape({
        shape: {
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y
        }
    });
    var arrowPath = this.getArrowPath(start, end, 6);
    var path = pathTool.createFromString(arrowPath);
    var group = new Group({
        position: [0, 0],
        onclick: function onclick() {
            alert();
        }
    });
    group.add(line);
    group.add(path);
    this.zr.add(group);
    return group;
}

function refreshArrow(group, start, end) {
    var line = group.childAt(0);
    var arrow = group.childAt(1);

    line.shape = Object.assign(line.shape, {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
    });

    var arrowPath = this.getArrowPath(start, end, 6);
    var path = pathTool.createFromString(arrowPath);
    arrow['buildPath'] = path['buildPath'];
    arrow.dirty(true);
    line.dirty(true);
    this.zr.refresh();
}

function getArrowPath(leftPoint, rightPoint, radius) {
    var area = Math.atan2(leftPoint.y - rightPoint.y, rightPoint.x - leftPoint.x) * (180 / Math.PI);

    var x = rightPoint.x - radius * Math.cos(area * (Math.PI / 180)),
        y = rightPoint.y + radius * Math.sin(area * (Math.PI / 180));

    var x1 = x + radius * Math.cos((area + 120) * (Math.PI / 180)),
        y1 = y - radius * Math.sin((area + 120) * (Math.PI / 180)),
        x2 = x + radius * Math.cos((area + 240) * (Math.PI / 180)),
        y2 = y - radius * Math.sin((area + 240) * (Math.PI / 180));
    return 'M ' + rightPoint.x + ' ' + rightPoint.y + ' L ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2 + ' L ' + rightPoint.x2 + ' ' + rightPoint.y2 + ' Z';
}