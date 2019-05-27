

import starRender from '../../src/nodes/star'
import squareRender from '../../src/nodes/square'
import imageRender from '../../src/nodes/imageBk'
import alertRender from '../../src/nodes/alertBox'
import lineRender from '../../src/nodes/line'
import bubbleRender from '../../src/nodes/bubbleNode'
import pathNodeRender from '../../src/nodes/pathNode'

import unitRender from '../../src/nodes/unit'

import arrow1Render from '../../src/arrows/dashArrow'
import rightAngleArrowRender from '../../src/arrows/rightAngleArrow'


import cloudImage from '../../src/images/cloud_bk.png'
import warnIcon from '../../src/images/告警icon.png'
import shIcon from '../../src/images/shanghai_bk.png'
import bjIcon from '../../src/images/bj_bk.png'
import myIcon from '../../src/images/my_bk.png'
import normalBk from '../../src/images/square-normal.png'
import warnBk from '../../src/images/红色框.png'
import unitBk from '../../src/images/unit_bk.png'

import ruqinNode from '../../src/images/ruqin_node.png'
import safeNode from '../../src/images/safe_node.png'
import serverNode from '../../src/images/server_node.png'
import jiaohuanNode from '../../src/images/jiaohuaji.png'
import wangguanNode from '../../src/images/switches_node.png'
import unit1Node from '../../src/images/unit_node.png'
import unit2Node from '../../src/images/unit_node2.png'
import virusNode from '../../src/images/virus_node.png'
import wallNode from '../../src/images/wall_node.png'


import blueNode from '../../src/images/blueNode.png'
import redNode from '../../src/images/redNode.png'
import yellowNode from '../../src/images/yellowNode.png'
import greenNode from '../../src/images/greenNode.png'

import blueSquare from '../../src/images/blueSquare.png'
import greenSquare from '../../src/images/greenSquare.png'
import redSquare from '../../src/images/redSquare.png'
import yellowSquare from '../../src/images/yellowSquare.png'

export const ARROW_TYPES = [
    {key:"normal", title:"直线",arrow:false},
    {key:"vertical", title:"垂直线",arrow:false},
    {key:"bessel", title:"正弧线"},
    {key:"unbessel", title:"反弧线"},
    {key:'arrow1', title:"动态正弧线",render:arrow1Render},
    {key:'arrow2', title:"动态反弧线",render:arrow1Render, way:-1},
    {key:'raarrow', title:"直角箭头",render:rightAngleArrowRender}
    
]
export const GROUP_TYPES = {
    group1: {
        title: '用户组',
       // titleAlign:'top',  //top bottom
        width: 200,
        height: 100,
        style: {
            lineWidth: 1,
            stroke:'#206D7D'
        }
    },
    group2:{
        title: '云平台',
        shape: 'image',
        image: cloudImage,
        width: 300,
        height: 150
    },
    group3:{
        title: '基站',
        titleAlign:'top',
        titleBgColor:'orange',
        width: 150,
        height: 200,
        style: {
            lineWidth: 5,
            lineDash: [10, 10],
            stroke: "orange"
        },
        animateTime: 1000,
        animateOption: {
            lineDashOffset: -20
        }
    }
}

export const NODE_TYPES = {/* 
    fwql:{icon:fwql,level:1,title:'机柜'},
    jcfwl:{icon:jcfwl,level:2,title:'数据库',width:10,height:10},
    xnpzx:{icon:xnpzx,level:1,title:'基站服务器'},
    wljhj:{icon:wljhj,level:2,title:'网络交换机'},
    zydd:{icon:zydd,level:1,title:'路由器'}, */

    alertBox:{render:alertRender,zlevel:100,title:"告警消息",width:80,height:60,icon:warnBk,warnicon:warnIcon,color:'red',arrowCenter:true},
    unitNode1:{title:"单位节点一",width:40,height:50,icon:unit1Node,color:'#ff106e',arrowCenter:true},
    unitNode2:{title:"单位节点二",width:40,height:50,icon:unit2Node,color:'#D3D6D9',arrowCenter:true},
    
    safeNode:{title:"安全监测",width:40,height:50,icon:safeNode,color:'#D3D6D9',arrowCenter:true},
    serverNode:{title:"服务器",width:40,height:50,icon:serverNode,color:'#D3D6D9',arrowCenter:true},
    jiaohuanNode:{title:"交换机",width:70,height:50,icon:jiaohuanNode,color:'#D3D6D9',arrowCenter:true},
    wangguanNode:{title:"网关",width:70,height:50,icon:wangguanNode,color:'#D3D6D9',arrowCenter:true},
    ruqinNode:{title:"入侵检测",width:70,height:50,icon:ruqinNode,color:'#D3D6D9',arrowCenter:true},
    wallNode:{title:"防火墙",width:50,height:80,icon:wallNode,color:'#D3D6D9'},
    jiankongNode:{title:"主机监控",width:40,height:50,icon:unitBk,color:'#D3D6D9',arrowCenter:true},
    bdNode:{title:"防病毒",width:40,height:50,icon:virusNode,color:'#D3D6D9',arrowCenter:true},
    
    
    unit1:{render:unitRender,title:"单位",width:40,height:50,icon:unitBk,color:'#D3D6D9',arrowCenter:true},
    suo1:{render:imageRender,title:"所-正常",titleX:40,titleY:15,content:'100',contentX:40,contentY:35,width:80,height:60,icon:normalBk,color:'#27A5D9'},
    suo2:{render:imageRender,title:"所-告警",titleX:40,titleY:15,content:'100',contentX:40,contentY:35,width:80,height:60,icon:warnBk,color:'#CF7475'},
    mianyang:{render:imageRender,title:"绵阳",zlevel:1,titleX:200,titleY:35,width:500,height:500,icon:myIcon,color:'#4ED5F3'},
    beijing:{render:imageRender,title:"北京",zlevel:1,titleX:80,titleY:30,width:160,height:140,icon:bjIcon,color:'#4ED5F3'},
    shanghai:{render:imageRender,title:"上海",zlevel:1,titleX:80,titleY:40,width:120,height:90,icon:shIcon,color:'#4ED5F3'},
    //square:{render:squareRender,title:"数据中心",width:30,height:30,color:'rgba(1,242,200)',arrowOffset:[24,3]},
    errorSquare:{render:squareRender,zlevel:20,title:"红色数据中心",width:30,height:45,color:redSquare,arrowOffset:[21,30]},
    warnSquare:{render:squareRender,zlevel:20,title:"黄色数据中心",width:30,height:45,color:yellowSquare,arrowOffset:[21,30]},
    safeSquare:{render:squareRender,zlevel:20,title:"蓝色数据中心",width:30,height:45,color:greenSquare,arrowOffset:[21,30]},
    normalSquare:{render:squareRender,zlevel:20,title:"白色数据中心",width:30,height:45,color:blueSquare,arrowOffset:[21,30]},
    
    errorStar:{render:starRender,title:"红色节点",width:20,height:25,color:redNode,arrowOffset:[5,5],animateRandom:true},
    warnStar:{render:starRender,title:"黄色节点",width:20,height:25,color:yellowNode,arrowOffset:[5,5],animateRandom:true},
    safeStar:{render:starRender,title:"蓝色节点",width:20,height:25,color:greenNode,arrowOffset:[5,5],animateRandom:true},
    normalStar:{render:starRender,title:"白色节点",width:20,height:25,color:blueNode,arrowOffset:[5,5],animate:false},
    whiteStar:{render:starRender,title:"白色节点",width:20,height:25,color:blueNode,arrowOffset:[5,5],animateRandom:true},
    
    bubbleYellow: {render: bubbleRender, title:"黄色气泡", color:'rgba(255,255,0)' },
    bubbleGreen: {render: bubbleRender,title:"绿色气泡",color:'rgba(116,242,28)' },
    bubbleOrange: {render: bubbleRender,title:"橙色气泡",color:'rgba(238,121,31)' },
    bubbleRed: {render: bubbleRender,title:"红色气泡",color:'rgba(255,18,18)' },
    pathNode: {render: pathNodeRender, title:'白色图标' },
    
    helpLine:{render:lineRender}
    
}




export const MENU_TYPES = [
    /* {
        key:"addGroup-group1", title:"新建组", targets:{node:false,rootGroup:true,container:false}
    },  {key:"addNode", title:"新建节点", targets:{node:false,rootGroup:true,container:true},
        childs:Object.keys(NODE_TYPES).map((key)=>{
            let node =NODE_TYPES[key]
            return {
                key, 
                title:node.title
            }
        })
    }, */
    {key:"addNode",title:"气泡",targets:{node:false,rootGroup:true,container:true},
        childs:[
            {key:'bubbleYellow',title:'黄色气泡'},
            {key:'bubbleGreen',title:'绿色气泡'},
            {key:'bubbleOrange',title:'橙色气泡'},
            {key:'bubbleRed',title:'红色气泡'},
            {key:'pathNode',title:'白色图标'}
        ]
    },
    {key:"addNode",title:"节点",targets:{node:false,rootGroup:true,container:true},
        childs:[
            {key:'beijing',title:'区域一'},
            {key:'shanghai',title:'区域二'},
            {key:'mianyang',title:'区域三'},
            {key:'safeStar',title:'单位'},
            {key:'safeSquare',title:'信号中心'},
            {key:'helpLine',title:'辅助线'}
        ]
    },/* 
    {key:"addNode",title:"大屏三",targets:{node:false,rootGroup:true,container:true},
        childs:[
            {key:'unitNode1',title:'单位节点一'},
            {key:'unitNode2',title:'单位节点二'},
            {key:'safeNode',title:'安全监测'},
            {key:'serverNode',title:'服务器'},
            {key:'jiaohuanNode',title:'交换机'},
            {key:'wangguanNode',title:'网关'},
            {key:'ruqinNode',title:'入侵检测'},
            {key:'wallNode',title:'防火墙'},
            {key:'jiankongNode',title:'主机监控'},
            {key:'bdNode',title:'防病毒'},
            {key:'unit1',title:'数据单位'},
            
            
        ]
    }, */
    {key:"addArrow", title:"连接", targets:{node:true,rootGroup:false,container:true},
        childs:ARROW_TYPES.map((node)=>{
            return {
                key: node.key,
                title:node.title
            }
        })
    },
    {key:"rename", title:"重命名", targets:{node:true,rootGroup:false,container:true}},
    {key:"delete", title:"删除", targets:{node:true,rootGroup:false,container:true}},
    {key:"reset", title:"清空画布"},
    {key:"zoomin", title:"放大"},
    {key:"zoomout", title:"缩小"},
    {key:"zoomreset", title:"1:1"}
] 


export const TOOLBAR_TYPES = [
    [
        {name:'default',checkBtn:true}
   //    ,{name:'rectangle_selection',checkBtn:true} //框选
       ,{name:'pan',checkBtn:true}
    ]
   ,[
        {name:'zoomin'}
       ,{name:'zoomout'}
       ,{name:'zoomreset'}
       ,{name:'overview'}

   ]
   /*,[
        {name:'edge',checkBtn:true}
       ,{name:'edge_VH',checkBtn:true}
       ,{name:'polygon',checkBtn:true}
       ,{name:'line',checkBtn:true}
   ]*/
   ,[
        {name:'search'}
   ]
   
   ,[
        {name:'print'}
   ]
   ,[
        {name:'json',checkBtn:true}
   ]
   ,[
        {name:'max'},{name:'reset'}
   ],[
        {name:'skin'}
    ],[
        {name:'demos'}
    ]
]




export const NODE_TYPES_LENGTH = 4

export const NODE_INFO = {
    width: 100
   ,height: 100
   ,fontColor: 'red'
}


export const ARROW_INFO = {
    color:'#666'
}