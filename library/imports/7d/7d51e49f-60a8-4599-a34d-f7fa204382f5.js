"use strict";
cc._RF.push(module, '7d51eSfYKhFmaNN9/ogQ4L1', 'SalePanel');
// Script/Ui/NongChang/SalePanel.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        content: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onEnable: function onEnable() {
        var _this = this;

        var children = this.content.children;
        children.forEach(function (value) {
            value.destroy();
        });
        var backPack = GameData.GuoShiData;
        var sum = 0;
        backPack.forEach(function (value) {
            var node = cc.instantiate(_this.item);
            node.parent = _this.content;
            var id = value.id + '';
            node.getChildByName('Count').getComponent(cc.Label).string = value.count;
            var price = parseInt(dataFunc.queryValue('zhongzi', "price", id)) * value.count;
            sum += price;
            node.getChildByName('Price').getComponent(cc.Label).string = '可售' + price + 'ECC';
        });
        this.node.getChildByName('TotalPrice').getComponent(cc.Label).string = '当前可售出' + sum + 'ECC';
    },
    saleing: function saleing() {
        var _this2 = this;

        Global.ProtocolMgr.saleGuoShi(function () {
            _this2.node.active = false;
            cc.find('Canvas/GainGold').getComponent('GainGold').onPlayCoinAni(function () {
                console.log('获得金币');
            });
            console.log('卖出果实');
            Global.PageMgr.closeAllPages();
            Global.PageMgr.showTipPage('成功售出果实');
        });
    }
    // update (dt) {},

});

cc._RF.pop();