
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        setInterval(()=>{
            let action = cc.rotate3DBy(0.1,0,-90,0)
            action.setTag(100)
            this.node.stopActionByTag(100)
            this.node.runAction(action)
        },100)
    },
    launch(dir){
        let actions = cc.sequence(cc.jumpBy(0.5, cc.v2(dir*dataFunc.randomNum(1,120), 150), 300, 1),cc.jumpBy(0.5, cc.v2(dir*dataFunc.randomNum(10,120), dataFunc.randomNum(0,80)), 50, dataFunc.randomNum(1,4)),cc.fadeOut(1).easing(cc.easeCubicActionOut()),cc.callFunc(this.finish,this))
        this.node.runAction(actions)
    },
    finish(){
        console.log(1)
    },
    start () {

    },
    // update (dt) {},
});
