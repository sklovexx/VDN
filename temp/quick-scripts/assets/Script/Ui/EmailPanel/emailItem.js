(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/EmailPanel/emailItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4b8e3e7jdNAXa9VAgL7cowk', 'emailItem', __filename);
// Script/Ui/EmailPanel/emailItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_email: cc.Sprite,
        label_title: cc.Label,
        label_time: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    setData: function setData(data) {
        var _this = this;

        var icon_email = "";
        if (data.state == 0) {
            icon_email = "信封未读";
        } else if (data.state == 1) {
            icon_email = "信封已读";
        }
        try {
            cc.loader.loadRes("imgs/" + icon_email, cc.SpriteFrame, function (err, sf) {
                if (!err) {
                    _this.icon_email.spriteFrame = sf;
                }
            });
        } catch (e) {
            console.warn(e);
        }
        this.label_title.string = data.title;
        this.label_time.string = data.time;
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
        //# sourceMappingURL=emailItem.js.map
        