"use strict";
cc._RF.push(module, '09a9dNKyD1MbZQc3yIKyEDC', 'EmailDetailPanel');
// Script/Ui/EmailPanel/EmailDetailPanel.js

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
        label_content: cc.Label,
        label_title: cc.Label,
        label_title2: cc.Label,
        container: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    setData: function setData(data, index) {
        if (index == 1) {
            this.label_title.string = "邮件";
            this.label_title2.string = "邮件内容";
        } else {
            this.label_title.string = "公告";
            this.label_title2.string = "公告内容";
        }
        this.label_content.string = data.content;
        this.label_content._forceUpdateRenderData(true); // 这里调用一次手动渲染
        this.container.height = this.label_content.node.getContentSize().height + 5; // 修改尺寸
    }
    // update (dt) {},

});

cc._RF.pop();