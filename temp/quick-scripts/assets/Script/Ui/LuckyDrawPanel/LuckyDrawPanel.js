(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/LuckyDrawPanel/LuckyDrawPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '25b69IOFlRK4peKZ1MjTpzy', 'LuckyDrawPanel', __filename);
// Script/Ui/LuckyDrawPanel/LuckyDrawPanel.js

"use strict";

// let app = require('../../Util/appScript')
cc.Class({
    extends: cc.Component,

    properties: {
        luckyDraw_item: cc.Prefab,
        container: cc.Node,
        Panle: cc.Node,
        Panle2: cc.Node,
        btn_item: [cc.Sprite]
    },

    onLoad: function onLoad() {},
    onEnable: function onEnable() {
        this.getGameList(null, 0);
    },
    goLuckyDrawUI: function goLuckyDrawUI() {
        var _this = this;

        this.container.removeAllChildren();
        Global.ProtocolMgr.queryLuckDrawList(100, 1, function (res) {
            if (res.code == 200) {
                var data = res.data.list;
                for (var i = 0; i < data.length; i++) {
                    var gameItemNode = cc.instantiate(_this.luckyDraw_item);
                    gameItemNode.getComponent("LuckyDrawItem").setData(data[i]);
                    _this.container.addChild(gameItemNode);
                }
            } else {
                Global.PageMgr.showTipPage(res.message);
            }
        });
    },
    getGameList: function getGameList(event, customData) {
        var _this2 = this;

        this.btn_item.forEach(function (e) {
            e.spriteFrame = null;
        });
        cc.loader.loadRes("imgs/按钮bg2", cc.SpriteFrame, function (err, sf) {
            if (!err) {
                _this2.btn_item[parseInt(customData)].spriteFrame = sf;
            }
        });
        switch (parseInt(customData)) {
            case 0:
                this.onClickBeganTheDetail(null, 1);
                break;
            case 1:
                this.onClickBeganTheDetail(null, 0);
                this.goLuckyDrawUI();
                break;
            default:
                break;
        }
    },


    //开始抽奖
    onClickBeganToDraw: function onClickBeganToDraw() {
        Global.PageMgr.showTipPage("每周六下午5点,官方统一抽奖", 20);
    },


    //点击明显或者返回
    onClickBeganTheDetail: function onClickBeganTheDetail(event, customData) {
        var index = parseInt(customData);
        this.Panle.active = index > 0 ? true : false;
        this.Panle2.active = index <= 0 ? true : false;
        if (index == 0) {
            this.goLuckyDrawUI();
        }
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
        //# sourceMappingURL=LuckyDrawPanel.js.map
        