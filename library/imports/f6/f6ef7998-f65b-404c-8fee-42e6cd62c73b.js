"use strict";
cc._RF.push(module, 'f6ef7mY9ltATI/uQubNYsc7', 'RecreationalCenter');
// Script/Ui/RecreationalCenter/RecreationalCenter.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    goHongBao: function goHongBao() {
        Global.gameName = 'HongBao';
        // cc.view.enableAutoFullScreen(true);
        Global.ResourceMgr.playTransitionIn();
        cc.director.loadScene('HongBao', function () {});
    },
    goSlot: function goSlot() {
        // Global.gameName = 'Slot';
        // cc.view.enableAutoFullScreen(true);
        // Global.ResourceMgr.playTransitionIn()
        // cc.director.loadScene('Slot',()=>{
        // })
        Global.PageMgr.showTipPage('该功能正在开发中');
    },
    closePage: function closePage() {
        Global.PageMgr.onClosePage(6);
    }
}
// update (dt) {},
);

cc._RF.pop();