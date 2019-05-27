

    function Animation() {
        if(!(this instanceof Animation)){
            return Animation()
        }else{
            if(!Animation.instance){
                this.init();
                this.start() 
            }
            return Animation.instance
        }
    }

    Animation.prototype = {
        init(){
            Animation.instance = this  
            this._t=0
            this.animators = []
        },
        addAnimator(animator){
            this.animators.push(animator)
            animator.startTime = this._t
        },
        removeAnimator(animator){
            this.animators.splice(this.animators.indexOf(animator),1)
        },
        start(){
            this.run()
        },
        run(t=0){
            let run  = this.run.bind(this)
          //  if(t<1000){
                this.animators.map((animator)=>{
                    animator.runFrame(t)
                })
                this._t=t
                requestAnimationFrame(run)
          //  }
        }
    }

    function Animator(option={}) {
        this._clips = []
        this._tempClips = []
        this.target = option.target || {}
        this.loop = option.loop || false

        this.startTime=0
        this.timeCount=0
        this.tempIndex=false
        this.tempTarget={}
        this.startTarget = {}
    }

    Animator.prototype = {
        start() {
            if(!this._clips.length){
                return
            }

            if(!(this._clips[0].props instanceof Function)){
                Object.keys(this._clips[0].props).map((key)=>{
                    this.startTarget[key] = this.target[key]
                })
            }

            this._tempClips =this._clips.map((item)=>{
                return {
                    time: item.time,
                    props: (item.props instanceof Function)?
                            item.props:
                            JSON.parse(JSON.stringify(item.props))
                }
            })
            this.startTime = 0
            this.initAnimation()
            return this
        },
        
        runFrame(t){
            let {_clips:clips, target,tempTarget} = this
            let range = t-this.startTime;
            let index= false, percent = 0
        
            
            for(let i=0,count=clips.length;i<count;i++){
                 
                if(range<clips[i].time){
                    
                    if(this.tempIndex!==i){
                        Object.keys(clips[i].props).map((key)=>{
                            this.tempTarget[key] = target[key]
                        })
                        this.tempIndex = i
                        if(i>0){
                            this.timeCount=clips[i-1].time
                        }
                      //  console.log('i!!!!!!!!!!!!!!!!!!!',i)
                    }
                    index=i
                    break
                }
            }
            if(index===false){
                percent = 1
                index=clips.length-1
                this.setter(index,percent,tempTarget)
                if(this.loop){
                    this.resume()
                }else{
                    this.destroy()
                    this.endCallBack&&this.endCallBack()
                }
                
            }else{
                
                percent = (range -this.timeCount) / (clips[index].time -this.timeCount);
                this.setter(index,percent,tempTarget)
            }
        },
        setter(index,percent,oldTarget){
            let {_clips:clips ,target} = this
            let { props } = clips[index]
            if(props instanceof  Function){
                props(index,percent)
            }else{
                Object.keys(props).map((key)=>{
                    target[key] =  oldTarget[key] + (props[key]-oldTarget[key])*percent
                })
            }
          //  console.log(index, percent, target)
        },
        when(time, props) {
           
            this._clips.push({
                time, props
            })

            return this
        },
        done(callback) {
            this.endCallBack = callback
            return this
        },
        initAnimation(){
            (new Animation()).addAnimator(this)
            return this
        },
        destroy(){
            (new Animation()).removeAnimator(this)
        },
        resume(){
            this.startTime=0
            this.timeCount=0
            this.tempIndex=false
            this.tempTarget={}
            Object.assign(this.target, this.startTarget)
            this.destroy()
            this.initAnimation()
        }
    }

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

    export {
        Animator
    }

