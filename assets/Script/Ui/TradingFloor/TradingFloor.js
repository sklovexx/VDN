
cc.Class({
    extends: cc.Component,

    properties: {
        SubPanel:{
            type: cc.Node,
            default: []
        },
        JiaoYiItem:{
            type: cc.Prefab,
            default: null
        },
        JiaoYiConTent:{
            type: cc.Node,
            default: null
        },
        SubPage:{
            type: cc.Node,
            default: []
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},
    UpdateJiaoYiData(){
        let backPack = [];
        backPack.forEach(e=>{
            let node = cc.instantiatethis(JiaoYiItem);
            node.getChildByName('Number').getComponent(cc.Label).string = 1
            node.getChildByName('Price').getComponent(cc.Label).string = 1
            node.getChildByName('Button').getChildByName('button').on(cc.Node.EventType.TOUCH_END,()=>{
            })
        })
    },
    Toggle(event){
        let children = event.node.parent.children;
        children.forEach(e=>{
            e.getChildByName('Text').color = new cc.color(255,255,255)
        })
        event.node.getChildByName('Text').color = new cc.color(138,55,249)
        this.SubPanel.forEach(e=>{
            e.active = false;
        })
        this.SubPanel[parseInt(event.node.name)].active = true;
    },
    closePage(){
        Global.PageMgr.onClosePage(8,1)
    },
    showSubPage(){
        let action = cc.moveTo(0.2,cc.v2(0,0));
        this.SubPage[0].active = true;
        this.SubPage[0].runAction(action);
    },
    closeSubPage(){
        let finish = function(){
            this.SubPage[0].active = false;
        }
        let action = cc.moveTo(0.2,cc.v2(1060,0),cc.callFunc(finish,this));
        this.SubPage[0].runAction(action);
    },
    start () {

    },

    // update (dt) {},
});
