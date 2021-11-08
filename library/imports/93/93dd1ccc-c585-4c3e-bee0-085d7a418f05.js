"use strict";
cc._RF.push(module, '93dd1zMxYVMPr7gCF16QY8F', 'LobbyCardCtrl');
// NiuNiu/script/LobbyCardCtrl.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var ModeSelCtrl = require("./views/ModeSelViewCtrl");
cc.Class({
    extends: cc.Component,

    properties: {
        logo: cc.Sprite,
        mult: {
            default: 1,
            notify: function notify() {
                this.multLabel.string = this.mult + "倍场";
            }
        },
        multLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    onTouchEnd: function onTouchEnd(event) {
        GlobalNiuNiu.config.ROOM_MULT = this.mult;
        ModeSelCtrl.show();
    }
    // update (dt) {},

});

cc._RF.pop();