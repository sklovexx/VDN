
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
