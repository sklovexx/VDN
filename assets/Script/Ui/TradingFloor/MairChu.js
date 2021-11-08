// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        List:{
            type: cc.Node,
            default: []
        },
        Item0:{
            type: cc.Prefab,
            default: null
        },
        Item1:{
            type: cc.Prefab,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    Toggle(event){
        this.List.forEach(e=>{
            e.active = false;
        })
        this.List[parseInt(event.node.name)].active = true;
    },
    UpdateList0(){
        let backPack = [];
        backPack.forEach(e=>{
            let node = cc.instantiate(this.Item0);
            node.parent = this.List[0];
        })
    },
    UpdateList1(){
        let backPack = [];
        backPack.forEach(e=>{
            let node = cc.instantiate(this.Item1);
            node.parent = this.List[1];
        })
    },
    start () {

    },

    // update (dt) {},
});
