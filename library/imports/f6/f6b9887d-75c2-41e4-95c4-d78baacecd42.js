"use strict";
cc._RF.push(module, 'f6b98h9dcJB5JXE14uqzs1C', 'MainPage');
// Script/Ui/MainPage/MainPage.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // Global.ProtocolMgr.queryUserData();
    },
    OnOpenPage: function OnOpenPage(event, customEventData) {
        Global.PageMgr.onOpenPage(customEventData);
    },
    OnOpenPage2: function OnOpenPage2(event, customEventData) {
        Global.PageMgr.onOpenPage(customEventData, 1);
    },
    openTipsPanel: function openTipsPanel(event, customEventData) {
        var data = customEventData.split("-");
        Global.PageMgr.pages[4].getComponent("NFTPanel").setTitle(data[0], data[1]);
        Global.PageMgr.onOpenPage(4);
    },
    showTips: function showTips(event, customEventData) {
        Global.PageMgr.showTipPage(customEventData);
    },
    start: function start() {},
    OpenTradingFloor: function OpenTradingFloor() {
        // dsBridge.call("goToC2C", "hello", function (res) {
        //     console.log(res)
        // })
    },
    OpenShoppingCenter: function OpenShoppingCenter() {
        // dsBridge.call("goToMall", "hello", function (res) {
        //     console.log(res)
        // })
    }
}
// update (dt) {},
);

cc._RF.pop();