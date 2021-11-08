
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Global.ResourceMgr = cc.find("ResourceMgr").getComponent("ResourceMgr")
        Global.ProtocolMgr = cc.find("ProtocolMgr").getComponent("ProtocolMgr")
        Global.PageMgr = cc.find("PageMgr").getComponent("PageMgr")
        GameData.audio = 1;
    },  
    Nav(event,customEventData){
        Global.ResourceMgr.playTransitionIn()
        cc.director.loadScene(customEventData,()=>{
        })
    },
    closeGames(){
        try{
            app.closeUI()
        }catch (e) {
            console.log(e)
        }
    },
    start () {

    },

    // update (dt) {},
});
