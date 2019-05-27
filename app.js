import WorkFlow from './src/tapu'
import json from './src/demo_test_json'
import toolbar from './src/toolbar'
import rightMenu from  './src/rightMenu'
import * as mapConfig from './src/FLOW_MAP_DATA'

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
tapu.fuck(tapu.findNodeByName('单位二'),tapu.findNodeByName('单位三'),{type:'fire'})
tapu.fuck(tapu.findNodeByName('单位一'),tapu.findNodeByName('单位二'),{type:'path'})
tapu.fuck(tapu.findNodeByName('单位三'),tapu.findNodeByName('单位一'),{type:'star'})
tapu.fuck(tapu.findNodeByName('单位三'),tapu.findNodeByName('单位二'),{type:'normal'})



//tapu.fuck(tapu.findNodeByName('单位三'),tapu.findNodeByName('单位一'),{type:'normal'})
//tapu.fuck(tapu.findNodeByName('单位一'),tapu.findNodeByName('单位二'),{type:'path'})

//tapu.fuck(tapu.findNodeByName('单位一'),tapu.findNodeByName('单位二'))

///tapu.fuck(tapu.findNodeByName('六所'),tapu.findNodeByName('十一所'))
//console.log()
