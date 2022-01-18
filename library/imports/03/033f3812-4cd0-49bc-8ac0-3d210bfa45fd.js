"use strict";
cc._RF.push(module, '033f3gSTNBJvIrAPSEL+kX9', 'ChongZhiPanel');
// Script/Ui/宝宝游戏单页面/ChongZhiPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        btn_item: [cc.Node],
        editBox_ZS: cc.EditBox,
        label_RMB: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    toggle: function toggle(event) {
        this.btn_item.forEach(function (e) {
            e.getChildByName("label").color = new cc.Color(248, 145, 1);
        });
        event.target.getChildByName("label").color = new cc.Color(255, 255, 255);
    },
    onEdit: function onEdit(event) {
        console.log(event.string);
        if (parseFloat(event.string) < 0.1) {
            Global.PageMgr.showTipPage("最少要充值0.1个PMV");
            this.editBox_ZS.string = "";
            this.label_RMB.string = "";
        }
        if (this.editBox_ZS.string == "") {
            this.label_RMB.string = "";
            return;
        }
        this.label_RMB.string = cc.js.formatStr("需支付:%sRMB", parseFloat(event.string) * 99);
    },
    onDisable: function onDisable() {
        this.editBox_ZS.string = "";
        this.label_RMB.string = "";
    }
    // update (dt) {},

});

cc._RF.pop();