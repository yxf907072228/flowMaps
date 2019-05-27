'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _zrender = require('zrender/lib/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Rect = require('zrender/lib/graphic/shape/Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _Text = require('zrender/lib/graphic/Text');

var _Text2 = _interopRequireDefault(_Text);

var _squareNormal = require('../images/square-normal.png');

var _squareNormal2 = _interopRequireDefault(_squareNormal);

var _RadialGradient = require('zrender/lib/graphic/RadialGradient');

var _RadialGradient2 = _interopRequireDefault(_RadialGradient);

var _Image = require('zrender/lib/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(group, option, nodeData) {
    var zlevel = option.zlevel;
    var circle = new _Image2.default({
        position: [5, -15],
        scale: [1, 1],
        zlevel: zlevel,
        style: {
            x: 0,
            y: 0,
            image: option.color,
            width: option.width || 100,
            height: option.height || 100
        },
        onclick: function onclick() {
            // window.open('/skyeye/home/screen3?unit='+nodeData.title)
        }
    });
    /*  let rect1 = new RectShape({
         rotation:Math.PI/4,
         zlevel,
         shape: {
             x:10,
             y:10,
             width:10,
             height:10,
         },
         style: {
             fill:option.color,
             shadowBlur: option.color,
             shadowBlur:50
         }
     })
     let rect2 = new RectShape({
         rotation:Math.PI/4,
         zlevel,
         shape: {
             x:5,
             y:5,
             width:20,
             height:20,
         },
         style: {
             opacity:0,
             fill:option.color,
             shadowBlur: option.color,
             shadowBlur:50
         }
     })
       let rect3 = new RectShape({
         rotation:Math.PI/4,
         zlevel,
         shape: {
             x:0,
             y:0,
             width:30,
             height:30,
         },
         style: {
             opacity:0,
             fill:option.color,
             shadowBlur: option.color,
             shadowBlur:50
         }
     }) */

    var titleNode = new _Text2.default({
        zlevel: zlevel,
        style: {
            x: option.width / 2 + 5,
            y: option.height - 2,
            text: nodeData.title,
            textAlign: 'center',
            textFill: '#4CDAF6', //option.color,
            fontSize: '10',
            opacity: 0.8
        }
    });

    var _titleNode$getBoundin = titleNode.getBoundingRect(),
        titleX = _titleNode$getBoundin.x,
        titleY = _titleNode$getBoundin.y,
        titleWidth = _titleNode$getBoundin.width,
        titleHeight = _titleNode$getBoundin.height;

    var titleBK = new _Image2.default({
        position: [0, 0],
        scale: [1, 1],
        style: {
            x: titleX,
            y: titleY - 4,
            image: _squareNormal2.default,
            width: titleWidth,
            height: titleHeight + 8

        }
    });

    /*  
     rect2.animate('style', true)
     .when(1000, {
         opacity:0.6
     })
     .when(2000, {
         opacity:0.6
     })
     .when(3000, {
         opacity:0.6
     })
     .when(4000, {
         opacity:0
     })
     .start();
     rect3.animate('style', true)
     .when(1000, {
         opacity:0
     })
     .when(2000, {
         opacity:0.4
     })
     .when(3000, {
         opacity:0
     })
     .when(4000, {
         opacity:0
     })
     .start(); */

    /* group.add(rect1)
    group.add(rect2)
    group.add(rect3) */
    group.add(circle);
    group.add(titleBK);
    group.add(titleNode);
}