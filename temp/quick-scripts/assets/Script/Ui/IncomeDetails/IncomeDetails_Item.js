(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/IncomeDetails/IncomeDetails_Item.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2a859WuBEhOBaZT649ZWoWl', 'IncomeDetails_Item', __filename);
// Script/Ui/IncomeDetails/IncomeDetails_Item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_name: cc.Label,
        label_time: cc.Label,
        label_pic: cc.Label
    },

    start: function start() {},
    setData: function setData(data) {
        try {
            // cc.loader.loadRes("imgs/bg" + data.id, cc.SpriteFrame, (err, sf)=>{
            //     if (!err){
            //         this.icon_pic.spriteFrame = sf;
            //     }
            // });
        } catch (e) {
            console.warn(e);
        }
        this.label_name.string = data.title;
        this.label_time.string = data.tradeTime;
        var sum = parseFloat(data.tradeValue).toFixed(4);
        if (data.tradeType == 0) //加
            {
                this.label_pic.string = cc.js.formatStr("+%s", sum);
            } else {
            this.label_pic.string = cc.js.formatStr("-%s", sum);
        }
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
        //# sourceMappingURL=IncomeDetails_Item.js.map
        