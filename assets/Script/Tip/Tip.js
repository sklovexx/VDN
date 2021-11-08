
cc.Class({
    extends: cc.Component,

    properties: {
        text:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let action = cc.repeatForever(cc.sequence(cc.moveBy(0.5,cc.v2(0,-30)),cc.moveBy(0.5,cc.v2(0,30))))
        this.node.runAction(action)
        setInterval(()=>{

        },1000)
        this.tag = [];
        this.tag['获得E金币'] = 'getEGold';
        this.tag['去社区'] = 'backToMain';
    },

    start () {
    },
    setItem(name){
        this.item = this.tag[name]
        this.text.getComponent(cc.Label).string = name
    },
    update (dt) {
        if(cc.sys.localStorage.getItem(this.item)==1){
            this.node.destroy();
        }
    },
});
