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

 
export const NODE_TYPES={
    zuzhi:{icon:zuzhi,icon_no:zuzhi_no,level:1,title:'创建组织'},
    zzuzhi:{icon:zizuzhi,icon_no:zizuzhi_no,level:2,title:'创建子组织'},
    bx:{
     icon:para
    ,icon_no:para_no
    ,icon_admin:guanli
    ,icon_pay:money
    ,icon_pay_admin:user
    ,level:3,title:'选择并行账号'},
    cs:{
     icon:chaosuan
    ,icon_false:chaosuan_false
    ,icon_no:chaosuan_no,level:4,title:'创建超算'}
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