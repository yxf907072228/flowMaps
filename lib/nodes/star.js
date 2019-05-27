'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _zrender = require('zrender/lib/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Circle = require('zrender/lib/graphic/shape/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _Text = require('zrender/lib/graphic/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Image = require('zrender/lib/graphic/Image');

var _Image2 = _interopRequireDefault(_Image);

var _RadialGradient = require('zrender/lib/graphic/RadialGradient');

var _RadialGradient2 = _interopRequireDefault(_RadialGradient);

var _Rect = require('zrender/lib/graphic/shape/Rect');

var _Rect2 = _interopRequireDefault(_Rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLevel(countAlert) {
    if (countAlert == 0) {
        return 0;
    } else if (countAlert < 10) {
        return 10;
    } else if (countAlert < 100) {
        return 12;
    } else if (countAlert < 1000) {
        return 14;
    } else if (countAlert < 10000) {
        return 16;
    } else if (countAlert < 100000) {
        return 18;
    } else if (countAlert < 1000000) {
        return 20;
    } else if (countAlert < 10000000) {
        return 22;
    } else if (countAlert < 100000000) {
        return 24;
    } else {
        return 26;
    }
}
var unNameMap = {
    "单位": "一所",
    "单位二": "二所",
    "单位三": "三所",
    "单位四": "四所",
    "单位五": "五所",
    "单位六": "六所",
    "单位七": "七所",
    "单位八": "八所",
    "单位九": "九所",
    "单位十": "十所",
    "单位十一": "十一所",
    "单位十二": "十二所",
    "单位十三": "计测中心",
    "单位十四": "惯约中心",
    "单位十五": "数据中心",
    "单位十六": "装备中心",
    "单位十七": "院机关",
    "单位十八": "信息中心"
};
function render(group, option, nodeData) {
    var zlevel = 30;
    var countAlert = group.countAlert;
    var countLevel = getLevel(countAlert || 0);
    var circle = new _Image2.default({
        position: [-5 - countLevel / 2, -10 - countLevel / 2],
        scale: [1, 1],
        zlevel: zlevel,
        style: {
            x: 0,
            y: 0,
            image: option.color,
            width: (option.width || 100) + countLevel,
            height: (option.height || 100) + countLevel
        },
        onclick: function onclick() {
            var title = nodeData.title;
            if (unNameMap[title]) {
                title = unNameMap[title];
            }
            // window.open('/skyeye/home/screen3?unit=' + title)
        }
    });
    /* let circle = new CircleShape({
        position:[5,5],
        shape:{
            r:2
        },
        style:{
            fill:new RadialGradient(0.5 ,0.5, 1, [
                {
                    offset: 0,
                    color: option.color //'rgba(228,46,78)'
                },
                {
                    offset: 0.2,
                    color: option.color.replace(")",",1)")
                },
                {
                    offset: 0.3,
                    color: option.color.replace(")",",0.5)")
                },
                {
                    offset: 1,
                    color: option.color.replace(")",",0.3)")
                }
            ]),
            shadowBlur: option.color,
            shadowBlur:20,
            opacity:1
        }
    }); */
    var titleNode = new _Text2.default({
        zlevel: zlevel,
        style: {
            x: 5,
            y: 15,
            text: nodeData.title,
            textAlign: 'center',
            textFill: '#4CDAF6', //option.color,
            fontSize: '10',
            opacity: 0.9
        }
    });

    var bk = new _Rect2.default({
        shape: {
            x: -10,
            y: -5,
            width: 30,
            height: 30

        },
        style: {
            fill: "transparent"
        },
        zlevel: 10

    });

    /* let t = 2000
    if(option.animateRandom){
        t=t-100+100*Math.random()
    }
    if(option.animate!==false){
        circle.animate('shape', true)
        .when(t, {
            r:10
        })
        .when(t*2, {
            r:3
        })
        .start(); 
        circle.animate('style', true)
        .when(t, {
            opacity:0.5
        })
        .when(t*2, {
            opacity:1
        })
        .start(); 
    }else{
        circle.shape.r=3
    }
     */

    group.add(circle);
    group.add(titleNode);
    group.add(bk);
}