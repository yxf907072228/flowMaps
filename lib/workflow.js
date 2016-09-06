'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FLOW_MAP_DATA = require('./FLOW_MAP_DATA');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _workflow = require('./jsx/workflow.jsx');

var _workflow2 = _interopRequireDefault(_workflow);

var _zrender = require('zrender/src/zrender');

var _zrender2 = _interopRequireDefault(_zrender);

var _Image = require('zrender/src/shape/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Path = require('zrender/src/shape/Path');

var _Path2 = _interopRequireDefault(_Path);

var _Line = require('zrender/src/shape/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkFlow = function (_FlowMap) {
    _inherits(WorkFlow, _FlowMap);

    function WorkFlow(props) {
        _classCallCheck(this, WorkFlow);

        return _possibleConstructorReturn(this, (WorkFlow.__proto__ || Object.getPrototypeOf(WorkFlow)).call(this, props));
    }

    _createClass(WorkFlow, [{
        key: 'transConnectNode',
        value: function transConnectNode(source, target) {
            return [source['position'][0], source['position'][1], target['position'][0], target['position'][1]];
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(WorkFlow.prototype.__proto__ || Object.getPrototypeOf(WorkFlow.prototype), 'componentDidMount', this).call(this);
            // this.switchZuZhiIcon();
        }
    }, {
        key: 'refreshFillStyle',
        value: function refreshFillStyle() {
            this.setState({
                mapWidth: window.innerWidth,
                mapHeight: window.innerHeight
            });
            this.paperTop = this.getTop(this.refs.paper);
            this.paperLeft = this.getLeft(this.refs.paper);
            this.zr.resize();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {}

        //判断是否可以建立关系
        /*isAddConnection(node){
            const plevel=NODE_TYPES[this.status.activeNode._type].level;
            const clevel=NODE_TYPES[node._type].level;
            
            let result=false
            if(plevel==1&&(clevel==2||clevel==3)){
                result=true
            }else if(plevel==2&&clevel==3){
                result=true
            }else if(plevel==3&&clevel==4){
                result=true
            }
            
            //当mouseover的目标节点有父节点
            if(JSON.stringify(node._sourceNodes)!='{}'){
                result=false
            }
            
            return this.status.activeNode.id!==node.id&&this.status.activeNode._targetNodes[node.id]!=true&&result
        }*/

        //给子组织自动连接到父组织专用

        /*
            createArrow(){
                let model=this.refs.confirmmodel
                let targetNode=this.status.arrowTargetNode
                const arrow=this.doArrow()
                if(targetNode._type=='cs'){
                    model=this.refs.confirmcsmodel
                }
                
                model.openModel({
                    show:true
                   ,left:targetNode['position'][0]
                   ,top:targetNode['position'][1]
                   ,info:"确认要建立连接吗？"
                   ,onSubmit:function(r){
                       this.props.onAddArrow(function(data){
                           //添加箭头有时候是返回success：true  有时候返回的是个对象
                           if(data&&data.success!==false){
                               this.props.alert('建立连接成功')
                               if(targetNode._type=='cs'&&r===false){
                                    targetNode.style.image=NODE_TYPES['cs']['icon_false']
                                    this.zr.render()
                               }
                           }else{
                                this.deleteArrow(arrow.arrow.id)
                               
                           }
                       }.bind(this),{
                           arrow:arrow
                          ,sourceNode:this.nodes[arrow['source']]
                          ,targetNode:this.nodes[arrow['target']]
                       },r)
                   }.bind(this)
                   ,onCancel:function(){
                      this.deleteArrow(arrow.arrow.id)
                      
                   }.bind(this)
                })
                
            }*/
        /*
        delActiveArrow(){
            super.delActiveArrow();
           
            this.switchZuZhiIcon();
        }
        */

        /*
        createNode(type,x,y){
            let data={}
            let model=this.refs.addmodel
            if(type=='bx'){
                this.props.getFreeUsers(function(data){
                    model=this.refs.addbxmodel
                    model.openModel({
                         show:true
                        ,left:x
                        ,top:y
                        ,data
                        ,used:this.getUsedBX()
                        ,onSubmit:function(){
                            if(model.state.userId==undefined){
                                this.props.alert("请选择并行帐号！")
                                return false
                            }
                            this.props.onAddNode(function(){
                               
                                    this.drawBX(model.state.user,x,y)
                               
                                this.zr.render()
                               // console.log("node._data!!!!!!!!!!!",node._data)
                            }.bind(this),{
                                type
                               ,_data:model.state.user
                            })
                            
                        }.bind(this)
                    })
                }.bind(this))
                
            }else if(type=='cs'){
                model=this.refs.addcsmodel
                this.props.getFreeSc(function(data){
                    //alert(data);
                    //console.log(data)
                     
                    model.openModel({
                         show:true
                        ,left:x
                        ,top:y
                        ,data:data["data"]["clusterUsers"]["data"]
                        ,used:this.getUsedCS()
                        ,onSubmit:function(){
                            if(model.state.id==undefined){
                                this.props.alert("请选择超算帐号！")
                                return false
                            }
                            this.props.onAddNode(function(){
                                let node=this.addNode(type,x,y)  
                               // console.log('CS!!!!',model.state.CS)
                                node._data=Object.assign({
                                    csId:model.state.id
                                },model.state.CS)
                                node.style.text=node._data.cluster+":"+node._data.name
                                this.zr.render()
                               // console.log(this.nodes)
                            }.bind(this),{
                                type
                            })
                        }.bind(this)
                    })
                }.bind(this))
            }else{
                model.openModel({
                    show:true
                ,left:x
                ,top:y
                ,data
                ,onSubmit:function(){
                    this.props.onAddNode(function(data){
                        let node=this.addNode(type,x,y)  
                        node._data=data
                        node.style.text=data.name
                        if(type=='zuzhi'){
                            this.switchZuZhiIcon()
                        }
                        this.zr.render()
                        if(type=='zzuzhi'){
                            var pnode=this.getZuZhi();
                            if(pnode){
                              this.createArrowAuto(pnode,node);
                            }
                        }
                       // console.log("node._data!!!!!!1",node._data)
                    }.bind(this),{
                        type
                        ,obj:{
                            value:model.refs.name.value
                        }
                    })
                    
                }.bind(this)
                })
            }
        }
        */
        //当创建子组织的时候，会自动跟父组织创建关系，此方法用于获取图中唯一的父组织

    }, {
        key: 'getZuZhi',
        value: function getZuZhi() {
            var nodes = this.nodes;
            for (var i in nodes) {
                if (nodes[i]['_type'] == 'zuzhi') {

                    return nodes[i];
                }
            }
        }

        //由于每张图只有一个父组织，这个方法决定父组织拖拽图标是否可用

    }, {
        key: 'switchZuZhiIcon',
        value: function switchZuZhiIcon() {
            var nodes = this.nodes;
            for (var i in nodes) {
                if (nodes[i]['_type'] == 'zuzhi') {
                    this.disableToolbar(0);
                    this.enableToolbar(1);

                    return;
                }
            }
            this.enableToolbar(0);
            this.disableToolbar(1);
        }
        /*
             mouseOverActiveNode(node){
                if(this.status.dragging||this.status.draggingToolbar){
                    return
                }
                if(this.status.activeArrow){
                    if(this.isAddConnection(node)){
                    this.status.arrowTargetNode=node
                    node.style.shadowBlur=10
                    this.zr.refresh()
                    }
                    return
                }
                if(node._type=='bx'){
                    let menus={
                            2:true,3:true,4:true,5:true
                    }
                    let user=node._data
        
                    if(JSON.stringify(node._sourceNodes)=="{}"){
                        menus={ 2:false,3:false,4:false,5:false}
                    }else if(user.role==0&&user.isPay){
                        menus={ 2:false,3:true,4:false,5:true}
                    }else if(user.role==0&&!user.isPay){
                        menus={ 2:false,3:true,4:true,5:false}
                    }else if(user.role==1&&user.isPay){
                        menus={ 2:true,3:false,4:false,5:true}
                    }else if(user.role==1&&!user.isPay){
                        menus={ 2:true,3:false,4:true,5:false}
                    }
        
                    
        
                    this.refs.nodemenu.show({
                         top:node['position'][1]+node.style.height
                        ,left:node['position'][0]
                        ,menus
                    })
                }else if(node._type=='cs'){
                    this.refs.nodemenu.show({
                         top:node['position'][1]+node.style.height
                        ,left:node['position'][0]
                        ,menus:{
                            0:false,2:false,3:false,4:false,5:false
                        }
                    })
                }else{
                    this.refs.nodemenu.show({
                         top:node['position'][1]+node.style.height
                        ,left:node['position'][0]
                        ,menus:{
                            2:false,3:false,4:false,5:false
                        }
                    })
                }
                //console.log(node._data,node._type)
                this.status.activeNode=node
            }
            */

    }, {
        key: 'headMenuHandle',
        value: function headMenuHandle(i, event) {
            if (i == 0) {
                this.clearPaper();
            }
        }
        /*   
           nodeMenuHandle(i,event){
               if(i==0){
                   this.addActiveArrow()
                   
               }else if(i==1){
                   let model=this.refs.confirmmodel
                   model.openModel({
                       show:true
                       ,info:"确认要删除节点吗？"
                       ,onSubmit:function(){
                           this.props.onDelNode(this.status.activeNode,function(){
                               let nodeType=this.status.activeNode._type
                               if(nodeType=='bx'){
                                   let cnodes=this.status.activeNode._targetNodes
                                   for(var key in cnodes){
                                       this.deleteNode(this.nodes[key])
                                   }
                               }
                               
                               this.deleteNode()
                               this.props.alert("删除成功！")
                               if(nodeType=='zuzhi'){
                                   this.switchZuZhiIcon()
                               }
                               
                           }.bind(this))
                       }.bind(this)
                       ,onCancel:function(){
                         //  alert("cancel")
                           
                       }.bind(this)
                   })
                  
               }else if(i==2){
                   this.props.addAdminUser(this.status.activeNode._data,function(){
                      // alert('添加管理员权限')
                      this.status.activeNode._data.role='0'
                      this.setUserIcon(this.status.activeNode)
                   }.bind(this))
                   
               }else if(i==3){
                   this.props.delAdminUser(this.status.activeNode._data,function(){
                      // alert('删除管理员权限')
                      this.status.activeNode._data.role=1
                      this.setUserIcon(this.status.activeNode)
                   }.bind(this))
               }else if(i==4){
                    this.props.addPayUser(this.status.activeNode._data,function(){
                       //alert('设为支付账户')
                       this.setPayUser(this.status.activeNode);
                       this.setUserIcon(this.status.activeNode)
                   }.bind(this))
               }else if(i==5){
                    this.props.delPayUser(this.status.activeNode._data,function(){
                      // alert('取消支付账户')
                      this.status.activeNode._data.isPay=false
                      this.setUserIcon(this.status.activeNode)
                   }.bind(this))
               }
               this.refs.nodemenu.setState({
                   show:false
               })
           }*/

    }, {
        key: 'clearPaper',
        value: function clearPaper() {
            this.zr.clear();

            this.status = {
                dropToolItem: null,
                activeNode: null,
                arrowTargetNode: null,
                activeArrow: null,
                dragging: false,
                draggingToolbar: false
            };
            this.toolbarItems = [];
            this.nodes = {};
            this.arrows = {};
            this._initToolbar();
            /* this.refs.nodemenu.setState({
                         show:false
             })*/
            this.switchZuZhiIcon();
        }
    }, {
        key: 'drawWorkFlow',
        value: function drawWorkFlow(rootGroup) {
            this.clearPaper();
            var startLeft = 100,
                startTop = this.state.mapHeight / 2;
            if (rootGroup.userId) {
                this.drawBX(rootGroup, startLeft, startTop);
            } else {
                this.drawGroup(rootGroup, startLeft, startTop);
            }
            this.switchZuZhiIcon();
            this.zr.render();
        }
    }, {
        key: 'drawGroup',
        value: function drawGroup(group, x, y) {
            var _this2 = this;

            var type = arguments.length <= 3 || arguments[3] === undefined ? 'zuzhi' : arguments[3];

            var groupNode = this.addNode(type, x, y);
            groupNode._data = group;
            if (type == 'zuzhi' || type == 'zzuzhi') {

                groupNode.style.text = group.name;
            } else if (type == 'bx') {
                groupNode.style.image = this.getUserIconImage(group);
                groupNode.style.text = group.email || group.userName || group.userNameCn;
            } else if (type == 'cs') {
                groupNode['_data'] = {
                    csId: group.id
                };
                if (group.isInterval == false) {
                    groupNode.style.image = _FLOW_MAP_DATA.NODE_TYPES['cs']['icon_false'];
                }
                groupNode.style.text = group.cluster + ":" + group.name;
            }

            var c1 = [],
                xlen = 200,
                ylen = 80,
                ypadd = 0;

            if (group.childGroups) {
                var gcs = group.childGroups;
                for (var i in gcs) {
                    var gc = gcs[i];
                    c1.push(gc);
                }
            }

            if (group.users) {
                var cgus = group.users;
                for (var j in cgus) {
                    var cgu = cgus[j];
                    c1.push(cgu);
                }
            }

            if (group.clusters) {
                var gclus = group.clusters;
                for (var _j in gclus) {
                    var gclu = gclus[_j];
                    c1.push(gclu);
                }
            }

            var hlen = Math.floor(c1.length / 2);
            if (c1.length % 2 == 0) {
                ypadd = ylen / 2;
            }
            c1.map(function (item, i) {
                if (item['childGroups']) {
                    var cgroupNode = _this2.drawGroup(item, x + xlen, y + (i - hlen) * ylen + ypadd, 'zzuzhi');
                    _this2.doArrow(groupNode, cgroupNode);
                } else if (item['clusters']) {
                    var cBXNode = _this2.drawGroup(item, x + xlen, y + (i - hlen) * ylen + ypadd, 'bx');
                    _this2.doArrow(groupNode, cBXNode);
                } else {
                    var cCSNode = _this2.drawGroup(item, x + xlen, y + (i - hlen) * ylen + ypadd, 'cs');
                    _this2.doArrow(groupNode, cCSNode);
                }
            });
            return groupNode;
        }
        /**
        drawBX(user,x,y){
            let bxNode=this.addNode('bx',x,y)
            bxNode['_data']=user
            bxNode.style.image=this.getUserIconImage(user)
            bxNode.style.text=user.email||user.userName||user.userNameCn
            if(user.clusters){
                let ucs=user.clusters
                let c1=[],xlen=200,ylen=80,ypadd=0
                for(let i in ucs){
                    c1.push(ucs[i])
                }
                
                const hlen=Math.floor(c1.length/2)
                if(c1.length%2==0){
                    ypadd=ylen/2
                }
                
                c1.map((item,i)=>{
                    let csNode=this.addNode('cs',x+xlen,y+(i-hlen)*ylen+ypadd)
                    csNode['_data']={
                        csId:item.id
                    }
                    if(item.isInterval==false){
                        csNode.style.image=NODE_TYPES['cs']['icon_false']
                    }
                    csNode.style.text=item.cluster+":"+item.name
                      this.doArrow(bxNode,csNode)
                })
            }
            return bxNode
        }    
         */

    }, {
        key: 'setPayUser',
        value: function setPayUser(node) {
            var parentKey = null;
            var nodes = this.nodes;
            for (var key in node._sourceNodes) {
                parentKey = key;
            }

            for (var _key in nodes) {
                var cnode = nodes[_key];
                if (cnode['_sourceNodes'][parentKey]) {
                    cnode['_data']['isPay'] = false;
                    this.setUserIcon(cnode);
                }
            }
            node['_data']['isPay'] = true;
        }
    }, {
        key: 'setUserIcon',
        value: function setUserIcon(node) {
            var image = this.getUserIconImage(node._data);
            node.style.image = image;
            this.zr.render();
        }
    }, {
        key: 'getUserIconImage',
        value: function getUserIconImage(user) {
            var bx = _FLOW_MAP_DATA.NODE_TYPES['bx'];
            if (user.role == '0' && user.isPay) {
                return bx['icon_pay_admin'];
            } else if (user.role == '0') {
                return bx['icon_admin'];
            } else if (user.isPay) {
                return bx['icon_pay'];
            } else {
                return bx['icon'];
            }
        }
    }, {
        key: 'showMask',
        value: function showMask() {
            this.refs.addmodelmask.show();
        }
    }, {
        key: 'hideMask',
        value: function hideMask() {
            this.refs.addmodelmask.hide();
        }

        //onDelNode

    }, {
        key: 'render',
        value: function render() {
            return _workflow2.default.bind(this)();
        }
    }]);

    return WorkFlow;
}(_index2.default);

exports.default = WorkFlow;