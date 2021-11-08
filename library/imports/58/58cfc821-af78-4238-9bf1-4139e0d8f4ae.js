"use strict";
cc._RF.push(module, '58cfcghr3hCOJvxQTng2PSu', 'jiaoyi_item');
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