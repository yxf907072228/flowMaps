import para from '../images/para.png'
import fwql from '../images/fwql.png'
import jcfwl from '../images/jcfwl.png'
import xnpzx from '../images/xnpzx.png'
import wljhj from '../images/wljhj.png'
import zydd from '../images/zydd.png'
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
    fwql:{icon:fwql,level:1,title:'机柜'},
    jcfwl:{icon:jcfwl,level:2,title:'数据库'},
    xnpzx:{icon:xnpzx,level:1,title:'基站服务器'},
    wljhj:{icon:wljhj,level:2,title:'网络交换机'},
    zydd:{icon:zydd,level:1,title:'路由器'}
}

export const GROUP_TYPES = {
    group1: {
        title: '用户组',
        width: 200,
        height: 100,
        style: {
            lineWidth: 3
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
    width: 100
   ,height: 60
   ,fontColor: 'red'
}


export const ARROW_INFO = {
    color:'#666'
}