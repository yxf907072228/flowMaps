import fuckNormal from './fuckNormal'
import fuckStar from './fuckStar'
import fuckPath from './fuckPath'
import fuckFire from './fuckFire'


export default function fuck(tapu,startNode,endNode,option={}){
    let {type} = option
    
    return new Promise((resolve, reject)=>{
        if(type == 'normal'){
            fuckNormal(tapu,startNode,endNode,option,()=>{
                resolve()
            })
        }else if(type == 'star'){
            fuckStar(tapu,startNode,endNode,option,()=>{
                resolve()
            })
        }else if(type == 'path'){
            fuckPath(tapu,startNode,endNode,option,()=>{
                resolve()
            })
        }else if(type == 'fire'){
            fuckFire(tapu,startNode,endNode,option),()=>{
                resolve()
            }
        }
    })

}