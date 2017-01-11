import zuzhi from '../images/zuzhi.png'
import zuzhi_no from '../images/zuzhi_no.png'
import zizuzhi from '../images/zizuzhi.png'
import zizuzhi_no from '../images/zizuzhi_no.png'
import para from '../images/para.png'
import para_no from '../images/para_no.png'
import guanli from '../images/guanli.png'
import money from '../images/money.png'
import user from '../images/user.png'
import chaosuan from '../images/chaosuan.png'

import chaosuan_false from '../images/chaosuan_false.png'
import chaosuan_no from '../images/chaosuan_no.png'

import cloudImage from '../images/cloud_bk.png'

export const MENU_TYPES = [
    {key:"addGroup",title:"新建组",targets:{node:false,rootGroup:true,container:false}}
   ,{key:"addNode",title:"新建节点",targets:{node:false,rootGroup:true,container:true}}
   ,{key:"addArrow",title:"连接",targets:{node:true,rootGroup:false,container:false}}
   ,{key:"rename",title:"重命名",targets:{node:true,rootGroup:false,container:true}}
   
   ,{key:"delete",title:"删除",targets:{node:true,rootGroup:false,container:true}}
   ,{key:"reset",title:"清空画布"}
   ,{key:"zoomin",title:"放大"}
   ,{key:"zoomout",title:"缩小"}
   ,{key:"zoomreset",title:"1:1"}
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
   ]
]

export const NODE_TYPES = {
    zuzhi:{icon:zuzhi,level:1,title:'节点一'},
    zzuzhi:{icon:zizuzhi,level:2,title:'节点二'},
    bx:{icon:para ,level:3,title:'节点三'},
    cs:{
     icon:chaosuan
    ,icon_false:chaosuan_false
    ,icon_no:chaosuan_no,level:4,title:'节点四'}
}

export const GROUP_TYPES = {
    group1: {
        title: '组一',
        width: 200,
        height: 100,
        style: {
            lineWidth: 3
        }
    },
    group2:{
        title: '组二',
        shape: 'image',
        image: cloudImage,
        width: 300,
        height: 150
    },
    group3:{
        title: '组三',
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

export const NODE_TYPES_LENGTH = 4

export const NODE_INFO = {
    width: 45
   ,height: 50
}
