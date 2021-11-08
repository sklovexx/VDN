"use strict";
cc._RF.push(module, 'db0e03FiNlODouREjsYTZEL', 'ChongWuPanel');
// Script/Ui/ChongWuPanel/ChongWuPanel.js

'use strict';

var app = require('../../Util/appScript');
cc.Class({
    extends: cc.Component,

    properties: {
        label_id: cc.Label,
        label_zhanli: cc.Label,
        label_tili: cc.Label,
        label_zili: cc.Label,
        label_xingzuan: cc.Label,
        label_lv: cc.Label,
        icon_pic: cc.Sprite,
        label_Usdt: cc.Label
    },

    onLoad: function onLoad() {},
    start: function start() {},
    onEnable: function onEnable() {
        this.showData();
    },
    showData: function showData() {
        var _this = this;

        var reqData = {};
        app.Post('member/getMemberInfo', reqData, function (res) {
            if (res.code == 200) {
                if (res.data) {
                    _this.label_id.string = res.data.username;
                    _this.label_lv.string = res.data.grade + "级";
                    _this.label_Usdt.string = res.data.totalUsdt;
                }
            }
        });

        Global.ProtocolMgr.queryKnapsackpetAnimalList(100, 1, function (res) {
            if (res.code == 200) {
                var data = res.data;
                if (data) {
                    _this.label_zhanli.string = parseFloat(data[0].combat_value).toFixed(4);
                    _this.label_tili.string = parseFloat(data[0].spirit_value).toFixed(4);
                    _this.label_zili.string = parseFloat(data[0].intellect_value).toFixed(4);
                    cc.loader.load({ url: data[0].icon, type: 'png' }, function (err, res) {
                        _this.icon_pic.spriteFrame = new cc.SpriteFrame(res);
                    });
                }
            }
        });
    },

    //收益明细
    onClickIncomeDetails: function onClickIncomeDetails() {
        Global.PageMgr.onOpenPage(22);
    }
}
// update (dt) {},
);

cc._RF.pop();