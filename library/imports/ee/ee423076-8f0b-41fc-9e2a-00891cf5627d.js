"use strict";
cc._RF.push(module, 'ee423B2jwtB/J4qAIkc9WJ9', 'Manor');
// Script/Ui/Manor/Manor.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    goNongChang: function goNongChang() {
        Global.gameName = 'NongChang';
        cc.view.enableAutoFullScreen(true);
        Global.ResourceMgr.playTransitionIn();
        cc.director.loadScene('NongChang', function () {});
    },
    goYuTang: function goYuTang() {
        Global.gameName = 'YuTang';
        cc.view.enableAutoFullScreen(true);
        Global.ResourceMgr.playTransitionIn();
        cc.director.loadScene('YuTang', function () {});
    },
    closePage: function closePage() {
        Global.PageMgr.onClosePage(7);
    }
}
// update (dt) {},
);

cc._RF.pop();