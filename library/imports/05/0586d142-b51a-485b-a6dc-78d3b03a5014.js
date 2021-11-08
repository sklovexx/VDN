"use strict";
cc._RF.push(module, '0586dFCtRpIW6bceNOwOlAU', 'LobbyCtrl');
// NiuNiu/script/LobbyCtrl.js

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

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.Node,
        menu: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        // GlobalNiuNiu.audioMgr.playMusic(GlobalNiuNiu.audioMgr.roomMusic);
    },
    onBtnOffline: function onBtnOffline() {
        cc.log("单机模式.");
        this.scrollView.active = true;
        this.menu.active = false;
        GlobalNiuNiu.config.ONLINE_MODE = false;
    },
    onBtnRoom: function onBtnRoom() {
        GlobalNiuNiu.loadScene("Menu");
        GlobalNiuNiu.config.ONLINE_MODE = true;
    }

    // update (dt) {},

});

cc._RF.pop();