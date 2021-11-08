(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/KuangJiShiChang/KuangJiShiChang.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f98b0G6LHVJR5l/ZyiURGR5', 'KuangJiShiChang', __filename);
// Script/Ui/KuangJiShiChang/KuangJiShiChang.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        Content: cc.Node,
        KuangJiDetail: cc.Node,
        Tips: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on("KuangJiData", this.onUpdateKuangJiData, this);
        Global.ProtocolMgr.queryKuangJi();
    },
    onUpdateKuangJiData: function onUpdateKuangJiData() {
        var _this = this;

        var backPack = GameData.KuangJiData;
        backPack.forEach(function (e) {
            var node = cc.instantiate(_this.item);
            node.parent = _this.Content;
            cc.loader.load({ url: e.picture, type: 'png' }, function (err, res) {
                node.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
            });
            node.getChildByName('Name').getComponent(cc.Label).string = e.name;
            node.getChildByName('Text1').getComponent(cc.Label).string = '售价：' + e.rent;
            node.getChildByName('Text2').getComponent(cc.Label).string = 'E金币收益：' + e.coinIncome;
            node.getChildByName('Text3').getComponent(cc.Label).string = 'E矿场收益：' + e.mineIncome;
            node.getChildByName('Text4').getComponent(cc.Label).string = 'E令牌收益：' + e.tokenIncome;
            node.getChildByName('Text5').getComponent(cc.Label).string = '总收益时长：' + e.incomeHour + '小时';
            node.getChildByName('ZuYong').getChildByName('Background').color = eval(e.rentAble) ? new cc.color(219, 95, 156, 255) : new cc.color(102, 102, 102, 102);
            if (eval(e.rentAble)) {
                node.getChildByName('ZuYong').on(cc.Node.EventType.TOUCH_END, function () {
                    _this.showDetail(e, '租用');
                });
            }
            node.getChildByName('YuYue').on(cc.Node.EventType.TOUCH_END, function () {
                _this.showDetail(e, '预约');
            });
        });
    },
    showDetail: function showDetail(e, tag) {
        var _this2 = this;

        this.KuangJiDetail.active = true;
        cc.loader.load({ url: e.picture, type: 'png' }, function (err, res) {
            _this2.KuangJiDetail.getChildByName('Mask').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        });
        var content = this.KuangJiDetail.getChildByName('Layout');
        content.getChildByName('Name').getComponent(cc.Label).string = e.name;
        content.getChildByName('Number').getComponent(cc.Label).string = '编号：' + e.name;
        content.getChildByName('Count').getComponent(cc.Label).string = '预计投放：' + e.count + '(上限)';
        content.getChildByName('Text').getComponent(cc.Label).string = 'E金币收益：' + e.coinIncome;
        content.getChildByName('Text1').getComponent(cc.Label).string = 'E矿场收益：' + e.mineIncome;
        content.getChildByName('Text2').getComponent(cc.Label).string = 'E令牌收益：' + e.tokenIncome;
        content.getChildByName('Text3').getComponent(cc.Label).string = '总收益时长：' + e.incomeHour + '小时';
        content.getChildByName('Text4').getComponent(cc.Label).string = '租用金额：' + e.rent + 'E金币';
        this.KuangJiDetail.getChildByName('Button').getChildByName('Label').getComponent(cc.Label).string = tag;
        this.KuangJiDetail.getChildByName('Button').on(cc.Node.EventType.TOUCH_END, function () {
            _this2.Tips.active = true;
            _this2.Tips.getChildByName('Content').getComponent(cc.Label).string = '是否消耗' + e.rent + 'E金币进行' + tag + '?';
            _this2.Tips.getChildByName('Button').on(cc.Node.EventType.TOUCH_END, function () {
                if (tag == '预约') {
                    Global.ProtocolMgr.YuYueKuangJi(e.id, function (data) {
                        Global.PageMgr.closeLoadingPage();
                        if (data.code == 200) {
                            Global.PageMgr.showTipPage('预约成功');
                            _this2.closeDetail();
                            _this2.closeTips();
                        } else {
                            Global.PageMgr.showTipPage(data.message);
                        }
                    });
                } else {
                    Global.ProtocolMgr.ZuYongKuangJi(e.id, function (data) {
                        Global.PageMgr.closeLoadingPage();
                        if (data.code == 200) {
                            Global.PageMgr.showTipPage('租用成功');
                            _this2.closeDetail();
                            _this2.closeTips();
                        } else {
                            Global.PageMgr.showTipPage(data.message);
                        }
                    });
                }
            });
        });
    },
    start: function start() {},
    closeDetail: function closeDetail() {
        this.KuangJiDetail.active = false;
    },
    closeTips: function closeTips() {
        this.Tips.active = false;
    },
    closePage: function closePage() {
        Global.PageMgr.onClosePage(5);
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("KuangJiData");
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
        //# sourceMappingURL=KuangJiShiChang.js.map
        