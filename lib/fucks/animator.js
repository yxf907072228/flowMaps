"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});


function Animation() {
    if (!(this instanceof Animation)) {
        return Animation();
    } else {
        if (!Animation.instance) {
            this.init();
            this.start();
        }
        return Animation.instance;
    }
}

Animation.prototype = {
    init: function init() {
        Animation.instance = this;
        this._t = 0;
        this.animators = [];
    },
    addAnimator: function addAnimator(animator) {
        this.animators.push(animator);
        animator.startTime = this._t;
    },
    removeAnimator: function removeAnimator(animator) {
        this.animators.splice(this.animators.indexOf(animator), 1);
    },
    start: function start() {
        this.run();
    },
    run: function run() {
        var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var run = this.run.bind(this);
        //  if(t<1000){
        this.animators.map(function (animator) {
            animator.runFrame(t);
        });
        this._t = t;
        requestAnimationFrame(run);
        //  }
    }
};

function Animator() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._clips = [];
    this._tempClips = [];
    this.target = option.target || {};
    this.loop = option.loop || false;

    this.startTime = 0;
    this.timeCount = 0;
    this.tempIndex = false;
    this.tempTarget = {};
    this.startTarget = {};
}

Animator.prototype = {
    start: function start() {
        var _this = this;

        if (!this._clips.length) {
            return;
        }

        if (!(this._clips[0].props instanceof Function)) {
            Object.keys(this._clips[0].props).map(function (key) {
                _this.startTarget[key] = _this.target[key];
            });
        }

        this._tempClips = this._clips.map(function (item) {
            return {
                time: item.time,
                props: item.props instanceof Function ? item.props : JSON.parse(JSON.stringify(item.props))
            };
        });
        this.startTime = 0;
        this.initAnimation();
        return this;
    },
    runFrame: function runFrame(t) {
        var _this2 = this;

        var clips = this._clips,
            target = this.target,
            tempTarget = this.tempTarget;

        var range = t - this.startTime;
        var index = false,
            percent = 0;

        for (var i = 0, count = clips.length; i < count; i++) {

            if (range < clips[i].time) {

                if (this.tempIndex !== i) {
                    Object.keys(clips[i].props).map(function (key) {
                        _this2.tempTarget[key] = target[key];
                    });
                    this.tempIndex = i;
                    if (i > 0) {
                        this.timeCount = clips[i - 1].time;
                    }
                    //  console.log('i!!!!!!!!!!!!!!!!!!!',i)
                }
                index = i;
                break;
            }
        }
        if (index === false) {
            percent = 1;
            index = clips.length - 1;
            this.setter(index, percent, tempTarget);
            if (this.loop) {
                this.resume();
            } else {
                this.destroy();
                this.endCallBack && this.endCallBack();
            }
        } else {

            percent = (range - this.timeCount) / (clips[index].time - this.timeCount);
            this.setter(index, percent, tempTarget);
        }
    },
    setter: function setter(index, percent, oldTarget) {
        var clips = this._clips,
            target = this.target;
        var props = clips[index].props;

        if (props instanceof Function) {
            props(index, percent);
        } else {
            Object.keys(props).map(function (key) {
                target[key] = oldTarget[key] + (props[key] - oldTarget[key]) * percent;
            });
        }
        //  console.log(index, percent, target)
    },
    when: function when(time, props) {

        this._clips.push({
            time: time, props: props
        });

        return this;
    },
    done: function done(callback) {
        this.endCallBack = callback;
        return this;
    },
    initAnimation: function initAnimation() {
        new Animation().addAnimator(this);
        return this;
    },
    destroy: function destroy() {
        new Animation().removeAnimator(this);
    },
    resume: function resume() {
        this.startTime = 0;
        this.timeCount = 0;
        this.tempIndex = false;
        this.tempTarget = {};
        Object.assign(this.target, this.startTarget);
        this.destroy();
        this.initAnimation();
    }
};

/*  let a1=new Animator({
     target:{x:0,y:0},
     loop:true
 })
 a1.when(200,{x:100,y:100})
 .when(400,{x:500,y:500})
 .start() */

/*  a1.when(200,(index,percent)=>{
     console.log(index,percent)
 })
 .when(400,(index,percent)=>{
     console.log(index,percent)
 })
 .start() */

exports.Animator = Animator;