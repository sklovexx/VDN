"use strict";
cc._RF.push(module, '978beW/GwNJg5lQeAoZiG01', 'LuckyDrawItem');
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