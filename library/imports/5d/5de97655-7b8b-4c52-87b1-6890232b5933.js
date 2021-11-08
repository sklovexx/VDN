"use strict";
cc._RF.push(module, '5de97ZVe4tMUoexaJAjK1kz', 'ZiChuangPanel');
// Script/Ui/ZiChuangPanel/ZiChuangPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_email: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    closeUi: function closeUi() {
        this.node.active = false;
        // Global.PageMgr.onClosePage(1);
    },
    copy: function copy() {
        var res = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyEmail", "(Ljava/lang/String;)Z", this.label_email.string);
        if (res) {
            Global.PageMgr.showTipPage("复制成功");
        }
    }
    // update (dt) {},

});

cc._RF.pop();