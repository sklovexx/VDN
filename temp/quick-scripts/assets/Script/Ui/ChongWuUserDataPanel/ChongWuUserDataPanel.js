(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/ChongWuUserDataPanel/ChongWuUserDataPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '44611bpDwlGCrRKCTBwvXBN', 'ChongWuUserDataPanel', __filename);
// Script/Ui/ChongWuUserDataPanel/ChongWuUserDataPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_zhanliValue: cc.Label,
        label_lifeValue: cc.Label,
        label_coinValue: cc.Label,
        label_diamondValue: cc.Label,
        label_id: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable: function onEnable() {
        // Global.ProtocolMgr.queryUserData();
        cc.director.GlobalEvent.on("ChongWuUserDataPanel", this.UpdateUserData, this);
    },
    start: function start() {
        if (this.label_id != null) {
            this.label_id.string = window.DEFAULT_userID;
        }
    },
    UpdateUserData: function UpdateUserData(data) {
        this.label_zhanliValue.string = data.zhanli;
        this.label_lifeValue = data.life;
        this.label_coinValue.string = data.totalUsdt;
        this.label_diamondValue.string = data.totalCoinOne;
        this.label_id.string = 0;
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("ChongWuUserDataPanel");
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
        //# sourceMappingURL=ChongWuUserDataPanel.js.map
        