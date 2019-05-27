import WorkFlow from '../../src/tapu'
import json from './bk.js'
import toolbar from './toolbar'
import rightMenu from  '../../src/rightMenu'
import * as mapConfig from './config'

var tapu = new WorkFlow()


toolbar.render(document.getElementById('toolbar'), {
    toolbarTypes: mapConfig['TOOLBAR_TYPES'],
    tapu
})
tapu.render(document.getElementById('paper'))
rightMenu.render(document.getElementById('rightMenu'), {
    menuTypes:  mapConfig['MENU_TYPES'],
    nodeTypes: mapConfig['NODE_TYPES'],
    groupTypes: mapConfig['GROUP_TYPES'],
    arrowTypes: mapConfig['ARROW_TYPES'],
    tapu
})
tapu.deserialization(json) 

let fucks = [
    [
        {start:'信号源',end:'单位一',type:'path'},
        {start:'信号源',end:'单位七',type:'path'},
        {start:'信号源',end:'单位二',type:'path'},
        {start:'信号源',end:'单位五',type:'path'},
        {start:'信号源',end:'单位四',type:'path'},
        {start:'信号源',end:'单位六',type:'path'},
        {start:'信号源',end:'单位十一',type:'path'},
        {start:'信号源',end:'单位十',type:'path'},
        {start:'信号源',end:'单位八',type:'path'},
        {start:'信号源',end:'单位九',type:'path'}
    ],
    [
        {start:'单位七',end:'信号源',type:'star',color:'rgba(255,255,0)'},
        {start:'单位四',end:'信号源',type:'star',color:'rgba(238,121,31)'},
        {start:'单位十',end:'信号源',type:'star',color:'rgba(238,121,31)'},
        {start:'单位九',end:'信号源',type:'star',color:'rgba(255,255,0)'},
        {start:'单位二',end:'信号源',type:'fire',color:'rgba(255,255,0)'},
        {start:'单位十一',end:'信号源',type:'star',color:'rgba(255,255,0)'}
    ],
    [
        {start:'单位一',end:'单位十',type:'star',color:'rgba(255,18,18)'},
        {start:'单位四',end:'单位十',type:'star',color:'rgba(255,255,0)'},
        {start:'单位十一',end:'单位十',type:'star',color:'rgba(255,18,18)'},
        {start:'单位三',end:'单位十',type:'star'},

        {start:'单位十',end:'单位二',type:'star'},
        {start:'单位十',end:'单位十二',type:'star',color:'rgba(255,18,18)'},
        {start:'单位十',end:'单位十一',type:'star'},
    ],
    [
        {start:'信号源',end:'单位二',type:'normal',color:'rgba(255,18,18)'},
        {start:'信号源',end:'单位十',type:'normal',color:'rgba(255,255,0)'},
        {start:'信号源',end:'单位四',type:'fire',color:'rgba(255,18,18)'},
        {start:'信号源',end:'单位十',type:'normal'},

        {start:'信号源',end:'单位二',type:'normal'},
        {start:'信号源',end:'单位十二',type:'normal',color:'rgba(255,18,18)'},
        {start:'信号源',end:'单位十一',type:'fire'},
        {start:'信号源',end:'单位三',type:'normal'},
        {start:'信号源',end:'单位七',type:'normal'},
        {start:'信号源',end:'单位六',type:'normal'},
        
    ],
    [
        {start:'单位七',end:'信号源',type:'normal',type:'fire'},
        {start:'单位三',end:'信号源',type:'normal',type:'fire'},
        {start:'单位四',end:'信号源',type:'normal',type:'fire'},
        {start:'单位十',end:'信号源',type:'normal',type:'fire'},
    ]
]




let index = 0
function fuck(){
    let t=0
    fucks.map((flist,i)=>{
        setTimeout(()=>{
            flist.map((f,j)=>{
                t+=300*i+100
                window.setTimeout(()=>{
                    tapu.fuck(tapu.findNodeByName(f['start']),tapu.findNodeByName(f['end']),{type:f['type'],color:f['color']})
                },t)
            })
        },100)
    })
}
fuck()
window.setInterval(()=>{
    fuck()
},25000)

let infoList = [
    {name:'单位六',title:'单位：单位六    地点：某国某城市 \r\n 人员数量：100    安全状态：告警     IP：10.1.1.1'},
    {name:'单位九',title:'单位：单位九    地点：某国某城市 \r\n 人员数量：3200    安全状态：告警     IP：105.1.2.1'},
    {name:'单位三',title:'单位：单位三    地点：某国某城市 \r\n 人员数量：87    安全状态：告警     IP：101.111.111.1'},
    {name:'单位十一',title:'单位：单位十一    地点：某国某城市 \r\n 人员数量：98    安全状态：告警     IP：192.168.1.1'},
    {name:'单位十',title:'单位：单位十    地点：某国某城市 \r\n 人员数量：41    安全状态：告警     IP：192.193.111.1'},
    {name:'单位五',title:'单位：单位五    地点：某国某城市 \r\n 人员数量：99    安全状态：告警     IP：101.111.1.111'},
 
]
let infoIndex = 0
notice()
window.setInterval(()=>{
    notice()
},15000)

function notice(){
    let n = infoList[infoIndex++]
    let node1 = tapu.findNodeByName(n.name)
    let alertNode = tapu.addNode('alertBox', node1.position, {
        tapu: tapu,
        node:node1,
        title: n.title
    })
    if(infoIndex>=infoList.length){
        infoIndex=0
    }
}
/*tapu.fuck(tapu.findNodeByName('单位二'),tapu.findNodeByName('单位三'),{type:'fire'})
tapu.fuck(tapu.findNodeByName('单位一'),tapu.findNodeByName('单位二'),{type:'path'})
tapu.fuck(tapu.findNodeByName('单位三'),tapu.findNodeByName('单位一'),{type:'star'})
tapu.fuck(tapu.findNodeByName('单位三'),tapu.findNodeByName('单位二'),{type:'normal'}) */



//tapu.fuck(tapu.findNodeByName('单位三'),tapu.findNodeByName('单位一'),{type:'normal'})
//tapu.fuck(tapu.findNodeByName('单位一'),tapu.findNodeByName('单位二'),{type:'path'})

//tapu.fuck(tapu.findNodeByName('单位一'),tapu.findNodeByName('单位二'))

///tapu.fuck(tapu.findNodeByName('六所'),tapu.findNodeByName('十一所'))
//console.log()
