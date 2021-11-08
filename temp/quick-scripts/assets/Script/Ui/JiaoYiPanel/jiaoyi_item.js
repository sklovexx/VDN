(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/JiaoYiPanel/jiaoyi_item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '58cfcghr3hCOJvxQTng2PSu', 'jiaoyi_item', __filename);
// Script/Ui/JiaoYiPanel/jiaoyi_item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_logo: cc.Sprite,
        label_num: cc.Label,
        label_name: cc.Label,
        label_count: cc.Label,
        label_rmb: cc.Label,
        label_dollor: cc.Label,
        label_bank: cc.Label,
        progress: cc.ProgressBar
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    setData: function setData(i, data) {
        var _this = this;

        try {
            cc.loader.load({ url: data.icon, type: 'png' }, function (err, res) {
                _this.UserData[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
            });
        } catch (e) {
            console.warn(e);
        }
        this.label_num.string = i + 1 + ".";
        this.label_name.string = data.name;
        this.label_count.string = data.tradeQuantity;
        this.label_rmb.string = data.rmbAmount;
        this.label_dollor.string = data.usdtAmount;
        // this.label_bank.string = data.bank;
        // this.progress.progress = 0.5
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
        //# sourceMappingURL=jiaoyi_item.js.map
        