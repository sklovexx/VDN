"use strict";
cc._RF.push(module, 'a74a4EOpNdL6oiqRKGWz1OM', 'GongGaoPanel');
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