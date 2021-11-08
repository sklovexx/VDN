"use strict";
cc._RF.push(module, 'ee544AD7o5MYbfEDunnwC2/', 'ShopUserDataPanel');
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