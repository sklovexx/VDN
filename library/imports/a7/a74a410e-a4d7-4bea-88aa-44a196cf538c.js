"use strict";
cc._RF.push(module, 'a74a4EOpNdL6oiqRKGWz1OM', 'GongGaoPanel');
// Script/Ui/GongGaoPanel/GongGaoPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        label_content: cc.Label,
        container: cc.Node
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
                    _this.label_content._forceUpdateRenderData(true); // 这里调用一次手动渲染
                    _this.container.height = _this.label_content.node.getContentSize().height + 5; // 修改尺寸
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    }
    // update (dt) {},

});

cc._RF.pop();