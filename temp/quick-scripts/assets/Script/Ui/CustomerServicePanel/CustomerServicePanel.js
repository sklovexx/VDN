(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/CustomerServicePanel/CustomerServicePanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cd521NoEUVC5aXTj7udrVYD', 'CustomerServicePanel', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CustomerServicePanel.js.map
        