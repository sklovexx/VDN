"use strict";
cc._RF.push(module, '79c6dD2xEBPZKCAuQ5YfZ0E', 'Arder_Item');
// Script/Ui/ArderPanel/Arder_Item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_pic: cc.Sprite,
        label_name: cc.Label,
        label_menpiao: cc.Label,
        label_pic: cc.Label,
        label_fee: cc.Label,
        propId: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start: function start() {},
    setData: function setData(data) {
        var _this = this;

        try {
            // cc.loader.load({url:data.icon,type:'png'},(err,res)=>{
            //     this.icon_pic.spriteFrame = new cc.SpriteFrame(res)
            // })
            cc.loader.loadRes("imgs/bg" + data.id, cc.SpriteFrame, function (err, sf) {
                if (!err) {
                    _this.icon_pic.spriteFrame = sf;
                }
            });
        } catch (e) {
            console.warn(e);
        }
        console.log(data);
        this.propId = data.id;
        this.label_name.string = data.grade_field_name;
        this.label_pic.string = cc.js.formatStr("%s个PMV\n每局胜奖励负扣减%s", parseFloat(data.crystal_quantity).toFixed(1), parseFloat(data.reward).toFixed(4));
        this.label_menpiao.string = cc.js.formatStr("门票:%s", parseFloat(data.ticket).toFixed(4));

        this.datas = data;
    },
    buy: function buy() {
        if (window.DEFAULT_availableUsdt >= parseInt(this.datas.crystal_quantity)) {
            Global.PageMgr.pages[8].getComponent("ArderPanel").goGamePanelUI(this.datas, this.propId);
        } else {
            Global.PageMgr.showTipPage(cc.js.formatStr("PMV不足%s", parseFloat(this.datas.crystal_quantity).toFixed(1)));
            // Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
            // Global.PageMgr.pages[15].getComponent("BuyPanel").type = 2;
            // Global.PageMgr.onOpenPage(15);
        }
    }
    // update (dt) {},

});

cc._RF.pop();