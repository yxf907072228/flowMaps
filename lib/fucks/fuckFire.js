'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fuck;

var _Group = require('zrender/lib/container/Group');

var _Group2 = _interopRequireDefault(_Group);

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

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var p = 'M70.4 787.2l416-457.6c12.8-16 38.4-16 51.2 0l416 457.6c6.4 9.6 19.2 12.8 28.8 12.8 35.2 0 51.2-41.6 28.8-67.2l-448-492.8c-28.8-32-76.8-32-102.4 0L12.8 732.8c-22.4 25.6-3.2 67.2 28.8 67.2 12.8 0 22.4-3.2 28.8-12.8z';

function createLineItem() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var line = new _Circle2.default({

        shape: {
            //  cx:points[50].x,
            //  cy:points[50].y,
            r: 5
        },
        style: {
            fill: 'red'
        },
        zlevel: 1
    });
    return line;
}

function getAngle(px, py, mx, my) {
    //获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    var x = Math.abs(px - mx);
    var y = Math.abs(py - my);
    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var cos = y / z;
    var radina = Math.acos(cos); //用反三角函数求弧度
    var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度

    if (mx > px && my > py) {
        //鼠标在第四象限
        angle = 180 - angle;
    }

    if (mx == px && my > py) {
        //鼠标在y轴负方向上
        angle = 180;
    }

    if (mx > px && my == py) {
        //鼠标在x轴正方向上
        angle = 90;
    }

    if (mx < px && my > py) {
        //鼠标在第三象限
        angle = 180 + angle;
    }

    if (mx < px && my == py) {
        //鼠标在x轴负方向
        angle = 270;
    }

    if (mx < px && my < py) {
        //鼠标在第二象限
        angle = 360 - angle;
    }

    return angle;
}

function fuck(tapu, start, end) {
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var points = (0, _coordinates.getCurvePath)([start.x, start.y], [end.x, end.y], 0.4, 0.02);
    var fcolor = option.color || 'rgb(228, 89, 33)';
    var group = new _Group2.default();
    var maxlen = 60;
    var _points$ = points[0],
        sx = _points$.x,
        sy = _points$.y;


    for (var i = 0; i < maxlen; i++) {
        var line = new _Circle2.default({
            shape: {
                //  cx:points[50].x,
                //  cy:points[50].y,
                cx: sx - i * 2,
                cy: sy,
                r: 5 - 5 / maxlen * i

            },
            style: {
                fill: fcolor,
                opacity: 0.5 - 0.4 / maxlen * i - 0.1 * Math.random(),
                shadowColor: 'rgba(255,255,255,0.6)',
                shadowBlur: 6
            },

            zlevel: 1
        });
        group.add(line);
    }
    tapu.rootGroup.add(group);

    var childs = group.children();
    var animator = new _animator.Animator();
    var count = points.length;

    var _loop = function _loop(j) {
        animator.when(30 * j, function (index, p) {

            var lx = 1,
                ly = 1;
            var p1 = points[index],
                p2 = points[index + 1];
            if (p2) {

                var angle = getAngle(p1.x, p1.y, p2.x, p2.y) * Math.PI / 180;
                /*  if(points[index+1].x<points[index].x){
                     lx=-1
                 }
                   if(points[index+1].y<points[index].y){
                     ly=-1
                 } */

                childs.map(function (c, i) {
                    Object.assign(c.shape, {
                        cx: p1.x + (p2.x - p1.x) * p - i * 1.2 * lx * Math.sin(angle) + 5 * Math.random(),
                        cy: p1.y + (p2.y - p1.y) * p + i * 1.2 * ly * Math.cos(angle) + 5 * Math.random(),
                        r: 5 - 5 / maxlen * i
                    });
                    c.style.opacity = 0.5 - 0.4 / maxlen * i - 0.1 * Math.random(), c.dirty();
                });
            } else {
                p1 = points[points.length - 2], p2 = points[points.length - 1];
                var _angle = getAngle(p1.x, p1.y, p2.x, p2.y) * Math.PI / 180;
                childs.map(function (c, i) {
                    if (c.style.opacity > 0) {
                        Object.assign(c.shape, {
                            cx: p1.x + (p2.x - p1.x) * p - i * 1.2 * lx * Math.sin(_angle) + 5 * Math.random(),
                            cy: p1.y + (p2.y - p1.y) * p + i * 1.2 * ly * Math.cos(_angle) + 5 * Math.random(),
                            r: 5 - 5 / maxlen * i
                        });
                        c.style.opacity = 0.5 - 0.5 / maxlen * i, c.dirty();
                    }
                });
                var _i = childs.length - (j - count) * 6 - 7;
                console.log(_i);
                if (points[_i]) {
                    childs[_i - 5].style.opacity = 0;
                    childs[_i - 4].style.opacity = 0;
                    childs[_i - 3].style.opacity = 0;
                    childs[_i - 2].style.opacity = 0;
                    childs[_i - 1].style.opacity = 0;
                    childs[_i].style.opacity = 0;
                    childs[_i].dirty();
                }
            }
            /* if(points[index+1]){
                group.rotation = -getAngle(points[index].x,points[index].y,points[index+1].x,points[index+1].y)*Math.PI/180
                group.dirty()
            } */
        });
    };

    for (var j = 0; j < count + 10; j++) {
        _loop(j);
    }
    animator.start().done(function () {
        tapu.rootGroup.remove(group);
    });
    /* points.map((p,i)=>{
       
       if(points[i+1]){
            let line =  createLineItem({color:fcolor})
            line.position = [p.x, p.y]
        // line.rotation = -getAngle(p.x,p.y,points[i+1].x,points[i+1].y)*Math.PI/180
        //  console.log(getAngle(p.x,p.y,points[i+1].x,points[i+1].y))
            group.add(line)
       }
       
    }) 
    
      
    let childs = group.children()
    let animator = new Animator()
    let count = childs.length
    let len = 30
    for(let i =0;i<count+len;i++){
        
        animator.when(100*i,(index,p)=>{
            let start = index-len, end = index
            start= start<0?0:start
            end = end>=count?count-1:end
           
            for(let j=0;j<count;j++){
                let child = childs[j]
                if(j>=start&&j<=end){
                    let _i = j-start
                    _i = _i<0?0:_i
                    child.style.opacity = 1/(end-start)*(_i)+p/100
                    child.dirty()
                }else{
                    child.style.opacity = 0
                    child.dirty()
                }
            }
        })
    }
        animator.start().done(()=>{
        tapu.rootGroup.remove(group)
    }) */
}