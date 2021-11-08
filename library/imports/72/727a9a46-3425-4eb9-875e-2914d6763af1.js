"use strict";
cc._RF.push(module, '727a9pGNCVOuYdeKRTWdjrx', 'ShengJia');
// Script/Ui/ShengJia/ShengJia.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.on('UpdateUserData', this.UpdateUserData, this);
        this.UpdateUserData();
        var dian1 = this.node.getChildByName('dian1').getComponent(cc.Animation);
        var dian2 = this.node.getChildByName('dian2').getComponent(cc.Animation);
        dian1.play();
        dian2.play();
        setInterval(function () {
            dian1.play();
            dian2.play();
        }, 5000);
        var node = cc.instantiate(this.item);
        node.parent = this.node;
        var jump = cc.repeatForever(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(1, cc.v2(0, -20))));
        setTimeout(function () {
            node.runAction(jump);
        }, Math.random() * 1000);
        node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var location = e.getLocation();
            node.position = node.parent.convertToNodeSpaceAR(location);
        });
        var jump2 = cc.repeatForever(cc.sequence(cc.moveBy(2, cc.v2(0, 20)), cc.moveBy(2, cc.v2(0, -20))));
        this.node.getChildByName('圆顶').runAction(jump2);
    },
    goSheQu: function goSheQu() {
        cc.director.loadScene('ECC', function () {});
    },

    //更新用户数据
    UpdateUserData: function UpdateUserData() {
        this.node.getChildByName('ZuanShi').getChildByName('Text').getComponent(cc.Label).string = '钻石：0.00';
        this.node.getChildByName('DongLi').getChildByName('Text').getComponent(cc.Label).string = '动力：30';
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();