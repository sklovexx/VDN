"use strict";
cc._RF.push(module, '9b2163aF7tES4UTQy0h25XT', 'FaHongBao');
// Script/Ui/HongBao/FaHongBao.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        JinECount: 5,
        LeiQuCount: 10,
        JinE: cc.Node,
        LeiQu: cc.Node,
        Tab: cc.Prefab,
        LeiQuTab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on("FaHongBaoConfig", this.onUpdateFaHongBaoConfig, this);
        Global.ProtocolMgr.faHongBaoConfig();
        this.numText = this.node.getChildByName('Num').getComponent(cc.Label);
        this.curLeiQU = 0;
        this.node.getChildByName('发红包').on(cc.Node.EventType.TOUCH_END, this.faHongBao, this);
        this.node.getChildByName('发5个红包').on(cc.Node.EventType.TOUCH_END, this.faHongBaos, this);
    },

    //更新发红包配置信息
    onUpdateFaHongBaoConfig: function onUpdateFaHongBaoConfig() {
        var JinE = GameData.FaHongBaoConfig.redPackAmounts;
        var LeiQu = GameData.FaHongBaoConfig.bombDigitals;
        for (var i = 0; i < 5; i++) {
            var node = cc.instantiate(this.Tab);
            node.parent = this.JinE;
            node.getChildByName('Label').getComponent(cc.Label).string = JinE[i];
        }
        for (var _i = 0; _i < LeiQu.length; _i++) {
            var _node = cc.instantiate(this.LeiQuTab);
            _node.parent = this.LeiQu;
            _node.getChildByName('Label').getComponent(cc.Label).string = LeiQu[_i];
        }
    },
    onEnable: function onEnable() {
        if (this.JinE.children.length > 0) {
            //初始化选项
            this.JinE.children[0].getComponent(cc.Toggle).isChecked = true;
            this.LeiQu.children[0].getComponent(cc.Toggle).isChecked = true;
        }
    },
    start: function start() {},

    //发送单个红包
    faHongBao: function faHongBao() {
        var _this = this;

        Global.ProtocolMgr.faHongBao(this.curLeiQU, parseInt(this.numText.string), 1, function (data) {
            if (data.code == 200) {
                Global.PageMgr.closeLoadingPage();
                _this.node.active = false;
            } else {
                Global.PageMgr.closeLoadingPage();
                Global.PageMgr.showTipPage2(data.message);
            }
        });
    },

    //发送五个红包
    faHongBaos: function faHongBaos() {
        var _this2 = this;

        Global.ProtocolMgr.faHongBao(this.curLeiQU, parseInt(this.numText.string), 5, function (data) {
            if (data.code == 200) {
                Global.PageMgr.closeLoadingPage();
                _this2.node.active = false;
            } else {
                Global.PageMgr.closeLoadingPage();
                Global.PageMgr.showTipPage(data.message);
            }
        });
    },

    //金额选择
    JinEToggle: function JinEToggle(event) {
        var value = parseInt(event.node.getChildByName('Label').getComponent(cc.Label).string);
        this.numText.string = value;
    },

    //雷号选择
    LeiQuToggle: function LeiQuToggle(event) {
        var value = parseInt(event.node.getChildByName('Label').getComponent(cc.Label).string);
        console.log(value);
        this.curLeiQU = value;
    }
}
// update (dt) {},
);

cc._RF.pop();