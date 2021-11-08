"use strict";
cc._RF.push(module, '47f68Jdkl5MeYboYwTOqVUS', 'Game_Item3');
// Script/Ui/GamePanel/Game_Item3.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        icon_touxiang: cc.Sprite,
        label_name: cc.Label,
        label_changci: cc.Label,
        label_pic: cc.Label,
        label_time: cc.Label,
        icon_winOrloser: cc.Sprite,
        propId: 1
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start: function start() {},
    setData: function setData(data) {
        var _this = this;

        try {
            cc.loader.load({ url: data.game_logo, type: 'png' }, function (err, res) {
                _this.icon_touxiang.spriteFrame = new cc.SpriteFrame(res);
            });
        } catch (e) {
            console.warn(e);
        }
        // this.propId = data.id;

        this.label_name.string = data.game_name;
        this.label_changci.string = cc.js.formatStr("场次:%s场", data.grade_field_name);
        this.label_time.string = data.create_time;
        var sum = parseFloat(data.value).toFixed(4);
        if (data.trade_type == 0) {
            this.label_pic.string = cc.js.formatStr("收益:+%s", sum);
            this.setSpriteFrame("imgs/胜利@2x");
        } else {
            this.label_pic.string = cc.js.formatStr("收益:-%s", sum);
            this.setSpriteFrame("imgs/失败@2x");
        }
    },
    setSpriteFrame: function setSpriteFrame(str) {
        var _this2 = this;

        cc.loader.loadRes(str, cc.SpriteFrame, function (err, sf) {
            if (!err) {
                _this2.icon_winOrloser.spriteFrame = sf;
            }
        });
    },
    buy: function buy() {}
    // update (dt) {},

});

cc._RF.pop();