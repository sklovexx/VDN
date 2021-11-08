"use strict";
cc._RF.push(module, '4b395QZ31hLDp/XC3YhgTR3', 'game_item');
// Script/Ui/GamePanel/game_item.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        icon_pic: cc.Sprite,
        label_name: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    setData: function setData(data, callback) {
        var _this = this;

        try {
            cc.loader.load({ url: data.game_logo, type: 'png' }, function (err, res) {
                _this.icon_pic.spriteFrame = new cc.SpriteFrame(res);
            });
            // cc.loader.loadRes("imgs/" + data.icon, cc.SpriteFrame, (err, sf)=>{
            //     if (!err){
            //         this.icon_pic.spriteFrame = sf;
            //     }
            // });
        } catch (e) {
            console.warn(e);
        }

        this.label_name.string = data.game_name;
        this.bundleId = data.bundleId;
        this.callback = callback;
        this.datas = data;
    },
    jumpTo: function jumpTo() {
        this.callback(this.bundleId, this.datas);
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openApp", "(Ljava/lang/String;)Z", this.bundleId);
    }
    // update (dt) {},

});

cc._RF.pop();