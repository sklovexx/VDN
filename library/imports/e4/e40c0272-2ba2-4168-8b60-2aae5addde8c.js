"use strict";
cc._RF.push(module, 'e40c0JyK6JBaItgKq5a3d6M', 'Item');
// Script/ComoboBox/Item.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    initComboBox: function initComboBox(cb) {
        this.cb = cb;
    },
    itemBtn: function itemBtn(event) {
        // 子项点击后改变下拉按钮上的文本
        this.cb.comboLabel.string = event.target.children[0].getComponent(cc.Label).string;
        // 选择后改变小三角和下拉框显示
        this.cb.comboboxClicked();
    }
}

// update (dt) {},
);

cc._RF.pop();