(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/BaoMingPanel/BaoMing_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '31a6dKaXt9OQLYIOHvLBCwu', 'BaoMing_Item', __filename);
// Script/Ui/BaoMingPanel/BaoMing_Item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_paiming: cc.Sprite,
        label_pingming: cc.Label,
        label_quyuname: cc.Label,
        label_sum: cc.Label,
        icon_paiming2: cc.Node,
        propId: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start: function start() {},
    setData: function setData(data) {
        var _this = this;

        this.icon_paiming2.active = false;
        this.label_pingming.string = cc.js.formatStr("NO.%s", data.ranking);
        this.label_quyuname.string = data.division_name;
        this.label_sum.string = data.number;
        try {
            if (parseInt(data.ranking) <= 3) {
                this.icon_paiming2.active = true;
                this.label_pingming.string = "";
                // cc.loader.load({url:data.game_logo,type:'png'},(err,res)=>{
                //     this.icon_paiming.spriteFrame = new cc.SpriteFrame(res);
                // });
                cc.loader.loadRes("imgs/R" + data.ranking, cc.SpriteFrame, function (err, sf) {
                    if (!err) {
                        _this.icon_paiming.spriteFrame = sf;
                    }
                });
            }
        } catch (e) {
            console.warn(e);
        }
        // this.propId = data.id;
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
        //# sourceMappingURL=BaoMing_Item.js.map
        