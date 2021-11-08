(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ComoboBox/ComboBox.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a304dC8m29MW4KTXaOiKsIC', 'ComboBox', __filename);
// Script/ComoboBox/ComboBox.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        triangle: cc.Node, // 下拉按钮右边的小三角形
        comboLabel: cc.Label, // 下拉按钮上显示的文本
        dropDown: cc.Node, // 下拉框
        vLayoutNode: cc.Node, // 垂直布局
        contentNode: cc.Node, // 滚动视图内容
        itemPrefab: cc.Prefab // 下拉框选项
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 是否已经下拉
        this.isDropDown = false;

        // 下拉框选项内容
        this.itemArray = ['100', '200', '300'];
        this.initItems();
    },
    comboboxClicked: function comboboxClicked() {
        // 旋转小三角形
        this.rotateTriangle();
        // 下拉框显示与隐藏
        this.showHideDropDownBox();
        // 改变isDropDown值
        if (!this.isDropDown) this.isDropDown = true;else this.isDropDown = false;
    },
    rotateTriangle: function rotateTriangle() {
        // 旋转小三角形(正值为逆时针，负值为顺时针)
        if (!this.isDropDown) {
            var rotateAction = cc.rotateTo(0.5, 180).easing(cc.easeCubicActionOut());
            this.triangle.runAction(rotateAction);
        } else {
            var _rotateAction = cc.rotateTo(0.5, -90).easing(cc.easeCubicActionOut());
            this.triangle.runAction(_rotateAction);
        }
    },
    showHideDropDownBox: function showHideDropDownBox() {
        // 下拉框显示与隐藏
        if (!this.isDropDown) this.dropDown.active = true;else this.dropDown.active = false;
    },
    initItems: function initItems() {
        // 根据数组初始化下拉框中的各个选项内容
        var totalHeight = 0;
        for (var i = 0; i < this.itemArray.length; i++) {
            var item = cc.instantiate(this.itemPrefab);
            item.children[0].getComponent(cc.Label).string = this.itemArray[i];
            item.getComponent('Item').initComboBox(this);
            this.vLayoutNode.addChild(item);
            totalHeight += item.height;
        }

        // 设置content高度
        if (totalHeight > this.contentNode.height) this.contentNode.height = totalHeight;
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
        //# sourceMappingURL=ComboBox.js.map
        