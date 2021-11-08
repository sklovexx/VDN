(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/KnapsackPanel/KnapsackPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'be2faIGlPJOTprJIQSKkJ+A', 'KnapsackPanel', __filename);
// Script/Ui/KnapsackPanel/KnapsackPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        NFT_item: cc.Prefab,
        XHP_item: cc.Prefab,
        container: cc.Node,
        btn_item: [cc.Sprite]
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable: function onEnable() {
        this.getShopList(null, 0);
        Global.ProtocolMgr.queryUserData();
    },
    getShopList: function getShopList(event, customData) {
        var _this = this;

        this.btn_item.forEach(function (e) {
            e.spriteFrame = null;
        });
        cc.loader.loadRes("imgs/按钮bg", cc.SpriteFrame, function (err, sf) {
            if (!err) {
                _this.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        this.container.removeAllChildren();
        switch (parseInt(customData)) {
            case 0:
                Global.ProtocolMgr.queryKnapsackNFTList(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        var data = res.data;
                        for (var i = 0; i < data.length; i++) {
                            var NFTItemNode = cc.instantiate(_this.NFT_item);
                            NFTItemNode.getComponent("NFT_item").setData(data[i], 2);
                            _this.container.addChild(NFTItemNode);
                        }
                    } else {
                        Global.PageMgr.showTipPage(res.message);
                    }
                });
                break;
            case 1:
                Global.ProtocolMgr.queryKnapsackXHPList(function (res) {
                    console.log(res);
                    if (res.code == 200) {
                        var data = res.data;
                        for (var i = 0; i < data.length; i++) {
                            var XHPItemNode = cc.instantiate(_this.XHP_item);
                            XHPItemNode.getComponent("XHP_item").setData(data[i], 2);
                            _this.container.addChild(XHPItemNode);
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
    onDisable: function onDisable() {}
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
        //# sourceMappingURL=KnapsackPanel.js.map
        