"use strict";
cc._RF.push(module, '6d876ZRWYpHtqDXn7aDfItO', 'TipsPage');
// Script/Ui/TipsPage/TipsPage.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        //第一个text仅仅用于适配宽度
        text: cc.Node,
        text2: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    showPage: function showPage(event, text) {
        this.node.active = true;
        var action = cc.sequence(cc.moveBy(1, cc.v2(0, 30)), cc.fadeOut(0.1), cc.callFunc(this.closePage, this));
        this.node.runAction(action);
        this.text.getComponent(cc.Label).string = text;
        this.text2.getComponent(cc.Label).string = text;
    },
    setText: function setText(text) {
        this.text.getComponent(cc.Label).string = text;
        this.text2.getComponent(cc.Label).string = text;
    },
    onEnable: function onEnable() {},
    closePage: function closePage() {
        this.node.y = 0;
        this.node.active = false;
        this.node.destroy();
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();