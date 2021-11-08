(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/GongGaoPanel/GongGaoPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a74a4EOpNdL6oiqRKGWz1OM', 'GongGaoPanel', __filename);
// Script/Ui/GongGaoPanel/GongGaoPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_content: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {
        var _this = this;

        Global.ProtocolMgr.queryGonggao(function (res) {
            if (res.code == 200) {
                if (res.data) {
                    _this.label_content.string = res.data.content;
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
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
        //# sourceMappingURL=GongGaoPanel.js.map
        