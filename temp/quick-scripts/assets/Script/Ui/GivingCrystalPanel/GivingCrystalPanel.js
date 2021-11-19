(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/GivingCrystalPanel/GivingCrystalPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7aebd91ELtFkJlP5sIMrwsV', 'GivingCrystalPanel', __filename);
// Script/Ui/GivingCrystalPanel/GivingCrystalPanel.js

'use strict';

var app = require('../../Util/appScript');
cc.Class({
    extends: cc.Component,

    properties: {
        editBox_ID: cc.EditBox,
        editBox_SUM: cc.EditBox,
        gold: cc.Label,
        jiesao: cc.Label,
        jine: cc.Label,
        panle: cc.Node,
        shouxufei: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    onEnable: function onEnable() {
        var _this = this;

        var reqData = {};
        app.Post('member/getMemberInfo', reqData, function (res) {
            if (res.code == 200) {
                if (res.data) {
                    _this.goleSum = parseFloat(res.data.totalUsdt).toFixed(4);
                    _this.gold.string = cc.js.formatStr("可用余额:%s星钻", _this.goleSum);
                    _this.updataUI();
                }
            }
        });
    },
    updataUI: function updataUI() {
        this.editBox_ID.string = "";
        this.editBox_SUM.string = "";
        this.onClickBreak();
    },


    //赠送货币
    onClickGiving: function onClickGiving() {
        if (this.editBox_ID.string != "" && this.editBox_SUM.string != "") {
            var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (!myreg.test(this.editBox_ID.string)) {
                Global.PageMgr.showTipPage("请输入正确的好友账号");
            } else {
                var sum1 = parseInt(this.editBox_SUM.string);
                this.shoufeiyong = sum1 * 0.01;
                if (this.shoufeiyong < 0.1) {
                    this.shoufeiyong = 0.1;
                }
                //    var sum2 = sum1 + this.shoufeiyong;
                if (sum1 > this.goleSum) {
                    Global.PageMgr.showTipPage("星钻不足");
                } else {
                    this.jiesao.string = cc.js.formatStr("您将给好友(%s)赠送%s星钻,请仔细核对 好友账号与赠送数量是否有误？", this.editBox_ID.string, this.editBox_SUM.string);
                    this.jine.string = cc.js.formatStr("手续费:%s星钻", this.shoufeiyong);
                    this.panle.active = true;
                }
            }
        } else {
            if (this.editBox_ID.string == "") {
                Global.PageMgr.showTipPage("好友账号不能为空");
            } else if (this.editBox_SUM.string == "") {
                Global.PageMgr.showTipPage("输入金额不能为空");
            }
        }
    },


    //赠送
    onClickOK: function onClickOK() {
        var _this2 = this;

        var reqData = {
            transferType: 0,
            transferAccount: this.editBox_ID.string,
            number: this.editBox_SUM.string
        };
        Global.ProtocolMgr.queryTransfer(reqData, function (res) {
            if (res.code != 3001) {
                Global.PageMgr.showTipPage("赠送成功");
                _this2.updataUI();
                Global.PageMgr.onClosePage(22);
                Global.PageMgr.onClosePage(24);
                Global.PageMgr.pages[11].getComponent("ChongWuPanel").goGamePanelUI();
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },


    //返回
    onClickBreak: function onClickBreak() {
        this.panle.active = false;
    }
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
        //# sourceMappingURL=GivingCrystalPanel.js.map
        