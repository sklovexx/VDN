"use strict";
cc._RF.push(module, 'cd521NoEUVC5aXTj7udrVYD', 'CustomerServicePanel');
// Script/Ui/CustomerServicePanel/CustomerServicePanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_email: cc.Label
    },

    start: function start() {},
    onEnable: function onEnable() {
        var _this = this;

        Global.ProtocolMgr.querygetCommonInfo(function (res) {
            if (res.data) {
                _this.label_email.string = res.data.customerServiceQq;
            }
        });
    },
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