let $el, $paper, $tapu,$options={}
function contextMenuHandler(e){
        let { menuTypes, groupTypes, nodeTypes, arrowTypes, tapu } = $options
        let target = ($tapu.status.hoverGroup&&$tapu.data($tapu.status.hoverGroup)['type'])||"rootGroup"
        console.log(target)
        $el.innerHTML = `
        ${
            menuTypes.map((item, i)=>{
                
                if(item.targets && (item.targets[target]==null||item.targets[target]==false)){
                    return;
                }

                if(item.key=='addGroup'){
                    return `<li class="first">
                        新建组
                        <ul class="rightMenu rightMenuChild">
                        ${
                                Object.keys(groupTypes).map((key)=>{
                                    let node = groupTypes[key]
                                    return `<li class="item" name="${item.key}-${key}">${node['title']}</li>`
                                }).join('')
                        }
                        </ul>
                    </li>`
                }else if(item.key=='addNode'){
                    return `<li  class="first">
                    新建节点
                    <ul  class="rightMenu rightMenuChild">
                        ${
                            Object.keys(nodeTypes).map((key)=>{
                                let node = nodeTypes[key]
                                return `<li class="item" name="${item.key}-${key}">${node['title']}</li>`
                            }).join('')
                        }
                    </ul>
                </li>`
            }else if(item.key == 'addArrow'){//arrowTypes
                return `<li  class="first">
                连线
                <ul  class="rightMenu rightMenuChild">
                    ${
                        arrowTypes.map((node)=>{
                           
                            return `<li class="item" name="${item.key}-${node.key}">${node['title']}</li>`
                        }).join('')
                    }
                </ul>
                </li>`
            }else{
                    return `<li  class="first item" name="${item.key}">${item.title}</li>`
            }
            }).join('')
        }

    `
    if($el){
        Object.assign($el.style,{
            top: e.clientY + 'px',
            left: e.clientX + 'px',
            visibility: 'visible'
        })
    }
    e.preventDefault()
}

function hideMenu(){
    if($el){
        clearActiveMenu();
        Object.assign($el.style, {
            visibility: 'hidden'
        })
    }
}

function destroy(){
    if($paper){
        $paper.removeEventListener('contextmenu',contextMenuHandler)
        $paper.addEventListener('click',hideMenu)
    }
}

function clearActiveMenu(){
    if($el){
        Array.from($el.querySelectorAll('li.first')).map((item)=>{
            item.className = item.className.replace(' active','')
        })
    }
}

function render(el, options){
    let { menuTypes, groupTypes, nodeTypes, tapu } = options
    $el = el
    $tapu = tapu
    $paper = tapu.paper
    $options = options
    function clickHandler(){
        alert()
    }
    $paper.addEventListener('contextmenu',contextMenuHandler)
    
    

    el.addEventListener('mouseover',(e)=>{
        let target = e.target;
        if(target.className.indexOf('first')!=-1){
            clearActiveMenu();
            target.className = target.className +' active'
        }else{
           // clearActiveMenu();
        }
    })

    

    el.addEventListener('click',(e)=>{
        let target = e.target;
        if(target.className.indexOf('item')!=-1){//rightMenuClickHandle
            let name = target.getAttribute('name')
            if(name.indexOf('-')!=-1){
                $tapu.rightMenuClickHandle(name.split('-')[0],{
                    type: name.split('-')[1],
                    left: $el.offsetLeft,
                    top: $el.offsetTop
                },e)
            }else{
                $tapu.rightMenuClickHandle(name,e)
            }

            hideMenu()
        }
    });

    $paper.addEventListener('click',hideMenu)


}

export default {
    render
}