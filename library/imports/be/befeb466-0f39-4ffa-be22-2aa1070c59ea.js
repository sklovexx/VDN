"use strict";
cc._RF.push(module, 'befebRmDzlP+r4iKqEHDFnq', 'NFTPanel');
// Script/Ui/NFTPanel/NFTPanel.js

"use strict";

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
        label_title: cc.Label,
        label_content: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {},
    setTitle: function setTitle(title, content) {
        this.label_title.string = title;
        this.label_content.string = cc.js.formatStr("%s暂未开通服务,程序员小哥哥正开启“秃头模式”努力开发中,先去其他房间看看吧，敬请期待哦！", content);
    },
    close: function close() {
        Global.PageMgr.onClosePage(4);
    }
    // update (dt) {},

});

cc._RF.pop();