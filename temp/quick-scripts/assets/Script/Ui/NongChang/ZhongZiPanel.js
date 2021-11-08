(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ui/NongChang/ZhongZiPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce62dfrEllIFYyh0SKwwyFs', 'ZhongZiPanel', __filename);
// Script/Ui/NongChang/ZhongZiPanel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        content: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.GlobalEvent.on("ZhongZiData", this.onUpdateZhongZiData, this);
    },
    onDestroy: function onDestroy() {
        cc.director.GlobalEvent.off("ZhongZiData");
    },
    onUpdateZhongZiData: function onUpdateZhongZiData() {
        var _this = this;

        var children = this.content.children;
        children.forEach(function (value) {
            value.destroy();
        });
        var backPack = GameData.ZhongZiData;
        var table = "zhongzi";
        backPack.forEach(function (value) {
            var node = cc.instantiate(_this.item);
            node.parent = _this.content;
            var id = value.id + '';
            node.getChildByName('Bg').getChildByName('Count').getComponent(cc.Label).string = value.count;
            node.getChildByName('Name').getComponent(cc.Label).string = dataFunc.queryValue(table, "name", id) + '种子';
            node.getChildByName('Reward').getComponent(cc.Label).string = '收获' + dataFunc.queryValue(table, "reward", id) + '个' + dataFunc.queryValue(table, "name", id);
            node.getChildByName('Price').getComponent(cc.Label).string = '价格' + dataFunc.queryValue(table, "price", id);
            cc.loader.loadRes('NongChang/' + dataFunc.queryValue(table, "picture", id), function (err, res) {
                if (err) {
                    console.error(err);
                    return;
                }
                var spriteFrame = new cc.SpriteFrame(res);
                node.getChildByName('Bg').getChildByName('Icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                if (value.count > 0) {
                    node.getChildByName('Bg').getChildByName('Count').active = true;
                    node.getChildByName('Price').active = false;
                    node.getChildByName('Buy').active = false;
                    node.off(cc.Node.EventType.TOUCH_END);
                    node.on(cc.Node.EventType.TOUCH_END, function () {
                        Global.ProtocolMgr.zhongZhi(id, GameData.ZhongZhiReady.pos);
                    });
                } else {
                    node.getChildByName('Bg').getChildByName('Count').active = false;
                    node.getChildByName('Price').active = true;
                    node.getChildByName('Buy').active = true;
                    node.getChildByName('Buy').on(cc.Node.EventType.TOUCH_END, function () {
                        Global.PageMgr.closeAllPages();
                        Global.PageMgr.onOpenPage(1);
                        Global.PageMgr.pages[1].getComponent('NongChangPanel').toggleChange('ShangCheng');
                    });
                }
            });
        });
    },
    start: function start() {},
    onEnable: function onEnable() {
        Global.ProtocolMgr.queryZhongZi();
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
        //# sourceMappingURL=ZhongZiPanel.js.map
        