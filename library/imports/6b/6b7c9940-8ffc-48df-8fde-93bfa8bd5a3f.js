"use strict";
cc._RF.push(module, '6b7c9lAj/xI34/ek7+ovVo/', 'ShopPanel');
// Script/Ui/ShopPanel/ShopPanel.js

'use strict';

var app = require('../../Util/appScript');
cc.Class({
    extends: cc.Component,

    properties: {
        NFT_item: cc.Prefab,
        XHP_item: cc.Prefab,
        container: cc.Node,
        label_Usdt: cc.Label,
        btn_item: [cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable: function onEnable() {
        var _this = this;

        this.getShopList(null, 0);
        var reqData = {};
        app.Post('member/getMemberInfo', reqData, function (res) {
            if (res.code == 200) {
                if (res.data) _this.label_Usdt.string = res.data.totalUsdt;
            }
        });
        // cc.find("Canvas/UserDataPanel").active = true;
        // lobal.ProtocolMgr.queryUserData();
    },
    getShopList: function getShopList(event, customData) {
        var _this2 = this;

        this.btn_item.forEach(function (e) {
            e.spriteFrame = null;
        });
        cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function (err, sf) {
            if (!err) {
                _this2.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        this.container.removeAllChildren();
        switch (parseInt(customData)) {
            case 0:
                Global.PageMgr.onClosePage(6);
                // cc.find('Canvas/ShopPanel/UserDataPanel').active = false;

                Global.ProtocolMgr.queryNFTList(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        var data = res.data;
                        for (var i = 0; i < data.length; i++) {
                            var NFTItemNode = cc.instantiate(_this2.NFT_item);
                            NFTItemNode.getComponent("NFT_item").setData(data[i]);
                            _this2.container.addChild(NFTItemNode);
                        }
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
                break;
            case 1:
                Global.PageMgr.onClosePage(6);
                Global.ProtocolMgr.queryXHPList(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        var data = res.data;
                        for (var i = 0; i < data.length; i++) {
                            var XHPItemNode = cc.instantiate(_this2.XHP_item);
                            XHPItemNode.getComponent("XHP_item").setData(data[i]);
                            _this2.container.addChild(XHPItemNode);
                        }
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
                break;
            case 2:
                Global.PageMgr.onOpenPage(6);
                break;
            default:
                break;
        }
    },
    onDisable: function onDisable() {
        cc.find('Canvas/' + Global.pages[6]).active = false;
    }
    // update (dt) {},

});

cc._RF.pop();