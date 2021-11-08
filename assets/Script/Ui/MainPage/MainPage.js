
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Global.ProtocolMgr.queryUserData();
    },
    OnOpenPage(event, customEventData){
        Global.PageMgr.onOpenPage(customEventData)
    },
    OnOpenPage2(event, customEventData){
        Global.PageMgr.onOpenPage(customEventData,1)
    },
    openTipsPanel(event, customEventData){
        let data = customEventData.split("-");
        Global.PageMgr.pages[4].getComponent("NFTPanel").setTitle(data[0],data[1]);
        Global.PageMgr.onOpenPage(4);
    },
    showTips(event, customEventData){
        Global.PageMgr.showTipPage(customEventData);
    },
    start () {
    },
    OpenTradingFloor(){
        // dsBridge.call("goToC2C", "hello", function (res) {
        //     console.log(res)
        // })
    },
    OpenShoppingCenter(){
        // dsBridge.call("goToMall", "hello", function (res) {
        //     console.log(res)
        // })
    },
    // update (dt) {},
});
