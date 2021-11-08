(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/MainPage/MainPage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6b98h9dcJB5JXE14uqzs1C', 'MainPage', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MainPage.js.map
        