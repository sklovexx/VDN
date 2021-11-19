(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/ChongWuPanel/ChongWuPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db0e03FiNlODouREjsYTZEL', 'ChongWuPanel', __filename);
// Script/Ui/ChongWuPanel/ChongWuPanel.js

'use strict';

var _require = require('../../../NiuNiu/script/common/UtilsCross'),
    rmAndroidSplash = _require.rmAndroidSplash;

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

        this.goGamePanelUI();
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
    goGamePanelUI: function goGamePanelUI() {
        var _this2 = this;

        var reqData = {};
        app.Post('member/getMemberInfo', reqData, function (res) {
            if (res.code == 200) {
                if (res.data) {
                    _this2.label_id.string = res.data.username;
                    _this2.label_lv.string = res.data.grade + "级";
                    _this2.label_Usdt.string = res.data.totalUsdt;
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
        //# sourceMappingURL=ChongWuPanel.js.map
        