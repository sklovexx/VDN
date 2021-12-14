(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/LuckyDrawPanel/LuckyDrawItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '978beW/GwNJg5lQeAoZiG01', 'LuckyDrawItem', __filename);
// Script/Ui/LuckyDrawPanel/LuckyDrawItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_touxiang: cc.Sprite,
        label_name: cc.Label,
        label_lv: cc.Label,
        label_lVname: cc.Label,
        label_time: cc.Label,
        propId: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start: function start() {},
    setData: function setData(data) {
        var _this = this;

        try {
            cc.loader.load({ url: data.good_img, type: 'png' }, function (err, res) {
                _this.icon_touxiang.spriteFrame = new cc.SpriteFrame(res);
            });
        } catch (e) {
            console.warn(e);
        }

        this.label_name.string = data.username;
        this.label_lVname.string = data.good_name;
        this.label_lv.string = cc.js.formatStr("%s等奖", data.level);
        this.label_time.string = data.create_time;
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
        //# sourceMappingURL=LuckyDrawItem.js.map
        