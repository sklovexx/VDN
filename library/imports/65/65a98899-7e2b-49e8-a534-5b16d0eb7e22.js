"use strict";
cc._RF.push(module, '65a98iZfitJ6KU0WxbQ634i', 'BuyPanel');
// Script/Ui/宝宝游戏单页面/BuyPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        password: cc.EditBox,
        number: cc.EditBox,
        label_name: cc.Label,
        label_Value: cc.Label,
        propId: 1,
        type: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {
        console.log(this.propId);
        console.log(this.type);
        Global.ProtocolMgr.queryUserData();
        cc.director.GlobalEvent.on("UpdateUserData", this.UpdateUserData, this);
        if (this.type == 1) {
            this.label_name.string = "使用";
            this.label_Value.string = "使用";
        } else {
            this.label_name.string = "购买";
            this.label_Value.string = "购买";
        }
        this.number.string = "";
    },
    buy: function buy() {
        var reqData = void 0;
        switch (this.type) {
            case 0:
                //购买消耗品
                reqData = {
                    id: this.propId,
                    number: this.number.string
                };
                Global.ProtocolMgr.queryBuyConsumable(reqData, function (res) {
                    if (res.code == 200) {
                        Global.PageMgr.showTipPage("购买成功");
                        Global.PageMgr.onClosePage(15);
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
                break;
            case 1:
                //使用消耗品
                reqData = {
                    mc_id: this.propId,
                    number: this.number.string
                };
                Global.ProtocolMgr.queryUseConsumable(reqData, function (res) {
                    if (res.code == 200) {
                        Global.PageMgr.showTipPage("使用成功");
                        Global.PageMgr.pages[10].getComponent("KnapsackPanel").getShopList(null, 1);
                        Global.PageMgr.pages[11].getComponent("ChongWuPanel").showData();
                        Global.PageMgr.onClosePage(15);
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
                break;
            case 2:
                //使用消耗品
                break;
        }
    },
    UpdateUserData: function UpdateUserData(data) {
        // console.log("---------availableUsdt-------------"+data.availableUsdt);
        // console.log("---------------username-------"+data.username);
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("UpdateUserData");
    }
    // update (dt) {},

});

cc._RF.pop();