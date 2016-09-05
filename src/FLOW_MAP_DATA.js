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

export const MENU_TYPES=[
    {key:"addGroup",title:"新建组"}
   ,{key:"addNode",title:"新建节点"}
   ,{key:"addArrow",title:"连接"}
   ,{key:3,title:"清空画布"}
   ,{key:4,title:"放大"}
   ,{key:5,title:"缩小"}
   ,{key:6,title:"1:1"}
]
 
export const NODE_TYPES={
    zuzhi:{icon:zuzhi,level:1,title:'节点一'},
    zzuzhi:{icon:zizuzhi,level:2,title:'节点二'},
    bx:{icon:para ,level:3,title:'节点三'},
    cs:{
     icon:chaosuan
    ,icon_false:chaosuan_false
    ,icon_no:chaosuan_no,level:4,title:'节点四'}
}
export const NODE_TYPES_LENGTH=4

export const NODE_INFO={
    width:45
   ,height:52
}

export let MAP_DATA={
    nodes:{
        
    }
   ,arrow:{
       
   }
}