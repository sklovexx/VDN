
cc.Class({
    extends: cc.Component,

    properties: {
        editBox: cc.EditBox,
        inputLayer: cc.Node,
        rule:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.inputLayer.active = false;
    },
    showRule(){
        this.rule.active = true;
    },
    hideRule(){
        this.rule.active = false;
    },
    start () {
        // 连接网络
        if(!GlobalNiuNiu.connectState){
            GlobalNiuNiu.netProxy.connect();
        }
    },

    onBtnOpenRoom(){
        GlobalNiuNiu.netProxy.createRoom((resp)=>{
            GlobalNiuNiu.gameMgr.onOpenRoom(resp);
        });
    },

    onBtnEnterRoom(){
        this.inputLayer.active = false;
        let rid = parseInt(this.editBox.string);
        cc.log("join rid:" + rid);
        GlobalNiuNiu.netProxy.enterRoom(rid, (resp)=>{
            GlobalNiuNiu.gameMgr.onEnterRoom(resp);
        });
    },
    quitGame(){
        cc.director.loadScene('Dssc',()=>{
            console.log('切换场景')
        })
    },
    onBtnInput(){
        this.inputLayer.active = true;
    }
    // update (dt) {},
});
