'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _zrender = require('zrender/lib/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Text = require('zrender/lib/graphic/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Circle = require('zrender/lib/graphic/shape/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _Group = require('zrender/lib/container/Group');

var _Group2 = _interopRequireDefault(_Group);

var _Image = require('zrender/lib/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Line = require('zrender/lib/graphic/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

var _RadialGradient = require('zrender/lib/graphic/RadialGradient');

var _RadialGradient2 = _interopRequireDefault(_RadialGradient);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function render(group, option, nodeData) {
    var _style, _style2;

    var zlevel = option.zlevel || 1;
    var text = nodeData.title || '暂无告警信息!';
    //text = text.replace(/(.{12})(?=.)/g,"$1\r\n");
    var sbound = nodeData.node.getBoundingRect();
    var sx = nodeData.node.position[0] + sbound.width / 4 - 4,
        sy = nodeData.node.position[1] + sbound.y + sbound.height / 4 - 5;

    if (nodeData.node.title == '数据中心') {
        sx += 12;
        sy += 8;
    }
    var circle1 = new _Circle2.default({
        position: [sx, sy],
        shape: {
            r: 2
        },
        zlevel: 1000,
        style: (_style = {
            fill: new _RadialGradient2.default(0.5, 0.5, 1, [{
                offset: 0,
                color: 'rgba(255,16,110,1)' //'rgba(228,46,78)'
            }, {
                offset: 0.2,
                color: 'rgba(255,16,110,0.5)' //'rgba(228,46,78)'
            }, {
                offset: 1,
                color: 'rgba(255,16,110,0)'
            }]),
            shadowBlur: 'rgba(255,16,110,1)'
        }, _defineProperty(_style, 'shadowBlur', 20), _defineProperty(_style, 'opacity', 1), _style)
    });
    var circle2 = new _Circle2.default({
        position: [sx, sy],
        shape: {
            r: 2
        },
        style: (_style2 = {
            fill: new _RadialGradient2.default(0.5, 0.5, 1, [{
                offset: 0,
                color: 'rgba(255,16,110,1)' //'rgba(228,46,78)'
            }, {
                offset: 0.2,
                color: 'rgba(255,16,110,0.5)' //'rgba(228,46,78)'
            }, {
                offset: 1,
                color: 'rgba(255,16,110,0)'
            }]),
            shadowBlur: 'rgba(255,16,110,1)'
        }, _defineProperty(_style2, 'shadowBlur', 20), _defineProperty(_style2, 'opacity', 1), _style2)
    });
    var p = new _Group2.default({
        position: [0, 0],
        scale: [0.01, 0.01],
        style: {} });
    var titleNode = new _Text2.default({
        zlevel: zlevel,
        style: {
            x: 0,
            y: 0,
            text: text,
            textAlign: 'left',
            textFill: option.color,
            fontSize: '10',
            fontWeight: 'bolder',
            opacity: 0.8
        }
    });

    var line = new _Line2.default({
        shape: {
            x1: sx,
            y1: sy,
            x2: nodeData.node.position[0],
            y2: nodeData.node.position[1]
        },
        style: {
            stroke: 'red',
            lineWidth: 2,
            opacity: 0.4
        },
        zlevel: 100
    });
    var bound = titleNode.getBoundingRect();

    var titleBK = new _Image2.default({
        position: [bound.x - 40, bound.y - 10],
        scale: [1, 1],
        zlevel: zlevel,
        style: {
            x: 0,
            y: 0,
            fill: 'rgb(55, 8, 9)',
            image: option.icon,
            width: bound.width + 40,
            height: (bound.height < 30 ? 30 : bound.height) + 20
        }

    });

    var titleIcon = new _Image2.default({
        position: [-35, 0],
        scale: [1, 1],
        zlevel: zlevel,
        style: {
            x: 0,
            y: 0,
            image: option.warnicon,
            width: 30,
            height: 30
        }

    });

    //group.zlevel=zlevel
    p.add(titleBK);
    p.add(titleIcon);
    p.add(titleNode);
    group.add(p);
    group.parent.add(line);
    group.parent.add(circle1);
    group.parent.add(circle2);

    var t = 1000;

    line.animate('shape', false).when(t, {
        x2: 330,
        y2: 110
    }).during(function (shape) {

        circle2.position = group.position = [shape.x2, shape.y2];
        group.dirty(true);
        circle2.dirty(true);
    }).done(function () {

        //  group.position = [circle2.position[0]-bound.width/2,circle2.position[1]-bound.height/2]
        //  group.dirty(true)

        p.animateTo({
            scale: [1, 1],
            position: [-titleBK.style.width / 2 + 40, -titleBK.style.height + 10]
        }, t, function () {
            close();
        });
    }).start();

    /*  
     p.parent.animateTo({
         position:[210,0]
     },t,function(){
         p.animateTo({
             scale:[1,1]
         },t);
     })
         
     line.animateTo({
         shape:{
             x2:350,
             y2:150
         }
     },t,function(){
        
     }) */

    function close() {
        setTimeout(function () {

            line.animateTo({
                shape: { x1: circle2.position[0],
                    y1: circle2.position[1]
                }
            }, function () {
                nodeData.tapu.deleteNode(line);

                nodeData.tapu.deleteNode(circle1);
                nodeData.tapu.deleteNode(circle2);
                group.animateTo({
                    scale: [0.01, 0.01]
                }, function () {
                    nodeData.tapu.deleteNode(group);
                });
            });

            circle1.animateTo({
                position: circle2.position
            });
        }, 11000);
    }
}