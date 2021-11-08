(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/GamePanel/Game_Item2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fabe4c4MbhMSoihtJT7rMs9', 'Game_Item2', __filename);
// Script/Ui/GamePanel/Game_Item2.js

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
        this.label_pic.string = cc.js.formatStr("%s个星钻\n每局胜奖励负扣减%s", parseFloat(data.crystal_quantity).toFixed(1), parseFloat(data.reward).toFixed(1));
        this.label_menpiao.string = cc.js.formatStr("门票:%s", parseFloat(data.ticket).toFixed(2));
        this.data = data;
    },
    buy: function buy() {
        if (window.DEFAULT_availableUsdt >= parseInt(this.data.crystal_quantity)) {
            Global.PageMgr.pages[7].getComponent("GamePanel").goGamePanelUI(this.data);
        } else {
            Global.PageMgr.showTipPage(cc.js.formatStr("星钻不足%s", parseFloat(this.data.crystal_quantity).toFixed(1)));
            // Global.PageMgr.pages[15].getComponent("BuyPanel").propId = this.propId;
            // Global.PageMgr.pages[15].getComponent("BuyPanel").type = 2;
            // Global.PageMgr.onOpenPage(15);
        }
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
        //# sourceMappingURL=Game_Item2.js.map
        