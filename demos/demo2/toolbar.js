/* import json1 from './demo1_json'
import json2 from './demo2_json'
import json3 from './demo3_json'
import json4 from './demo4_json'
import json5 from './demo5_json'
 */

let $tapu
function render(el,options) {
    let { toolbarTypes, tapu } = options
    $tapu = tapu
    el.innerHTML = `
    
    <div class="toolbar closed" style="left:5px;top:5px;">
    <div class="toggle-btn ">
    <i class="ico toolbar-add"></i>
    </div>
    <div class="container">
        ${
            toolbarTypes.map((group, i)=>{
                return `<ul class='btns-group'>
                    ${
                        group.map((item,j)=>{
                            if(item.name=='search'){
                                return `
                                <div >
                                    <input class='btn' placeholder="搜索关键字"/>
                                    <li class='btn search' name='search' ><i class="ico toolbar-search" ></i></li>
                                </div>
                                `

                            }else if(item.name=='skin'){
                                return  `
                                    <div>
                                        <select class='skin'>
                                            <option value="default">默认主题</option>
                                            <option value="skin1">主题一</option>
                                            <option value="skin2">主题二</option>    
                                        </select>
                                    </div>
                                `
                            }else if(item.name=='demos'){
                                return  `
                                    <div>
                                        <select class='demos'>
                                            <option value="demo1">示例一</option>
                                            <option value="demo2">示例二</option>
                                            <option value="demo3">示例三</option>  
                                            <option value="demo4">示例四</option>  
                                            <option value="demo5">示例五</option>  
                                            
                                        </select>
                                    </div>
                                `
                            }else if(item.checkBtn){
                               return `<li class="btn check_btn" name='${item.name}'><i class="${"ico toolbar-"+item.name}"></i></li>`
                            }else{
                               return `<li class='btn'  name='${item.name}'><i class="${"ico toolbar-"+item.name}"></i></li>`
                            }
                        }).join('')
                    }
                </ul>`
            }).join('')
        }
        </div>
    </div>
    `
   

    el.querySelector('select.skin').addEventListener('change',(e)=>{
        
        let container = $tapu.paper.parentNode;
        container.className = 'flowmap ' + e.target.value
    })

    let timer;
    let index=0;
    let list = [

        [
            {start:'单位一', end:'设备一', option:{color:'rgba(255,0,0)',radian:-500}},
            {start:'单位七', end:'设备一', option:{color:'rgba(238,130,238)',radian:-800}},
            {start:'单位三', end:'设备一', option:{color:'rgba(0,255,0)',radian:-300}}
            
        ],
        [
            {start:'单位二', end:'设备二', option:{color:'rgba(135,206,250)',radian:500}},
            {start:'单位六', end:'设备二', option:{color:'rgba(127,255,170)',radian:820}},
            {start:'单位四', end:'设备二', option:{color:'rgba(255,255,224)',radian:900}},
            
        ],
        [
            {start:'单位一', end:'设备三', option:{color:'rgba(255,0,0)',radian:-500}},
            {start:'单位三', end:'设备三', option:{color:'rgba(0,255,0)',radian:-500}},
            {start:'单位六', end:'设备二', option:{color:'rgba(127,255,170)',radian:-520}},
            {start:'单位四', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位一', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位七', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位五', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位三', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位四', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位二', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'单位六', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}},
            {start:'设备一', end:'设备三', option:{color:'rgba(255,255,224)',radian:-500}}
        ],
        [
            {start:'设备一', end:'中心一', option:{color:'rgba(135,206,250)',radian:500}},
            {start:'设备二', end:'中心一', option:{color:'rgba(127,255,170)',radian:820}},
            {start:'设备三', end:'中心一', option:{color:'rgba(255,255,224)',radian:900}},
            
        ],
        [
            {start:'设备一', end:'中心二', option:{color:'rgba(255,0,0)',radian:-500}},
            {start:'设备二', end:'中心二', option:{color:'rgba(0,255,0)',radian:-500}},
            {start:'设备三', end:'中心二', option:{color:'rgba(127,255,170)',radian:-520}},
            {start:'单位四', end:'中心二', option:{color:'rgba(255,255,224)',radian:-500}}
            
        ]   
    ]
    let ftypes = ['normal','star','path','fire']
    /* el.querySelector('select.demos').addEventListener('change',(e)=>{
        window.clearTimeout(timer)
        timer = null
        switch(e.target.value){
            case 'demo3': tapu.deserialization(json1) ;break;
            case 'demo1': tapu.deserialization(json2) ;break;
            case 'demo5': tapu.deserialization(json3) ;break;
            case 'demo4': tapu.deserialization(json4) ;break;
            case 'demo2':
             tapu.deserialization(json5) 
             timer = window.setInterval(()=>{
                if(index>=list.length){
                    index=0
                }
                
                let item = list[index++]
                if(item instanceof Array){
                    item.map((o)=>{
                        let t = ftypes[index%4]
                        if(t=='fire'){
                            delete o.option['color']
                        }
                        $tapu.fuck($tapu.findNodeByName(o.start),$tapu.findNodeByName(o.end),Object.assign(o.option,{
                            type: t
                        }))
                    })
                }else{
                    $tapu.fuck($tapu.findNodeByName(item.start),$tapu.findNodeByName(item.end),item.option)
                }
                
             },2000)
            ;break;
            
        }
    }) */

     
    el.querySelector('.toggle-btn').addEventListener('click',()=>{
       let container = el.querySelector('.toolbar');
       if(container.className.indexOf(' closed')==-1){
        container.className=container.className+' closed'
       }else{
        container.className=container.className.replace(' closed','')
       }
    })
    Array.from(el.querySelectorAll('li.btn')).map((btn)=>{
        btn.addEventListener('click',(e)=>{
            let className = btn.className
            if($tapu){
               $tapu.clickToolbarBtnHandle({
                   name: btn.getAttribute('name')
               })
            }
        })
    })

  /*   let $toolbar = el.querySelector('.toolbar'),
    dstart = false, xstart=0,ystart=0 ,xo=0,yo=0;
    $toolbar.addEventListener('mousedown',function(e){
        if($toolbar.className.indexOf(' closed')){
            dstart = true
            xstart = e.screenX
            ystart = e.screenY
            xo =  parseFloat($toolbar.style.left.replace('px',''))
            yo = parseFloat($toolbar.style.top.replace('px',''))
        }
    })
    document.body.addEventListener('mousemove',function(e){
        if(dstart){
            $toolbar.style.left=xo + e.screenX - xstart +'px'
            $toolbar.style.top =yo + e.screenY - ystart+'px'
            
        }
    })
    document.body.addEventListener('mouseup',function(e){
        dstart = false
    }) */
}

export default {
    render
}