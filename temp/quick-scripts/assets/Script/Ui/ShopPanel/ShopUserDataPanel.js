(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/ShopPanel/ShopUserDataPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ee544AD7o5MYbfEDunnwC2/', 'ShopUserDataPanel', __filename);
// Script/Ui/ShopPanel/ShopUserDataPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_lifeValue: cc.Label,
        label_coinValue: cc.Label,
        label_diamondValue: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on("UpdateUserData", this.UpdateUserData, this);
    },
    start: function start() {},
    UpdateUserData: function UpdateUserData(data) {
        // this.label_lifeValue = data.life;
        this.label_coinValue.string = data.totalUsdt;
        this.label_diamondValue.string = data.totalCoinOne;
        console.log("-------------UpdateUserData2-------------------");
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("UpdateUserData");
    }
    // update (dt) {},

});

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
        //# sourceMappingURL=ShopUserDataPanel.js.map
        